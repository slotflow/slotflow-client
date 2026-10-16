import { DashboardStatsShimmerProps } from '@/shared/types/shimmer';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const DashboardStatsShimmer = ({ count = 4 }: DashboardStatsShimmerProps) => {
  const ShimmerCount = Array.from({ length: count });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
      {ShimmerCount.map((_, index) => (
        <Card key={index} className="shimmer h-32">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg font-medium shimmer"></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold shimmer"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStatsShimmer;
