'use client';
import { getStatsAction } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';

import React from 'react';
import StatsCard from './StatsCard';

const StatsContainer = () => {
  const { data } = useQuery({
    queryKey: ['stats'],
    queryFn: () => getStatsAction(),
  });

  return (
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
  );
};

export default StatsContainer;
