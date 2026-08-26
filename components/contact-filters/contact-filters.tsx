import { DEPARTMENTS, type Department } from '@/types/contact';
import './contact-filters.scss';

type FilterValue = 'Todos' | Department;
type Props = {
  value: FilterValue;
  total: number;
  counts: Record<Department, number>;
  onChange: (value: FilterValue) => void;
};

export function ContactFilters({ value, total, counts, onChange }: Props) {
  const filters: FilterValue[] = ['Todos', ...DEPARTMENTS];

  return (
    <fieldset id="departments" className="contact-filters">
      <legend>Filtrar por departamento</legend>
      <div className="contact-filters__options">
        {filters.map((filter) => {
          const isSelected = value === filter;
          const modifier = filter.toLocaleLowerCase('es');

          return (
            <button
              className={`contact-filters__option ${isSelected ? 'contact-filters__option--selected' : ''}`}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(filter)}
              key={filter}
            >
              {filter === 'Todos' ? (
                <span className="contact-filters__indicator" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              ) : (
                <span
                  className={`contact-filters__dot contact-filters__dot--${modifier}`}
                  aria-hidden="true"
                />
              )}
              {filter}
              <small>{filter === 'Todos' ? total : counts[filter]}</small>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
