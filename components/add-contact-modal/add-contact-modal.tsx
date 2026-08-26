'use client';

import { Form, Formik } from 'formik';
import { useEffect, useRef } from 'react';
import { Icon } from '@/components/icon/icon';
import { contactSchema } from '@/lib/contacts';
import { DEPARTMENTS, type Contact, type ContactFormValues } from '@/types/contact';
import { TextField } from '@/components/text-field/text-field';
import { useModalExit } from '@/hooks/use-modal-exit';
import './add-contact-modal.scss';

type Props = {
  onClose: () => void;
  onAdd: (contact: Contact) => void;
};

export function AddContactModal({ onClose, onAdd }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { isClosing, requestClose } = useModalExit(onClose);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    modalRef.current?.querySelector<HTMLInputElement>('input')?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      previous?.focus();
    };
  }, [requestClose]);

  const submit = (values: ContactFormValues) => {
    onAdd({
      id: crypto.randomUUID(),
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone.trim() || undefined,
      department: values.department as Contact['department'],
    });
    requestClose();
  };

  return (
    <div
      className={`modal-backdrop ${isClosing ? 'is-closing' : ''}`}
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && requestClose()}
    >
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-contact-title"
        ref={modalRef}
      >
        <div className="modal-header">
          <div className="modal-icon">
            <Icon name="user-plus" size={20} />
          </div>
          <div>
            <p>Nuevo registro</p>
            <h2 id="add-contact-title">Agregar contacto</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={requestClose}
            aria-label="Cerrar formulario"
          >
            <Icon name="close" size={19} />
          </button>
        </div>

        <Formik<ContactFormValues>
          initialValues={{ name: '', email: '', phone: '', department: '' }}
          validationSchema={contactSchema}
          validateOnMount
          validateOnChange
          validateOnBlur
          onSubmit={submit}
        >
          {({ isValid, dirty, isSubmitting, touched, errors, handleBlur, handleChange, values }) => (
            <Form noValidate>
              <div className="modal-body">
                <p className="form-intro">Completa la información para incorporar a una persona al directorio.</p>
                <TextField label="Nombre completo" name="name" placeholder="Ej. Daniela Torres" required />
                <TextField
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  placeholder="nombre@empresa.com"
                  required
                />
                <TextField
                  label="Teléfono"
                  name="phone"
                  type="tel"
                  placeholder="+52 55 1234 5678"
                  optional
                />
                <label className={`form-field ${touched.department && errors.department ? 'invalid' : ''}`}>
                  <span>Departamento <b aria-hidden="true">*</b></span>
                  <select
                    name="department"
                    value={values.department}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={Boolean(touched.department && errors.department)}
                  >
                    <option value="" disabled>Selecciona una opción</option>
                    {DEPARTMENTS.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  {touched.department && errors.department && <em>{errors.department}</em>}
                </label>
              </div>
              <div className="modal-footer">
                <span className="form-status"><b aria-hidden="true">*</b> Campos obligatorios</span>
                <div className="modal-actions">
                  <button className="secondary-button" type="button" onClick={requestClose}>
                    Cancelar
                  </button>
                  <button
                    className="primary-button"
                    type="submit"
                    disabled={!dirty || !isValid || isSubmitting}
                    aria-disabled={!dirty || !isValid || isSubmitting}
                  >
                    <Icon name="plus" size={17} /> Agregar contacto
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
