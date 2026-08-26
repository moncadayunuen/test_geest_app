'use client';

import { useEffect, useState } from 'react';
import { AddContactModal } from '@/components/add-contact-modal/add-contact-modal';
import { AnnouncementBanner } from '@/components/announcement-banner/announcement-banner';
import { ConfirmationModal } from '@/components/confirmation-modal/confirmation-modal';
import { ContactFilters } from '@/components/contact-filters/contact-filters';
import { ContactList } from '@/components/contact-list/contact-list';
import { EmptyState, LoadError, SkeletonList } from '@/components/directory-state/directory-state';
import { Icon } from '@/components/icon/icon';
import { useContactFilters } from '@/hooks/use-contact-filters';
import { useTimedMessage } from '@/hooks/use-timed-message';
import { useContactStore } from '@/stores/contact-store';
import type { Contact } from '@/types/contact';
import './contact-manager.scss';

export function ContactManager() {
  const contacts = useContactStore((state) => state.contacts);
  const status = useContactStore((state) => state.status);
  const loadContacts = useContactStore((state) => state.loadContacts);
  const addContactToStore = useContactStore((state) => state.addContact);
  const removeContact = useContactStore((state) => state.removeContact);
  const [showAdd, setShowAdd] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [pendingDelete, setPendingDelete] = useState<Contact | null>(null);
  const { message, showMessage, clearMessage } = useTimedMessage();
  const {
    query,
    setQuery,
    department,
    setDepartment,
    filteredContacts,
    counts,
    hasFilters,
    clearFilters,
  } = useContactFilters(contacts);
  const loading = status === 'idle' || status === 'loading';
  const loadError = status === 'error';

  useEffect(() => {
    const timer = window.setTimeout(() => void loadContacts(), 0);
    return () => window.clearTimeout(timer);
  }, [loadContacts]);

  const addContact = (contact: Contact) => {
    addContactToStore(contact);
    showMessage(`${contact.name} se agregó al directorio`);
  };

  const deleteContact = () => {
    if (!pendingDelete) return;

    removeContact(pendingDelete.id);
    showMessage(`${pendingDelete.name} se eliminó del directorio`);
  };

  const directoryContent = loading
    ? <SkeletonList />
    : loadError
      ? <LoadError onRetry={() => void loadContacts()} />
      : filteredContacts.length === 0
        ? <EmptyState filtered={hasFilters} onClear={clearFilters} onAdd={() => setShowAdd(true)} />
        : <ContactList contacts={filteredContacts} onDelete={setPendingDelete} />;

  return (
    <main className="app-shell">
      <a className="skip-link" href="#main-content">Saltar al contenido</a>

      <header className="topbar">
        <a className="brand" href="#main-content" aria-label="Nexo, ir al contenido">
          <span className="brand-mark"><Icon name="brand" size={20} /></span>
          <span>Nexo</span>
        </a>
        <div className="topbar-actions">
          <span className="workspace-label">Espacio de trabajo</span>
          <span className="avatar avatar-small">YM</span>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar" aria-label="Navegación principal">
          <nav>
            <a className="nav-item active" href="#main-content" aria-current="page">
              <Icon name="users" size={19} /> Contactos
            </a>
          </nav>
          <div className="sidebar-note">
            <span className="status-dot" />
            <div><strong>Directorio activo</strong><span>Datos locales</span></div>
          </div>
        </aside>

        <section id="main-content" className="content">
          {showAnnouncement && (
            <AnnouncementBanner count={contacts.length} onClose={() => setShowAnnouncement(false)} />
          )}

          <div className="page-heading">
            <div>
              <p className="eyebrow">Directorio del equipo</p>
              <h1>Contactos</h1>
              <p className="heading-copy">
                Gestiona a las personas que hacen posible el trabajo.
              </p>
            </div>
            <button className="primary-button" type="button" onClick={() => setShowAdd(true)}>
              <Icon name="plus" /> Agregar contacto
            </button>
          </div>

          <section className="directory-card" aria-labelledby="directory-title">
            <div className="directory-toolbar">
              <div>
                <h2 id="directory-title">Directorio</h2>
                <p aria-live="polite">
                  {loading
                    ? 'Cargando contactos…'
                    : `${filteredContacts.length} ${filteredContacts.length === 1
                      ? 'contacto encontrado'
                      : 'contactos encontrados'}`}
                </p>
              </div>

              <div className="toolbar-actions">
                <div className="search-control" role="search">
                  <span className="search-label">Buscar contactos</span>
                  <label className="search-field">
                    <Icon name="search" size={20} />
                    <span className="sr-only">Buscar por nombre</span>
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Escribe un nombre…"
                    />
                  </label>
                </div>
                {hasFilters && (
                  <button className="secondary-button clear-button" type="button" onClick={clearFilters}>
                    <Icon name="reset" size={14} /> Limpiar filtros
                  </button>
                )}
              </div>
            </div>

            <ContactFilters
              value={department}
              total={contacts.length}
              counts={counts}
              onChange={setDepartment}
            />
            <div className="filter-result" key={department}>{directoryContent}</div>
          </section>
        </section>
      </div>

      {showAdd && <AddContactModal onClose={() => setShowAdd(false)} onAdd={addContact} />}
      {pendingDelete && (
        <ConfirmationModal
          title="Eliminar contacto"
          description={(
            <>
              ¿Seguro que quieres eliminar a <strong>{pendingDelete.name}</strong>?
              {' '}Esta acción no se puede deshacer.
            </>
          )}
          icon={<Icon name="trash" size={22} />}
          confirmLabel="Sí, eliminar"
          onClose={() => setPendingDelete(null)}
          onConfirm={deleteContact}
        />
      )}
      {message && (
        <div className="toast" role="status">
          <Icon name="check" />
          <span>{message}</span>
          <button onClick={clearMessage} aria-label="Cerrar notificación">
            <Icon name="close" size={15} />
          </button>
        </div>
      )}
    </main>
  );
}
