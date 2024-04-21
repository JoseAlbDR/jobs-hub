'use client';
import { getAllJobsAction } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { JobMode, JobStatus, JobType } from '../utils/types';
import JobCard from './JobCard';

const JobsList = () => {
  const searchParams = useSearchParams();

  const params = Object.fromEntries(searchParams);
  const search = params.search || '';
  const status = (params.status || 'todos') as JobStatus;
  const mode = (params.mode || 'todos') as JobMode;
  const type = (params.type || 'todos') as JobType;
  const page = +params.page || 1;

  const { data, isPending } = useQuery({
    queryKey: ['jobs', search, status, mode, type, page || 1],
    queryFn: () => getAllJobsAction({ search, status, mode, type, page }),
  });

  const jobs = data?.jobs || [];

  if (isPending) return <h2 className="text-xl">Cargando...</h2>;

  if (jobs.length < 1)
    return <h2 className="text-xl">No se han encontrado trabajos</h2>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-8">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
};

export default JobsList;
