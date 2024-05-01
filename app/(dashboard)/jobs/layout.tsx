import SearchForm from '@/components/SearchForm';
import { getAllJobsAction, getUniqueTechTags } from '@/utils/actions';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react';

const layout = async ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['jobs', '', 'todos', 'todos', 'todos', 'todos', ['todas'], 1],
    queryFn: () => getAllJobsAction({}),
  });

  await queryClient.prefetchQuery({
    queryKey: ['techs'],
    queryFn: () => getUniqueTechTags(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchForm />
      {children}
    </HydrationBoundary>
  );
};

export default layout;
