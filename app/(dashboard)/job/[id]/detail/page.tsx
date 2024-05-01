import EditJobForm from '@/components/EditJobForm';
import JobDetail from '@/components/JobDetail';
import { getSingleJobAction } from '@/utils/actions';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import React from 'react';

const JobDetailPage = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['job', params.id],
    queryFn: () => getSingleJobAction(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JobDetail jobId={params.id} />
    </HydrationBoundary>
  );
};

export default JobDetailPage;
