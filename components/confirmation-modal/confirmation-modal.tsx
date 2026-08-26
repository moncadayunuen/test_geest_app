'use client';

import type { ReactNode } from 'react';
import { useDialogAccessibility } from '@/hooks/use-dialog-accessibility';
import { useModalExit } from '@/hooks/use-modal-exit';
import './confirmation-modal.scss';

type Props = {
  title: string;
  description: ReactNode;
  icon: ReactNode;
  confirmLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
};

export function ConfirmationModal({
  title,
  description,
  icon,
  confirmLabel = 'Confirmar',
  onClose,
  onConfirm,
}: Props) {
  const { isClosing, requestClose } = useModalExit(onClose);
  const dialogRef = useDialogAccessibility(requestClose, '.secondary-button');

  const confirm = () => {
    onConfirm();
    requestClose();
  };

  return (
    <div
      className={`modal-backdrop ${isClosing ? 'is-closing' : ''}`}
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && requestClose()}
    >
      <div
        className="confirm-card"
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-description"
      >
        <span className="confirm-icon">{icon}</span>
        <h2 id="delete-title">{title}</h2>
        <p id="delete-description">{description}</p>
        <div>
          <button className="secondary-button" type="button" onClick={requestClose}>
            Cancelar
          </button>
          <button className="danger-button" type="button" onClick={confirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
