import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return { name: 'Nexo — Directorio de contactos', short_name: 'Nexo', description: 'Directorio para gestionar y encontrar los contactos de tu equipo.', start_url: '/', display: 'standalone', background_color: '#f4f6f9', theme_color: '#1d293d', lang: 'es-MX', icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }] };
}
