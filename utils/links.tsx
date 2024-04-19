import { AreaChart, Layers, AppWindow } from 'lucide-react';
import React from 'react';

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: '/add-job',
    label: 'Añadir Puesto',
    icon: <Layers />,
  },
  {
    href: '/jobs',
    label: 'Añadir Puesto',
    icon: <AppWindow />,
  },
  {
    href: '/stats',
    label: 'Estadísticas',
    icon: <AreaChart />,
  },
];
