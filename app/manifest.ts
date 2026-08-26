import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nexo — Gestión de contactos',
    short_name: 'Nexo',
    description: 'Centraliza, encuentra y organiza los contactos de tu equipo.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4f6f9',
    theme_color: '#07529d',
    lang: 'es-MX',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
