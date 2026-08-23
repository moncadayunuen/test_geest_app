'use client';

import { CheckCircle2, Plus, RotateCcw, Search, Sparkles, Trash2, UsersRound, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AddContactModal } from '@/components/contacts/add-contact-modal';
import { ContactList } from '@/components/contacts/contact-list';
import { EmptyState, LoadError, SkeletonList } from '@/components/contacts/directory-states';
import { DEPARTMENTS, type Contact, type Department } from '@/types/contact';

export function ContactManager() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState<'Todos' | Department>('Todos');
  const [showAdd, setShowAdd] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Contact | null>(null);
  const [message, setMessage] = useState('');

  const loadContacts = useCallback(async () => {
    setLoading(true); setLoadError(false);
    try {
      const response = await fetch('/data.json');
      if (!response.ok) throw new Error('No se pudo cargar data.json');
      const data = await response.json() as Contact[];
      await new Promise((resolve) => setTimeout(resolve, 700));
      setContacts(data);
    } catch { setLoadError(true); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { const timer = window.setTimeout(() => void loadContacts(), 0); return () => window.clearTimeout(timer); }, [loadContacts]);
  useEffect(() => { if (!message) return; const timeout = window.setTimeout(() => setMessage(''), 3200); return () => clearTimeout(timeout); }, [message]);

  const filteredContacts = useMemo(() => contacts.filter((contact) => contact.name.toLocaleLowerCase('es').includes(query.trim().toLocaleLowerCase('es')) && (department === 'Todos' || contact.department === department)), [contacts, department, query]);
  const counts = useMemo(() => Object.fromEntries(DEPARTMENTS.map((item) => [item, contacts.filter((contact) => contact.department === item).length])) as Record<Department, number>, [contacts]);
  const hasFilters = Boolean(query.trim()) || department !== 'Todos';
  const clearFilters = () => { setQuery(''); setDepartment('Todos'); };

  const addContact = (contact: Contact) => { setContacts((current) => [contact, ...current]); setMessage(`${contact.name} se agregó al directorio`); };
  const deleteContact = () => { if (!pendingDelete) return; const name = pendingDelete.name; setContacts((current) => current.filter((contact) => contact.id !== pendingDelete.id)); setPendingDelete(null); setMessage(`${name} se eliminó del directorio`); };

  return <main className="app-shell">
    <a className="skip-link" href="#main-content">Saltar al contenido</a>
    <header className="topbar"><a className="brand" href="#main-content" aria-label="Nexo, ir al contenido"><span className="brand-mark"><Sparkles size={18} strokeWidth={2.2} /></span><span>Nexo</span></a><div className="topbar-actions"><span className="workspace-label">Espacio de trabajo</span><span className="avatar avatar-small">YM</span></div></header>
    <div className="layout"><aside className="sidebar" aria-label="Navegación principal"><nav><a className="nav-item active" href="#main-content" aria-current="page"><UsersRound size={19} /> Contactos</a></nav><div className="sidebar-note"><span className="status-dot" /><div><strong>Directorio activo</strong><span>Datos locales</span></div></div></aside>
      <section id="main-content" className="content">
        <div className="page-heading"><div><p className="eyebrow">Directorio del equipo</p><h1>Contactos</h1><p className="heading-copy">Gestiona a las personas que hacen posible el trabajo.</p></div><button className="primary-button" type="button" onClick={() => setShowAdd(true)}><Plus size={18} /> Agregar contacto</button></div>
        <section className="directory-card" aria-labelledby="directory-title">
          <div className="directory-toolbar"><div><h2 id="directory-title">Directorio</h2><p aria-live="polite">{loading ? 'Cargando contactos…' : `${filteredContacts.length} ${filteredContacts.length === 1 ? 'contacto encontrado' : 'contactos encontrados'}`}</p></div><div className="toolbar-actions"><div className="search-control"><span className="search-label">Buscar contactos</span><label className="search-field"><Search size={20} /><span className="sr-only">Buscar por nombre</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Escribe un nombre…" /></label></div>{hasFilters && <button className="clear-button" type="button" onClick={clearFilters}><RotateCcw size={14} /> Limpiar filtros</button>}</div></div>
          <div id="departments" className="filter-row" aria-label="Filtrar por departamento">{(['Todos', ...DEPARTMENTS] as const).map((item) => <button type="button" aria-pressed={department === item} className={`filter-chip ${department === item ? 'selected' : ''}`} onClick={() => setDepartment(item)} key={item}>{item}<span>{item === 'Todos' ? contacts.length : counts[item]}</span></button>)}</div>
          <div className="filter-result" key={department}>{loading ? <SkeletonList /> : loadError ? <LoadError onRetry={() => void loadContacts()} /> : filteredContacts.length === 0 ? <EmptyState filtered={hasFilters} onClear={clearFilters} onAdd={() => setShowAdd(true)} /> : <ContactList contacts={filteredContacts} onDelete={setPendingDelete} />}</div>
        </section>
      </section>
    </div>
    {showAdd && <AddContactModal onClose={() => setShowAdd(false)} onAdd={addContact} />}
    {pendingDelete && <div className="modal-backdrop" role="presentation"><div className="confirm-card" role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-description"><span className="confirm-icon"><Trash2 size={22} /></span><h2 id="delete-title">Eliminar contacto</h2><p id="delete-description">¿Seguro que quieres eliminar a <strong>{pendingDelete.name}</strong>? Esta acción no se puede deshacer.</p><div><button className="secondary-button" type="button" autoFocus onClick={() => setPendingDelete(null)}>Cancelar</button><button className="danger-button" type="button" onClick={deleteContact}>Sí, eliminar</button></div></div></div>}
    {message && <div className="toast" role="status"><CheckCircle2 size={18} /><span>{message}</span><button onClick={() => setMessage('')} aria-label="Cerrar notificación"><X size={15} /></button></div>}
  </main>;
}
