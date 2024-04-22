import { AreaChart, Layers, AppWindow } from 'lucide-react';
import React from 'react';
import { IconFilePlus } from '@tabler/icons-react';

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: '/add-job',
    label: 'Añadir Trabajo',
    icon: <IconFilePlus stroke={2} className='stroke-primary-accent'/>,
  },
  {
    href: '/jobs',
    label: 'Trabajos',
    icon: <AppWindow className='stroke-primary-accent'/>,
  },
  {
    href: '/stats',
    label: 'Estadísticas',
    icon: <AreaChart />,
  },
];

export default links;
