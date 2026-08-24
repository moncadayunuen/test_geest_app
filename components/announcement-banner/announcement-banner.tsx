'use client';

import { Icon } from '@/components/icon/icon';
import './announcement-banner.scss';

type Props = {
  count: number;
  onAction: () => void;
  onClose: () => void;
};

export function AnnouncementBanner({ count, onAction, onClose }: Props) {
  return <section className="announcement-banner" aria-label="Resumen del directorio">
    <span className="announcement-badge">{count} {count === 1 ? 'contacto' : 'contactos'}</span>
    <p><strong>Tu equipo, siempre a la mano</strong><span>Centraliza la información y encuentra a cualquier persona en segundos.</span></p>
    <button className="announcement-action" type="button" onClick={onAction}><Icon name="plus" size={16} /> Agregar contacto</button>
    <button className="announcement-close" type="button" onClick={onClose} aria-label="Cerrar resumen"><Icon name="close" size={18} /></button>
  </section>;
}
