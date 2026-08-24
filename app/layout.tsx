import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './vendor.css';
import './globals.scss';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexo-contactos.lobodev-soporte.chatgpt.site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Nexo | Directorio de contactos', template: '%s | Nexo' },
  description: 'Gestiona, encuentra y organiza los contactos de tu equipo desde un directorio rápido, accesible y centralizado.',
  applicationName: 'Nexo',
  authors: [{ name: 'Yunuen Moncada' }],
  creator: 'Yunuen Moncada',
  category: 'productivity',
  keywords: ['directorio de contactos', 'gestión de contactos', 'directorio de equipo', 'Nexo'],
  alternates: { canonical: '/' },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }], shortcut: '/favicon.svg' },
  manifest: '/manifest.webmanifest',
  openGraph: { type: 'website', locale: 'es_MX', url: '/', siteName: 'Nexo', title: 'Nexo | Directorio de contactos', description: 'Encuentra y organiza los contactos de tu equipo desde un solo lugar.' },
  twitter: { card: 'summary', title: 'Nexo | Directorio de contactos', description: 'Encuentra y organiza los contactos de tu equipo desde un solo lugar.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
