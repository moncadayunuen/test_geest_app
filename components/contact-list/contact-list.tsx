'use client';

import { useState } from 'react';
import { Icon } from '@/components/icon/icon';
import { getInitials } from '@/lib/contacts';
import type { Contact } from '@/types/contact';
import './contact-list.scss';

type Props = { contacts: Contact[]; onDelete: (contact: Contact) => void };

export function ContactList({ contacts, onDelete }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  return <div className="contact-list"><div className="contact-table-head" aria-hidden="true"><span /><span>{contacts.length} {contacts.length === 1 ? 'contacto' : 'contactos'}</span><span className="head-email">Correo</span><span className="head-phone">Teléfono</span><span>Departamento</span><span>Opciones</span></div>{contacts.map((contact, index) => {
    const expanded = expandedId === contact.id;
    return <article className={`contact-row ${expanded ? 'expanded' : ''}`} data-department={contact.department} key={contact.id}><span className={`avatar tone-${index % 4}`}>{getInitials(contact.name)}</span><div className="contact-person"><strong>{contact.name}</strong><span>ID · {contact.id.slice(0, 8)}</span></div><a href={`mailto:${contact.email}`}><Icon name="mail" size={13} />{contact.email}</a><a className="phone-link" href={contact.phone ? `tel:${contact.phone}` : undefined} aria-label={contact.phone ? `Llamar a ${contact.name}` : 'Sin teléfono'}><Icon name="phone" size={13} />{contact.phone || 'Sin teléfono'}</a><span className="department-tag">{contact.department}</span><div className="row-actions"><button className="expand-button" type="button" aria-expanded={expanded} aria-label={`${expanded ? 'Ocultar' : 'Mostrar'} información de ${contact.name}`} onClick={() => setExpandedId(expanded ? null : contact.id)}><Icon name="chevron-down" /></button><button className="delete-button" type="button" onClick={() => onDelete(contact)} aria-label={`Eliminar a ${contact.name}`}><Icon name="trash" size={17} /></button></div></article>;
  })}</div>;
}
