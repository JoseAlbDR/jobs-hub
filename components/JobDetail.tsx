'use client';
import { getSingleJobAction } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const JobDetail = ({ jobId }: { jobId: string }) => {
  const { data } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

  console.log({ data });

  return <div>JobDetail</div>;
};

export default JobDetail;
