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
    <aside className="py-4 px-8 bg-muted h-full">
      <Image src={logo} alt="app logo" className="mx-auto -mt-16" priority />
      <div className="flex flex-col mt-20 gap-y-4 items-center content-center">
        {links.map((link) => {
          return (
            <Button
              asChild
              key={link.href}
              variant={pathname === link.href ? 'default' : 'link'}
              className="w-48"
            >
              <Link href={link.href} className="flex items-center gap-x-2">
                {link.icon} <span className="capitalize">{link.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
