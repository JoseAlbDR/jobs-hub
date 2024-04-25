'use client';
import { getAllJobsAction } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import JobCard from './JobCard';
import ComplexButtonContainer from './ComplexButtonContainer';
import { getParamsFromUrl } from '@/utils/getParamsFromUrl';
import JobLoadingCard from './JobLoadingCard';
import { Skeleton } from './ui/skeleton';
import { h2ClassName, headerClassName } from '@/utils/tagStylesConfig';

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
        <div className="flex items-center justify-between">
          <Skeleton className="text-xl font-semibold capitalize mt-4 h-[25px] w-[250px]" />
          <Skeleton className="mt-4 h-[36px] w-[450px]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
          <JobLoadingCard />
          <JobLoadingCard />
          <JobLoadingCard />
          <JobLoadingCard />
        </div>
      </>
    );

  if (jobs.length < 1)
    return <h2 className='h2-custom'>No se han encontrado trabajos</h2>;

  return (
    <>
      
        <header className={`header-custom flex items-baseline justify-between mx-5`}>
           <h2 className='h2-custom'>
          {count} trabajos encontrados
        </h2>
        {totalPages < 2 ? null : (
          <ComplexButtonContainer currentPage={page} totalPages={totalPages} />
        )}
        </header>
       
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 my-5 mx-5">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
};

export default JobsList;
