export const DEPARTMENTS = ['Ventas', 'Desarrollo', 'Marketing', 'Soporte'] as const;

export type Department = (typeof DEPARTMENTS)[number];

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department: Department;
};

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  department: '' | Department;
};
