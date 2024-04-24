'use client';
import LightLogo from '@/assets/horizontal-black.svg';
import DarkLogo from '@/assets/horizontal-white.svg';
import links from '@/utils/links';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const [logo, setLogo] = useState(DarkLogo);
  const { theme } = useTheme();

  const pathname = usePathname();

  useEffect(() => {
    setLogo(theme === 'light' ? LightLogo : DarkLogo);
  }, [theme]);

  return (
    <aside className="py-0 ml-5 h-screen">
      <header className='py-10'><Image src={logo} alt="app logo" className="mx-auto max-h-10" priority /></header>
      <main className='flex flex-grow flex-col gap-2 items-center justify-start bg-muted rounded-lg h-2/3 px-0 py-10'> 
        {links.map((link) => {
          return (
            <Button
              asChild
              key={link.href}
              variant={pathname === link.href ? 'default' : 'link'}
              className="w-full flex justify-start h-16"
              
            >
              <Link href={link.href} className="flex justify-start gap-x-2">
                <span className=''>{link.icon}</span> <span className="capitalize text-foreground font-medium text-lg">{link.label}</span>
              </Link>
            </Button>
          );
        })}
      </main>
      <footer className='h-20'></footer>
      
     
    </aside>
  );
};

export default Sidebar;
