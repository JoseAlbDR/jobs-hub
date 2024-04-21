import ChartsContainer from '@/components/ChartsContainer';
import StatsContainer from '@/components/StatsContainer';
import { getChartsDataAction, getStatsAction } from '@/utils/actions';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import React from 'react';

const StatsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stats'],
    queryFn: () => getStatsAction(),
  });

  await queryClient.prefetchQuery({
    queryKey: ['charts'],
    queryFn: () => getChartsDataAction(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsContainer />
      <ChartsContainer />
    </HydrationBoundary>
  );
};

export default StatsPage;
