import StatsLoadingCard from '@/components/StatsLoadingCard';
import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
  return (
    <div className="p-8">
      <header className="header-custom">
        <Skeleton className="h2-custom h-[32px] w-[250px]" />
      </header>
      <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
        <StatsLoadingCard />
        <StatsLoadingCard />
        <StatsLoadingCard />
      </div>
    </div>
  );
};

export default loading;
