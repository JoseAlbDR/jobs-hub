'use client';
import { getAllJobsAction } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { JobMode, JobStatus, JobType } from '../utils/types';
import JobCard from './JobCard';
import ButtonContainer from './ButtonContainer';
import { getParamsFromUrl } from '@/utils/getParamsFromUrl';
import JobLoadingCard from './JobLoadingCard';
import { Skeleton } from './ui/skeleton';

const JobsList = () => {
  const searchParams = useSearchParams();

  const { search, status, mode, type, currPage } =
    getParamsFromUrl(searchParams);

  const { data, isPending } = useQuery({
    queryKey: ['jobs', search, status, mode, type, currPage],
    queryFn: () =>
      getAllJobsAction({ search, status, mode, type, page: currPage }),
  });

  const jobs = data?.jobs || [];

  const count = data?.count || 0;
  const page = data?.page || 0;
  const totalPages = data?.totalPages || 0;

  if (isPending)
    return (
      <>
        <Skeleton className="text-xl font-semibold capitalize mt-4 h-[25px] w-[250px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-8">
          <JobLoadingCard />
          <JobLoadingCard />
          <JobLoadingCard />
          <JobLoadingCard />
        </div>
      </>
    );

  if (jobs.length < 1)
    return <h2 className="text-xl mt-8">No se han encontrado trabajos</h2>;

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold capitalize mt-4">
          {count} trabajos encontrados
        </h2>
        {totalPages < 2 ? null : (
          <ButtonContainer currentPage={page} totalPages={totalPages} />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-8">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
};

export default JobsList;
