import JobLoadingCard from '@/components/JobLoadingCard';
import { Skeleton } from '@/components/ui/skeleton';

function loading() {
  return (
    <>
      <div className="flex items-center justify-between mt-4">
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
}
export default loading;
