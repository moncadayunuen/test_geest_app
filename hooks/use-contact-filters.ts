import { useCallback, useMemo, useState } from 'react';
import { DEPARTMENTS, type Contact, type Department } from '@/types/contact';

type DepartmentFilter = 'Todos' | Department;

export function useContactFilters(contacts: Contact[]) {
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState<DepartmentFilter>('Todos');

  const filteredContacts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('es');

    return contacts.filter((contact) => {
      const matchesName = contact.name
        .toLocaleLowerCase('es')
        .includes(normalizedQuery);
      const matchesDepartment = department === 'Todos'
        || contact.department === department;

      return matchesName && matchesDepartment;
    });
  }, [contacts, department, query]);

  const counts = useMemo(() => {
    const departmentEntries = DEPARTMENTS.map((item) => {
      const total = contacts.filter((contact) => contact.department === item).length;
      return [item, total];
    });

    return Object.fromEntries(departmentEntries) as Record<Department, number>;
  }, [contacts]);

  const hasFilters = Boolean(query.trim()) || department !== 'Todos';
  const clearFilters = useCallback(() => {
    setQuery('');
    setDepartment('Todos');
  }, []);

  return {
    query,
    setQuery,
    department,
    setDepartment,
    filteredContacts,
    counts,
    hasFilters,
    clearFilters,
  };
}
