import JobLoadingCard from '@/components/JobLoadingCard';
import { Skeleton } from '@/components/ui/skeleton';

function loading() {
  return (
    <>
      <div className="p-8 grid sm:grid-cols-2 md:grid-cols-3  gap-4 rounded-lg border">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-8">
        <JobLoadingCard />
        <JobLoadingCard />
        <JobLoadingCard />
        <JobLoadingCard />
      </div>
    </>
  );
}
export default loading;
