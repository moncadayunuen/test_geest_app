export const siteConfig = {
  name: 'Nexo',
  title: 'Nexo | Gestión de contactos de equipo',
  description: 'Centraliza, encuentra y organiza la información de contacto de tu equipo desde un directorio rápido y accesible.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexo-contactos.lobodev-soporte.chatgpt.site',
  socialImage: '/nexo-social-share.png',
  locale: 'es_MX',
  language: 'es-MX',
} as const;
