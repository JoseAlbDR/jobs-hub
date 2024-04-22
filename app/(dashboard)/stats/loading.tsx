import StatsLoadingCard from '@/components/StatsLoadingCard';

const loading = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <StatsLoadingCard />
      <StatsLoadingCard />
      <StatsLoadingCard />
    </div>
  );
};

export default loading;
