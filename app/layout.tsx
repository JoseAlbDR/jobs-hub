import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { esES } from '@clerk/localizations';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'JobsHub',
  description: 'Aplicación para gestionar tus aplicaciones a ofertas de empleo',
  keywords: [
    'JobsHub',
    'empleo',
    'aplicaciones',
    'gestión de empleo',
    'Next.js',
    'Prisma',
    'PostgreSQL',
    'React.js',
    'Tailwind CSS',
    'TypeScript',
  ],
  author: 'Jose Alberto Delgado, Juan Manuel Acosta',
  robots: 'index, follow',
  ogTitle:
    'JobsHub - Aplicación para gestionar tus aplicaciones a ofertas de empleo',
  ogDescription:
    'JobsHub es una aplicación para gestionar tus búsquedas de empleo de manera eficiente. Registra tus aplicaciones, haz seguimiento de su estado y obtén estadísticas útiles sobre tu progreso.',
  ogType: 'website',
  ogUrl: 'https://jobshub.jjteams.dev',
  twitterTitle:
    'JobsHub - Aplicación para gestionar tus aplicaciones a ofertas de empleo',
  twitterDescription:
    'JobsHub es una aplicación para gestionar tus búsquedas de empleo de manera eficiente. Registra tus aplicaciones, haz seguimiento de su estado y obtén estadísticas útiles sobre tu progreso.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} `}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
