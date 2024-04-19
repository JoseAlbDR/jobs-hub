'use client';

import { PropsWithChildren } from 'react';
import { ThemeProvider } from '@/components/theme-provider';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
};

export default Providers;
