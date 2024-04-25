'use client';
import { getStatsAction } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';

import React from 'react';
import StatsCard from './StatsCard';
import { h2ClassName, headerClassName } from '@/utils/tagStylesConfig';

const StatsContainer = () => {
  const { data } = useQuery({
    queryKey: ['stats'],
    queryFn: () => getStatsAction(),
  });

  return (
    <div className='p-8'>

     <header className='header-custom'>
            <h2 className='h2-custom'>Estadísticas</h2>
         </header>
         <section className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <StatsCard
        title="pendiente"
        value={data?.pendiente || 0}
        color="bg-primary"
      />
      <StatsCard
        title="entrevista"
        value={data?.entrevista || 0}
        color="bg-green-700"
      />
      <StatsCard
        title="rechazado"
        value={data?.rechazado || 0}
        color="bg-destructive"
      />
    </section>
    </div>
    
  );
};

export default StatsContainer;
