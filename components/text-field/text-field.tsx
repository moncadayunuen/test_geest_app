'use client';

import { useField } from 'formik';
import { useState, type ChangeEventHandler } from 'react';
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
  const [hasInteracted, setHasInteracted] = useState(false);
  const showError = Boolean(meta.error) && (meta.touched || hasInteracted);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setHasInteracted(true);
    field.onChange(event);
  };

  return (
    <label className={`form-field ${showError ? 'invalid' : ''}`}>
      <span>{label}{optional && <small>Opcional</small>}</span>
      <input {...field} {...props} onChange={handleChange} aria-invalid={showError} aria-describedby={showError ? `${props.name}-error` : undefined} />
      {showError && <em id={`${props.name}-error`} role="status" aria-live="polite">{meta.error}</em>}
    </label>
  );
}
