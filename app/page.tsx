'use client';

import { Form, Formik, useField } from 'formik';
import { AlertTriangle, CheckCircle2, Mail, Phone, Plus, RotateCcw, Search, Sparkles, Trash2, UserPlus, UsersRound, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as Yup from 'yup';

export type Department = 'Ventas' | 'Desarrollo' | 'Marketing' | 'Soporte';
export type Contact = { id: string; name: string; email: string; phone?: string; department: Department };

const departments: Department[] = ['Ventas', 'Desarrollo', 'Marketing', 'Soporte'];
const contactSchema = Yup.object({
  name: Yup.string().trim().min(3, 'Escribe al menos 3 caracteres').required('El nombre es obligatorio'),
  email: Yup.string().trim().email('Ingresa un correo válido').required('El correo es obligatorio'),
  phone: Yup.string().trim().matches(/^[+\d\s()-]{8,20}$/, { message: 'Ingresa un teléfono válido', excludeEmptyString: true }),
  department: Yup.string().oneOf(departments).required('Selecciona un departamento'),
});

type FormValues = { name: string; email: string; phone: string; department: '' | Department };
const initials = (name: string) => name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();

function TextField({ label, optional, ...props }: { label: string; name: keyof FormValues; type?: string; placeholder?: string; optional?: boolean }) {
  const [field, meta] = useField(props);
  const showError = meta.touched && Boolean(meta.error);
  return <label className={`form-field ${showError ? 'invalid' : ''}`}><span>{label}{optional && <small>Opcional</small>}</span><input {...field} {...props} aria-invalid={showError} aria-describedby={showError ? `${props.name}-error` : undefined} />{showError && <em id={`${props.name}-error`}>{meta.error}</em>}</label>;
}

function AddContactModal({ onClose, onAdd }: { onClose: () => void; onAdd: (contact: Contact) => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    modalRef.current?.querySelector<HTMLInputElement>('input')?.focus();
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey); document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; previous?.focus(); };
  }, [onClose]);
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="add-contact-title" ref={modalRef}>
    <div className="modal-header"><div className="modal-icon"><UserPlus size={20} /></div><div><p>Nuevo registro</p><h2 id="add-contact-title">Agregar contacto</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="Cerrar formulario"><X size={19} /></button></div>
    <Formik<FormValues> initialValues={{ name: '', email: '', phone: '', department: '' }} validationSchema={contactSchema} validateOnMount onSubmit={(values) => { onAdd({ id: crypto.randomUUID(), name: values.name.trim(), email: values.email.trim().toLowerCase(), phone: values.phone.trim() || undefined, department: values.department as Department }); onClose(); }}>
      {({ isValid, dirty, isSubmitting, touched, errors, handleBlur, handleChange, values }) => <Form noValidate>
        <div className="modal-body"><p className="form-intro">Completa la información para incorporar a una persona al directorio.</p><TextField label="Nombre completo" name="name" placeholder="Ej. Daniela Torres" /><TextField label="Correo electrónico" name="email" type="email" placeholder="nombre@empresa.com" /><TextField label="Teléfono" name="phone" type="tel" placeholder="+52 55 1234 5678" optional />
          <label className={`form-field ${touched.department && errors.department ? 'invalid' : ''}`}><span>Departamento</span><select name="department" value={values.department} onChange={handleChange} onBlur={handleBlur} aria-invalid={Boolean(touched.department && errors.department)}><option value="" disabled>Selecciona una opción</option>{departments.map((department) => <option key={department}>{department}</option>)}</select>{touched.department && errors.department && <em>{errors.department}</em>}</label>
        </div>
        <div className="modal-footer"><button className="secondary-button" type="button" onClick={onClose}>Cancelar</button><button className="primary-button" type="submit" disabled={!dirty || !isValid || isSubmitting}><Plus size={17} /> Agregar contacto</button></div>
      </Form>}
    </Formik>
  </div></div>;
}

function SkeletonList() { return <div className="skeleton-list" role="status" aria-label="Cargando contactos">{[1, 2, 3, 4, 5].map((item) => <div className="skeleton-row" key={item}><span /><div><i /><i /></div><i /><i /></div>)}<span className="sr-only">Cargando contactos…</span></div>; }

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState<'Todos' | Department>('Todos');
  const [showAdd, setShowAdd] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Contact | null>(null);
  const [message, setMessage] = useState('');

  const loadContacts = async () => {
    setLoading(true); setLoadError(false);
    try { const response = await fetch('/data.json'); if (!response.ok) throw new Error(); const data = await response.json() as Contact[]; await new Promise((resolve) => setTimeout(resolve, 700)); setContacts(data); }
    catch { setLoadError(true); }
    finally { setLoading(false); }
  };
  useEffect(() => { const timer = window.setTimeout(() => void loadContacts(), 0); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { if (!message) return; const timeout = window.setTimeout(() => setMessage(''), 3200); return () => clearTimeout(timeout); }, [message]);

  const filtered = useMemo(() => contacts.filter((contact) => contact.name.toLocaleLowerCase('es').includes(query.trim().toLocaleLowerCase('es')) && (department === 'Todos' || contact.department === department)), [contacts, department, query]);
  const counts = useMemo(() => Object.fromEntries(departments.map((item) => [item, contacts.filter((contact) => contact.department === item).length])) as Record<Department, number>, [contacts]);
  const leadingDepartment = contacts.length ? departments.reduce((lead, item) => counts[item] > counts[lead] ? item : lead, departments[0]) : '—';
  const hasFilters = Boolean(query.trim()) || department !== 'Todos';
  const clearFilters = () => { setQuery(''); setDepartment('Todos'); };

  return <main className="app-shell">
    <a className="skip-link" href="#main-content">Saltar al contenido</a>
    <header className="topbar"><a className="brand" href="#main-content" aria-label="Nexo, ir al contenido"><span className="brand-mark"><Sparkles size={18} strokeWidth={2.2} /></span><span>Nexo</span></a><div className="topbar-actions"><span className="workspace-label">Espacio de trabajo</span><span className="avatar avatar-small">YM</span></div></header>
    <div className="layout"><aside className="sidebar" aria-label="Navegación principal"><nav><a className="nav-item active" href="#main-content" aria-current="page"><UsersRound size={19} /> Contactos</a></nav><div className="sidebar-note"><span className="status-dot" /><div><strong>Directorio activo</strong><span>Datos locales</span></div></div></aside>
      <section id="main-content" className="content">
        <div className="page-heading"><div><p className="eyebrow">Directorio del equipo</p><h1>Contactos</h1><p className="heading-copy">Gestiona a las personas que hacen posible el trabajo.</p></div><button className="primary-button" type="button" onClick={() => setShowAdd(true)}><Plus size={18} /> Agregar contacto</button></div>
        <div className="stats-grid" aria-label="Resumen de contactos"><article className="stat-card"><span>Contactos totales</span><strong>{loading ? '—' : contacts.length}</strong><small><UsersRound size={16} /> En {departments.filter((item) => counts[item]).length} departamentos</small></article><article className="stat-card"><span>Departamento principal</span><strong>{loading ? '—' : leadingDepartment}</strong><small>{leadingDepartment === '—' ? 'Sin datos' : `${counts[leadingDepartment as Department]} personas`}</small></article><article className="stat-card"><span>Estado del directorio</span><strong>{loadError ? 'Sin conexión' : 'Al día'}</strong><small>{loadError ? 'Reintenta la carga' : 'Fuente local sincronizada'}</small></article></div>
        <section className="directory-card" aria-labelledby="directory-title">
          <div className="directory-toolbar"><div><h2 id="directory-title">Directorio</h2><p aria-live="polite">{loading ? 'Cargando contactos…' : `${filtered.length} ${filtered.length === 1 ? 'contacto encontrado' : 'contactos encontrados'}`}</p></div><div className="toolbar-actions">{hasFilters && <button className="clear-button" type="button" onClick={clearFilters}><RotateCcw size={14} /> Limpiar</button>}<label className="search-field"><Search size={18} /><span className="sr-only">Buscar por nombre</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre…" /></label></div></div>
          <div id="departments" className="filter-row" aria-label="Filtrar por departamento">{(['Todos', ...departments] as const).map((item) => <button type="button" aria-pressed={department === item} className={`filter-chip ${department === item ? 'selected' : ''}`} onClick={() => setDepartment(item)} key={item}>{item}<span>{item === 'Todos' ? contacts.length : counts[item]}</span></button>)}</div>
          <div className="filter-result" key={department}>{loading ? <SkeletonList /> : loadError ? <div className="empty-state"><span className="empty-icon warning"><AlertTriangle size={25} /></span><h3>No pudimos cargar el directorio</h3><p>Verifica la fuente de datos e inténtalo nuevamente.</p><button className="secondary-button" type="button" onClick={() => void loadContacts()}>Reintentar</button></div> : filtered.length === 0 ? <div className="empty-state"><span className="empty-icon">{hasFilters ? <Search size={25} /> : <UsersRound size={25} />}</span><h3>{hasFilters ? 'No encontramos coincidencias' : 'Tu directorio está listo para crecer'}</h3><p>{hasFilters ? 'Prueba con otro nombre o cambia el departamento.' : 'Agrega el primer contacto para comenzar.'}</p>{hasFilters ? <button className="secondary-button" type="button" onClick={clearFilters}>Limpiar filtros</button> : <button className="primary-button" type="button" onClick={() => setShowAdd(true)}><Plus size={17} /> Agregar contacto</button>}</div> : <div className="contact-list"><div className="contact-table-head" aria-hidden="true"><span /><span>Nombre</span><span className="head-email">Correo</span><span className="head-phone">Teléfono</span><span>Departamento</span><span>Opciones</span></div>{filtered.map((contact, index) => <article className="contact-row" key={contact.id}><span className={`avatar tone-${index % 4}`}>{initials(contact.name)}</span><div className="contact-person"><strong>{contact.name}</strong><span>ID · {contact.id.slice(0, 8)}</span></div><a href={`mailto:${contact.email}`}><Mail size={13} />{contact.email}</a><a className="phone-link" href={contact.phone ? `tel:${contact.phone}` : undefined} aria-label={contact.phone ? `Llamar a ${contact.name}` : 'Sin teléfono'}><Phone size={13} />{contact.phone || 'Sin teléfono'}</a><span className="department-tag">{contact.department}</span><button className="delete-button" type="button" onClick={() => setPendingDelete(contact)} aria-label={`Eliminar a ${contact.name}`}><Trash2 size={17} /></button></article>)}</div>}</div>
        </section>
      </section>
    </div>
    {showAdd && <AddContactModal onClose={() => setShowAdd(false)} onAdd={(contact) => { setContacts((current) => [contact, ...current]); setMessage(`${contact.name} se agregó al directorio`); }} />}
    {pendingDelete && <div className="modal-backdrop" role="presentation"><div className="confirm-card" role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-description"><span className="confirm-icon"><Trash2 size={22} /></span><h2 id="delete-title">Eliminar contacto</h2><p id="delete-description">¿Seguro que quieres eliminar a <strong>{pendingDelete.name}</strong>? Esta acción no se puede deshacer.</p><div><button className="secondary-button" type="button" autoFocus onClick={() => setPendingDelete(null)}>Cancelar</button><button className="danger-button" type="button" onClick={() => { const name = pendingDelete.name; setContacts((current) => current.filter((contact) => contact.id !== pendingDelete.id)); setPendingDelete(null); setMessage(`${name} se eliminó del directorio`); }}>Sí, eliminar</button></div></div></div>}
    {message && <div className="toast" role="status"><CheckCircle2 size={18} /><span>{message}</span><button onClick={() => setMessage('')} aria-label="Cerrar notificación"><X size={15} /></button></div>}
  </main>;
}
