import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { esES } from '@clerk/localizations';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JobsHub',
  description: 'Aplicación para gestionar tus aplicaciones a ofertas de empleo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} h-screen flex flex-col justify-center` }>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
