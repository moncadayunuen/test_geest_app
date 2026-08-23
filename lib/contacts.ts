import * as Yup from 'yup';
import { DEPARTMENTS, type ContactFormValues } from '@/types/contact';

export const contactSchema: Yup.ObjectSchema<ContactFormValues> = Yup.object({
  name: Yup.string().trim().min(3, 'Escribe al menos 3 caracteres').required('El nombre es obligatorio'),
  email: Yup.string().trim().email('Ingresa un correo válido').required('El correo es obligatorio'),
  phone: Yup.string().trim().matches(/^[+\d\s()-]{8,20}$/, { message: 'Ingresa un teléfono válido', excludeEmptyString: true }).defined(),
  department: Yup.mixed<ContactFormValues['department']>().oneOf(DEPARTMENTS).required('Selecciona un departamento'),
});

export const getInitials = (name: string) =>
  name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
