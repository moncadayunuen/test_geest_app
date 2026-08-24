import type { ReactNode, SVGProps } from 'react';
import './icon.scss';

export type IconName = 'brand' | 'check' | 'chevron-down' | 'close' | 'mail' | 'phone' | 'plus' | 'reset' | 'search' | 'trash' | 'user-plus' | 'users' | 'warning';

type Props = Omit<SVGProps<SVGSVGElement>, 'children'> & { name: IconName; size?: number };

const paths: Record<IconName, ReactNode> = {
  brand: <><path d="M6 17V7h2.7l6.2 6.7V7h2.7v10H15l-6.3-6.8V17H6Z" fill="currentColor" stroke="none" /><circle cx="17.5" cy="5.5" r="2" fill="currentColor" stroke="none" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  phone: <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-1-2 2c-4-1.7-7.3-5-9-9l2-2-1-4Z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  reset: <><path d="M4 8V4m0 0h4M4 4l3 3a8 8 0 1 1-2 8" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" /></>,
  'user-plus': <><circle cx="9" cy="8" r="4" /><path d="M3 21v-2a6 6 0 0 1 12 0v2M19 8v6M16 11h6" /></>,
  users: <><circle cx="9" cy="8" r="4" /><path d="M2 21v-2a7 7 0 0 1 14 0v2M17 4a4 4 0 0 1 0 8M18 15a6 6 0 0 1 4 6" /></>,
  warning: <><path d="M12 3 2.5 20h19L12 3Z" /><path d="M12 9v5M12 17h.01" /></>,
};

export function Icon({ name, size = 18, className = '', ...props }: Props) {
  return <svg className={`app-icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>{paths[name]}</svg>;
}
