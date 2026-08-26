import type { Metadata, Viewport } from 'next';
import { siteConfig } from '@/config/site';
import './vendor.css';
import './globals.scss';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | Nexo',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: 'Yunuen Moncada' }],
  creator: 'Yunuen Moncada',
  category: 'productivity',
  keywords: [
    'directorio de contactos',
    'gestión de contactos',
    'directorio de equipo',
    'Nexo',
  ],
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: '/',
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.socialImage,
        width: 1200,
        height: 630,
        alt: 'Nexo, gestión de contactos de equipo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = { themeColor: '#07529d', colorScheme: 'light' };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.language}>
      <body suppressHydrationWarning>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: siteConfig.name,
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              description: siteConfig.description,
              url: siteConfig.url,
              inLanguage: siteConfig.language,
            }),
          }}
        />
      </body>
    </html>
  );
}
