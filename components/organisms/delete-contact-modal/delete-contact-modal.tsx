'use client';

import { Trash2 } from 'lucide-react';
import { useModalExit } from '@/hooks/use-modal-exit';
import type { Contact } from '@/types/contact';
import './delete-contact-modal.scss';

type Props = { contact: Contact; onClose: () => void; onConfirm: () => void };

export function DeleteContactModal({ contact, onClose, onConfirm }: Props) {
  const { isClosing, requestClose } = useModalExit(onClose);

  const confirm = () => {
    onConfirm();
    requestClose();
  };

  return <div className={`modal-backdrop ${isClosing ? 'is-closing' : ''}`} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && requestClose()}>
    <div className="confirm-card" role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-description">
      <span className="confirm-icon"><Trash2 size={22} /></span><h2 id="delete-title">Eliminar contacto</h2>
      <p id="delete-description">¿Seguro que quieres eliminar a <strong>{contact.name}</strong>? Esta acción no se puede deshacer.</p>
      <div><button className="secondary-button" type="button" autoFocus onClick={requestClose}>Cancelar</button><button className="danger-button" type="button" onClick={confirm}>Sí, eliminar</button></div>
    </div>
  </div>;
}
