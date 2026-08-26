import { DEPARTMENTS, type Department } from '@/types/contact';
import './contact-filters.scss';

type FilterValue = 'Todos' | Department;
type Props = { value: FilterValue; total: number; counts: Record<Department, number>; onChange: (value: FilterValue) => void };

export function ContactFilters({ value, total, counts, onChange }: Props) {
  const filters: FilterValue[] = ['Todos', ...DEPARTMENTS];

  return <fieldset id="departments" className="contact-filters">
    <legend>Filtrar por departamento</legend>
    <div className="filter-options">
      {filters.map((filter) => <button className={`filter-option ${value === filter ? 'selected' : ''}`} type="button" aria-pressed={value === filter} onClick={() => onChange(filter)} key={filter}>
        {filter === 'Todos' ? <span className="filter-indicator" aria-hidden="true"><i /><i /><i /></span> : <span className={`filter-dot filter-dot-${filter.toLocaleLowerCase('es')}`} aria-hidden="true" />}
        {filter}<small>{filter === 'Todos' ? total : counts[filter]}</small>
      </button>)}
    </div>
  </fieldset>;
}
