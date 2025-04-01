import { useCallback, useRef, useState } from "react";
import { Button } from "../../../components";
import { LeaveBlocker, type LeaveBlockerCallbacks } from "../../../components/LeaveBlocker/LeaveBlocker";
import { modal } from "../../../components/Modal/Modal";
import { Space } from "../../../components/Space/Space";
import { useTranslation } from "react-i18next";

type SaveAndLeaveButtonProps = {
  onSave: () => void;
  text?: string;
};

const SaveAndLeaveButton = ({ onSave, text }: SaveAndLeaveButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button onClick={onSave} look="primary" size="compact">
      {text ?? t('createProject.unsavedChanges.save')}
    </Button>
  );
};

type UnsavedChangesModalProps = {
  onSave: () => void;
  onCancel?: () => void;
  onDiscard?: () => void;
  cancelText?: string;
  discardText?: string;
  okText?: string;
  title?: string;
  body?: string;
};

export const unsavedChangesModal = ({
  onSave,
  onCancel,
  onDiscard,
  cancelText,
  discardText,
  okText,
  title,
  body,
  ...props
}: UnsavedChangesModalProps) => {
  const { t } = useTranslation();
  let modalInstance: any = undefined;
  const saveAndLeave = async () => {
    await onSave?.();
    modalInstance?.close();
  };
  modalInstance = modal({
    ...props,
    title: title ?? t('createProject.unsavedChanges.title'),
    body: () => <>{body ?? t('createProject.unsavedChanges.body')}</>,
    allowClose: true,
    footer: (
      <Space align="end" size="small" className="modal-footer">
        <Button
          onClick={() => {
            onCancel?.();
            modalInstance?.close();
          }}
          size="compact"
          autoFocus
        >
          {cancelText ?? t('createProject.unsavedChanges.cancel')}
        </Button>

        {onDiscard && (
          <Button
            onClick={() => {
              onDiscard?.();
              modalInstance?.close();
            }}
            size="compact"
            look="danger"
          >
            {discardText ?? t('createProject.unsavedChanges.discard')}
          </Button>
        )}

        <SaveAndLeaveButton onSave={saveAndLeave} text={okText} />
      </Space>
    ),
    style: { width: 512 },
    unique: "UNSAVED_CHANGES_MODAL",
  });
};

type UnsavedChangesProps = {
  hasChanges: boolean;
  onSave: () => any;
};

/**
 * Component that blocks navigation if there are unsaved changes
 * @param hasChanges - flag that indicates if there are unsaved changes
 * @param onSave - function that should be called to save changes
 */
export const UnsavedChanges = ({ hasChanges, onSave }: UnsavedChangesProps) => {
  const saveHandlerRef = useRef(onSave);
  saveHandlerRef.current = onSave;
  const blockHandler = useCallback(async ({ continueCallback, cancelCallback }: LeaveBlockerCallbacks) => {
    const wrappedOnSave = async () => {
      const result = await saveHandlerRef.current?.();
      if (result === true) {
        continueCallback && setTimeout(continueCallback, 0);
      } else {
        // We consider that user tries to save changes, but as long as there are some errors,
        // we just close the modal to allow user to see and fix them
        cancelCallback?.();
      }
    };

    unsavedChangesModal({
      onSave: wrappedOnSave,
      onCancel: cancelCallback,
      onDiscard: continueCallback,
    });
  }, []);

  return <LeaveBlocker active={hasChanges} onBlock={blockHandler} />;
};
