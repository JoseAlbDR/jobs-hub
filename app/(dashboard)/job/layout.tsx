import { getSingleJobAction, getUniqueTechTags } from '@/utils/actions';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import React from 'react';

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['job', params.id],
    queryFn: () => getSingleJobAction(params.id),
  });

  await queryClient.prefetchQuery({
    queryKey: ['techs'],
    queryFn: () => getUniqueTechTags(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default layout;
