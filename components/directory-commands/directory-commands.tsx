import { Icon } from '@/components/icon/icon';
import './directory-commands.scss';

type Props = {
  onSearch: () => void;
  onAdd: () => void;
};

export function DirectoryCommands({ onSearch, onAdd }: Props) {
  return (
    <aside className="directory-commands" aria-label="Comandos disponibles">
      <span className="directory-commands__label">Comandos disponibles</span>
      <div className="directory-commands__list">
        <button type="button" onClick={onSearch}>
          <Icon name="search" size={14} />
          Buscar por nombre
        </button>
        <button type="button" onClick={onAdd}>
          <Icon name="plus" size={14} />
          Nuevo contacto
          <kbd>N</kbd>
        </button>
        <span>
          Filtrar por departamento
        </span>
        <span>
          <Icon name="trash" size={14} />
          Eliminar desde opciones
        </span>
      </div>
    </aside>
  );
}
