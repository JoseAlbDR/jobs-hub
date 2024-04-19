'use client';
import Logo from '@/assets/horizontal-black.svg';
import links from '@/utils/links';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import Link from 'next/link';

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="py-4 px-8 bg-muted h-full">
      <Image src={Logo} alt="app logo" className="mx-auto -mt-16" width={200} />
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
