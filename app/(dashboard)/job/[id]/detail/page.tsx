import JobDetail from '@/components/JobDetail';
import React from 'react';

const JobDetailPage = ({ params }: { params: { id: string } }) => {
  return <JobDetail jobId={params.id} />;
};

export default JobDetailPage;
