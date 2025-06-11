"""This file and its contents are licensed under the Apache License 2.0. Please see the included NOTICE for copyright information and LICENSE for a copy of the license.
"""
import logging
import time
from uuid import uuid4
import os

import ujson as json
from core.utils.contextlog import ContextLog
from csp.middleware import CSPMiddleware
from django.conf import settings
from django.contrib.auth import logout, login
from django.core.exceptions import MiddlewareNotUsed
from django.core.handlers.base import BaseHandler
from django.http import HttpResponsePermanentRedirect
from django.middleware.common import CommonMiddleware
from django.utils.deprecation import MiddlewareMixin
from django.utils.http import escape_leading_slashes
from rest_framework.permissions import SAFE_METHODS
import requests
from django.shortcuts import redirect
from organizations.models import Organization, OrganizationMember

logger = logging.getLogger(__name__)


def enforce_csrf_checks(func):
    """Enable csrf for specified view func"""
    # USE_ENFORCE_CSRF_CHECKS=False is for tests
    if settings.USE_ENFORCE_CSRF_CHECKS:

        def wrapper(request, *args, **kwargs):
            return func(request, *args, **kwargs)

        wrapper._dont_enforce_csrf_checks = False
        return wrapper
    else:
        return func


class DisableCSRF(MiddlewareMixin):
    # disable csrf for api requests
    def process_view(self, request, callback, *args, **kwargs):
        if hasattr(callback, '_dont_enforce_csrf_checks'):
            setattr(request, '_dont_enforce_csrf_checks', callback._dont_enforce_csrf_checks)
        elif request.GET.get('enforce_csrf_checks'):  # _dont_enforce_csrf_checks is for test
            setattr(request, '_dont_enforce_csrf_checks', False)
        else:
            setattr(request, '_dont_enforce_csrf_checks', True)


class HttpSmartRedirectResponse(HttpResponsePermanentRedirect):
    pass


class CommonMiddlewareAppendSlashWithoutRedirect(CommonMiddleware):
    """This class converts HttpSmartRedirectResponse to the common response
    of Django view, without redirect. This is necessary to match status_codes
    for urls like /url?q=1 and /url/?q=1. If you don't use it, you will have 302
    code always on pages without slash.
    """

    response_redirect_class = HttpSmartRedirectResponse

    def __init__(self, *args, **kwargs):
        # create django request resolver
        self.handler = BaseHandler()

        # prevent recursive includes
        old = settings.MIDDLEWARE
        name = self.__module__ + '.' + self.__class__.__name__
        settings.MIDDLEWARE = [i for i in settings.MIDDLEWARE if i != name]

        self.handler.load_middleware()

        settings.MIDDLEWARE = old
        super(CommonMiddlewareAppendSlashWithoutRedirect, self).__init__(*args, **kwargs)

    def get_full_path_with_slash(self, request):
        """Return the full path of the request with a trailing slash appended
        without Exception in Debug mode
        """
        new_path = request.get_full_path(force_append_slash=True)
        # Prevent construction of scheme relative urls.
        new_path = escape_leading_slashes(new_path)
        return new_path

    def process_response(self, request, response):
        response = super(CommonMiddlewareAppendSlashWithoutRedirect, self).process_response(request, response)

        request.editor_keymap = settings.EDITOR_KEYMAP

        if isinstance(response, HttpSmartRedirectResponse):
            if not request.path.endswith('/'):
                # remove prefix SCRIPT_NAME
                path = request.path[len(settings.FORCE_SCRIPT_NAME) :] if settings.FORCE_SCRIPT_NAME else request.path
                request.path = path + '/'
            # we don't need query string in path_info because it's in request.GET already
            request.path_info = request.path
            response = self.handler.get_response(request)

        return response

    def should_redirect_with_slash(self, request):
        """
        Override the original method to keep global APPEND_SLASH setting false
        """
        if not request.path_info.endswith('/'):
            return True
        return False


class SetSessionUIDMiddleware(CommonMiddleware):
    def process_request(self, request):
        if 'uid' not in request.session:
            request.session['uid'] = str(uuid4())


class ContextLogMiddleware(CommonMiddleware):
    def __init__(self, get_response):
        self.get_response = get_response
        self.log = ContextLog()

    def __call__(self, request):
        body = None
        try:
            body = json.loads(request.body)
        except:  # noqa: E722
            try:
                body = request.body.decode('utf-8')
            except:  # noqa: E722
                pass

        if 'server_id' not in request:
            setattr(request, 'server_id', self.log._get_server_id())

        response = self.get_response(request)
        self.log.send(request=request, response=response, body=body)

        return response

    def process_request(self, request):
        if 'server_id' not in request:
            setattr(request, 'server_id', self.log._get_server_id())


class DatabaseIsLockedRetryMiddleware(CommonMiddleware):
    """Workaround for sqlite performance issues
    we wait and retry request if database is locked"""

    def __init__(self, get_response):
        if settings.DJANGO_DB != settings.DJANGO_DB_SQLITE:
            raise MiddlewareNotUsed()
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        retries_number = 0
        sleep_time = 1
        backoff = 1.5
        while (
            response.status_code == 500
            and hasattr(response, 'content')
            and b'database-is-locked-error' in response.content
            and retries_number < 15
        ):
            time.sleep(sleep_time)
            response = self.get_response(request)
            retries_number += 1
            sleep_time *= backoff
        return response


class XApiKeySupportMiddleware:
    """Middleware that adds support for the X-Api-Key header, by having its value supersede
    anything that's set in the Authorization header."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if 'HTTP_X_API_KEY' in request.META:
            request.META['HTTP_AUTHORIZATION'] = f'Token {request.META["HTTP_X_API_KEY"]}'
            del request.META['HTTP_X_API_KEY']

        return self.get_response(request)


class UpdateLastActivityMiddleware(CommonMiddleware):
    def process_view(self, request, view_func, view_args, view_kwargs):
        if hasattr(request, 'user') and request.method not in SAFE_METHODS:
            if request.user.is_authenticated:
                request.user.update_last_activity()


class InactivitySessionTimeoutMiddleWare(CommonMiddleware):
    """Log the user out if they have been logged in for too long
    or inactive for too long"""

    # paths that don't count as user activity
    NOT_USER_ACTIVITY_PATHS = []

    def process_request(self, request) -> None:
        if (
            not hasattr(request, 'session')
            or request.session.is_empty()
            or not hasattr(request, 'user')
            or not request.user.is_authenticated
            or
            # scim assign request.user implicitly, check CustomSCIMAuthCheckMiddleware
            (hasattr(request, 'is_scim') and request.is_scim)
            or (hasattr(request, 'is_jwt') and request.is_jwt)
        ):
            return

        current_time = time.time()
        last_login = request.session['last_login'] if 'last_login' in request.session else 0

        # Check if this request is too far from when the login happened
        if (current_time - last_login) > settings.MAX_SESSION_AGE:
            logger.info(
                f'Request is too far from last login {current_time - last_login:.0f} > {settings.MAX_SESSION_AGE}; logout'
            )
            logout(request)

        # Push the expiry to the max every time a new request is made to a url that indicates user activity
        # but only if it's not a URL we want to ignore
        for path in self.NOT_USER_ACTIVITY_PATHS:
            if isinstance(path, str) and path == str(request.path_info):
                return
            elif 'query' in path:
                parts = str(request.path_info).split('?')
                if len(parts) == 2 and path['query'] in parts[1]:
                    return

        request.session.set_expiry(
            settings.MAX_TIME_BETWEEN_ACTIVITY if request.session.get('keep_me_logged_in', True) else 0
        )


class HumanSignalCspMiddleware(CSPMiddleware):
    """
    Extend CSPMiddleware to support switching report-only CSP to regular CSP.

    For use with core.decorators.override_report_only_csp.
    """

    def process_response(self, request, response):
        response = super().process_response(request, response)
        if getattr(response, '_override_report_only_csp', False):
            if csp_policy := response.get('Content-Security-Policy-Report-Only'):
                response['Content-Security-Policy'] = csp_policy
                del response['Content-Security-Policy-Report-Only']
            delattr(response, '_override_report_only_csp')
        return response


class KeycloakAuthenticationMiddleware:
    """Middleware that handles authentication via Keycloak token in cookie"""
    
    def __init__(self, get_response):
        self.get_response = get_response
        logger.info("KeycloakAuthenticationMiddleware initialized")
        self.keycloak_server_url = os.getenv('KEYCLOAK_SERVER_URL', 'https://keycloak.local.moojnn.com')
        logger.info("Keycloak server URL: %s", self.keycloak_server_url)

    def __call__(self, request):
        from django.contrib.auth import get_user_model, login
        from django.contrib.auth.hashers import make_password
        from django.contrib.auth.backends import ModelBackend
        import requests

        logger.info("KeycloakAuthenticationMiddleware processing request: %s %s", request.method, request.path)
        logger.info("Request cookies: %s", request.COOKIES)

        User = get_user_model()

        # Skip if user is already authenticated
        if request.user.is_authenticated:
            logger.info("User already authenticated: %s", request.user)
            return self.get_response(request)

        # Get token from cookie
        token = request.COOKIES.get('kc-access')
        if not token:
            logger.info("No kc-access token found in cookies")
            return self.get_response(request)

        try:
            # Request userinfo from Keycloak
            headers = {'Authorization': f'Bearer {token}'}
            userinfo_url = f"{self.keycloak_server_url}/realms/aip/protocol/openid-connect/userinfo"
            logger.info("Requesting userinfo from: %s", userinfo_url)
            
            response = requests.get(userinfo_url, headers=headers, verify=False)
            response.raise_for_status()
            userinfo = response.json()
            
            logger.info("Received userinfo: %s", userinfo)
            
            # Extract user info
            email = userinfo.get('email')
            username = userinfo.get('preferred_username') or userinfo.get('sub')
            
            if not email or not username:
                logger.error("Missing email or username in userinfo response")
                return self.get_response(request)

            # Try to get existing user
            try:
                user = User.objects.get(email=email)
                logger.info("Found existing user: %s", user)
            except User.DoesNotExist:
                # Create new user if doesn't exist
                user = User.objects.create(
                    email=email,
                    username=username,
                    password=make_password(username)  # Set password same as username
                )
                logger.info("Created new user: %s", user)

                # 创建默认组织并添加用户为成员
                try:
                    # 获取或创建默认组织
                    org, created = Organization.objects.get_or_create(
                        title='Default Organization',
                        defaults={'created_by': user}
                    )
                    if not created:
                        # 如果组织已存在，更新创建者
                        org.created_by = user
                        org.save()
                    logger.info("Got or created default organization: %s", org)

                    # 添加用户为组织成员
                    member = OrganizationMember.objects.create(
                        organization=org,
                        user=user
                    )
                    logger.info("Added user to organization as member: %s", member)

                    # 设置用户的活跃组织
                    user.active_organization = org
                    user.save()
                    logger.info("Set user's active organization to: %s", org)

                except Exception as e:
                    logger.error("Failed to create organization membership: %s", str(e), exc_info=True)

            # Set user in request and login
            request.user = user
            request.is_keycloak_auth = True
            
            # Update session for Keycloak authenticated users
            if hasattr(request, 'session'):
                # 使用 ModelBackend 作为认证后端
                login(request, user, backend='django.contrib.auth.backends.ModelBackend')
                request.session['last_login'] = time.time()
                request.session.set_expiry(settings.MAX_SESSION_AGE)
                logger.info("Updated session for Keycloak user: %s", user)
            
            logger.info("Set request.user to: %s", user)

            # 如果是登录页面，重定向到首页
            if request.path == '/user/login/':
                logger.info("Redirecting from login page to home page")
                return redirect('https://aip.local.moojnn.com')

        except requests.exceptions.RequestException as e:
            logger.error("Failed to get userinfo from Keycloak: %s", str(e), exc_info=True)
        except Exception as e:
            logger.error("Keycloak authentication failed: %s", str(e), exc_info=True)
            
        return self.get_response(request)
