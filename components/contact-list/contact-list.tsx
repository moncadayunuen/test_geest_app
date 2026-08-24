'use client';

import { ChevronDown, Mail, Phone, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { getInitials } from '@/lib/contacts';
import type { Contact } from '@/types/contact';
import './contact-list.scss';

type Props = { contacts: Contact[]; onDelete: (contact: Contact) => void };

export function ContactList({ contacts, onDelete }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  return <div className="contact-list"><div className="contact-table-head" aria-hidden="true"><span /><span>Nombre</span><span className="head-email">Correo</span><span className="head-phone">Teléfono</span><span>Departamento</span><span>Opciones</span></div>{contacts.map((contact, index) => {
    const expanded = expandedId === contact.id;
    return <article className={`contact-row ${expanded ? 'expanded' : ''}`} key={contact.id}><span className={`avatar tone-${index % 4}`}>{getInitials(contact.name)}</span><div className="contact-person"><strong>{contact.name}</strong><span>ID · {contact.id.slice(0, 8)}</span></div><a href={`mailto:${contact.email}`}><Mail size={13} />{contact.email}</a><a className="phone-link" href={contact.phone ? `tel:${contact.phone}` : undefined} aria-label={contact.phone ? `Llamar a ${contact.name}` : 'Sin teléfono'}><Phone size={13} />{contact.phone || 'Sin teléfono'}</a><span className="department-tag">{contact.department}</span><div className="row-actions"><button className="expand-button" type="button" aria-expanded={expanded} aria-label={`${expanded ? 'Ocultar' : 'Mostrar'} información de ${contact.name}`} onClick={() => setExpandedId(expanded ? null : contact.id)}><ChevronDown size={18} /></button><button className="delete-button" type="button" onClick={() => onDelete(contact)} aria-label={`Eliminar a ${contact.name}`}><Trash2 size={17} /></button></div></article>;
  })}</div>;
}
