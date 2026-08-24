'use client';

import { useField } from 'formik';
import type { ContactFormValues } from '@/types/contact';
import './text-field.scss';

type TextFieldProps = {
  label: string;
  name: keyof ContactFormValues;
  type?: string;
  placeholder?: string;
  optional?: boolean;
};

export function TextField({ label, optional, ...props }: TextFieldProps) {
  const [field, meta] = useField(props);
  const showError = meta.touched && Boolean(meta.error);

  return (
    <label className={`form-field ${showError ? 'invalid' : ''}`}>
      <span>{label}{optional && <small>Opcional</small>}</span>
      <input {...field} {...props} aria-invalid={showError} aria-describedby={showError ? `${props.name}-error` : undefined} />
      {showError && <em id={`${props.name}-error`}>{meta.error}</em>}
    </label>
  );
}
