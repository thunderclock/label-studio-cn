#!/bin/bash
set -e

# 确保 Docker 守护进程正在运行
if ! docker info > /dev/null 2>&1; then
    echo "Docker 守护进程未运行，请先启动 Docker"
    exit 1
fi

# 设置环境变量
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# 创建新的构建器实例（如果不存在）
docker buildx create --name mybuilder --use || true

# 构建镜像
docker build \
    --platform linux/amd64 \
    --build-arg BUILDKIT_INLINE_CACHE=1 \
    --build-arg DOCKER_BUILDKIT=1 \
    --no-cache \
    --pull=false \
    --load \
    -t label-studio-cn:v1.0.1 .

# 标记镜像
docker tag label-studio-cn:v1.0.1 crpi-620ecqtjq2i2rm8r.cn-hangzhou.personal.cr.aliyuncs.com/aip_shuoyun/label-studio-cn:v1.0.1

# 推送镜像
docker push crpi-620ecqtjq2i2rm8r.cn-hangzhou.personal.cr.aliyuncs.com/aip_shuoyun/label-studio-cn:v1.0.1



