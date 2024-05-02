import EditJobForm from '@/components/EditJobForm';
import React from 'react';

const JobEditPage = ({ params }: { params: { id: string } }) => {
  return <EditJobForm jobId={params.id} />;
};

export default JobEditPage;
