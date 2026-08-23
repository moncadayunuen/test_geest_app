'use client';

import { Form, Formik } from 'formik';
import { Plus, UserPlus, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { contactSchema } from '@/lib/contacts';
import { DEPARTMENTS, type Contact, type ContactFormValues } from '@/types/contact';
import { TextField } from '@/components/ui/text-field';
import { useModalExit } from '@/components/ui/use-modal-exit';

type Props = { onClose: () => void; onAdd: (contact: Contact) => void };

export function AddContactModal({ onClose, onAdd }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { isClosing, requestClose } = useModalExit(onClose);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    modalRef.current?.querySelector<HTMLInputElement>('input')?.focus();
    const handleKey = (event: KeyboardEvent) => event.key === 'Escape' && requestClose();
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; previous?.focus(); };
  }, [requestClose]);

  const submit = (values: ContactFormValues) => {
    onAdd({ id: crypto.randomUUID(), name: values.name.trim(), email: values.email.trim().toLowerCase(), phone: values.phone.trim() || undefined, department: values.department as Contact['department'] });
    requestClose();
  };

  return <div className={`modal-backdrop ${isClosing ? 'is-closing' : ''}`} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && requestClose()}><div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="add-contact-title" ref={modalRef}>
    <div className="modal-header"><div className="modal-icon"><UserPlus size={20} /></div><div><p>Nuevo registro</p><h2 id="add-contact-title">Agregar contacto</h2></div><button type="button" className="icon-button" onClick={requestClose} aria-label="Cerrar formulario"><X size={19} /></button></div>
    <Formik<ContactFormValues> initialValues={{ name: '', email: '', phone: '', department: '' }} validationSchema={contactSchema} validateOnMount onSubmit={submit}>{({ isValid, dirty, isSubmitting, touched, errors, handleBlur, handleChange, values }) => <Form noValidate>
      <div className="modal-body"><p className="form-intro">Completa la información para incorporar a una persona al directorio.</p><TextField label="Nombre completo" name="name" placeholder="Ej. Daniela Torres" /><TextField label="Correo electrónico" name="email" type="email" placeholder="nombre@empresa.com" /><TextField label="Teléfono" name="phone" type="tel" placeholder="+52 55 1234 5678" optional /><label className={`form-field ${touched.department && errors.department ? 'invalid' : ''}`}><span>Departamento</span><select name="department" value={values.department} onChange={handleChange} onBlur={handleBlur} aria-invalid={Boolean(touched.department && errors.department)}><option value="" disabled>Selecciona una opción</option>{DEPARTMENTS.map((item) => <option key={item}>{item}</option>)}</select>{touched.department && errors.department && <em>{errors.department}</em>}</label></div>
      <div className="modal-footer"><button className="secondary-button" type="button" onClick={requestClose}>Cancelar</button><button className="primary-button" type="submit" disabled={!dirty || !isValid || isSubmitting}><Plus size={17} /> Agregar contacto</button></div>
    </Form>}</Formik>
  </div></div>;
}
