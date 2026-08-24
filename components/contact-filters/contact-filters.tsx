import { DEPARTMENTS, type Department } from '@/types/contact';
import './contact-filters.scss';

type FilterValue = 'Todos' | Department;
type Props = { value: FilterValue; total: number; counts: Record<Department, number>; onChange: (value: FilterValue) => void };

export function ContactFilters({ value, total, counts, onChange }: Props) {
  return <div id="departments" className="contact-filters">
    <label htmlFor="department-filter">Filtrar:</label>
    <div className="filter-select">
      <span className="filter-indicator" aria-hidden="true"><i /><i /><i /></span>
      <select id="department-filter" value={value} onChange={(event) => onChange(event.target.value as FilterValue)}>
        <option value="Todos">Todos ({total})</option>
        {DEPARTMENTS.map((department) => <option value={department} key={department}>{department} ({counts[department]})</option>)}
      </select>
    </div>
  </div>;
}
