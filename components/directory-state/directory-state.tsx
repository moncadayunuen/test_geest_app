import { AlertTriangle, Plus, Search, UsersRound } from 'lucide-react';
import './directory-state.scss';

export function SkeletonList() { return <div className="skeleton-list" role="status" aria-label="Cargando contactos">{[1, 2, 3, 4, 5].map((item) => <div className="skeleton-row" key={item}><span /><div><i /><i /></div><i /><i /></div>)}<span className="sr-only">Cargando contactos…</span></div>; }

type EmptyProps = { filtered: boolean; onClear: () => void; onAdd: () => void };
export function EmptyState({ filtered, onClear, onAdd }: EmptyProps) { return <div className="empty-state"><span className="empty-icon">{filtered ? <Search size={25} /> : <UsersRound size={25} />}</span><h3>{filtered ? 'No encontramos coincidencias' : 'Tu directorio está listo para crecer'}</h3><p>{filtered ? 'Prueba con otro nombre o cambia el departamento.' : 'Agrega el primer contacto para comenzar.'}</p>{filtered ? <button className="secondary-button" type="button" onClick={onClear}>Limpiar filtros</button> : <button className="primary-button" type="button" onClick={onAdd}><Plus size={17} /> Agregar contacto</button>}</div>; }

export function LoadError({ onRetry }: { onRetry: () => void }) { return <div className="empty-state"><span className="empty-icon warning"><AlertTriangle size={25} /></span><h3>No pudimos cargar el directorio</h3><p>Verifica la fuente de datos e inténtalo nuevamente.</p><button className="secondary-button" type="button" onClick={onRetry}>Reintentar</button></div>; }
