import { useMemo, useState } from 'react';
import { DEPARTMENTS, type Contact, type Department } from '@/types/contact';

export function useContactFilters(contacts: Contact[]) {
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState<'Todos' | Department>('Todos');

  const filteredContacts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('es');
    return contacts.filter((contact) => contact.name.toLocaleLowerCase('es').includes(normalizedQuery)
      && (department === 'Todos' || contact.department === department));
  }, [contacts, department, query]);

  const counts = useMemo(() => Object.fromEntries(
    DEPARTMENTS.map((item) => [item, contacts.filter((contact) => contact.department === item).length]),
  ) as Record<Department, number>, [contacts]);

  const hasFilters = Boolean(query.trim()) || department !== 'Todos';
  const clearFilters = () => { setQuery(''); setDepartment('Todos'); };

  return { query, setQuery, department, setDepartment, filteredContacts, counts, hasFilters, clearFilters };
}
