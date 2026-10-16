import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { PlanName } from '@/shared/types/enums';
import { useQuery } from '@tanstack/react-query';
import { RootState } from '@/app/store/appStore';
import { StatMetric } from '@/shared/types/common';
import StatsCard from '@/components/dashboard/StatsCard';
import DataFetchingError from '../error/DataFetchingError';
import { DashboardStatsProps } from '@/shared/types/component';
import DashboardStatsShimmer from '@/components/shimmers/DashboardStatsShimmer';

const DashboardStats = <T extends Record<string, StatMetric | undefined>>({
  queryFunction,
  queryKey,
  statsMap,
  shimmerCount,
  heading,
  role,
  dependencies,
}: DashboardStatsProps<T>) => {
  const user = useSelector((store: RootState) => store.auth.authUser);

  const subscriptionPlan = useMemo(() => {
    if (!user) return PlanName.NO_SUBSCRIPTION;
    return user.providerSubscription ?? PlanName.NO_SUBSCRIPTION;
  }, [user]);

  const {
    data: dashboardStats,
    isLoading: isNumericDataLoading,
    isError: isNumericDataError,
    error: numericDataError,
  } = useQuery({
    queryKey: [queryKey, dependencies],
    queryFn: queryFunction,
  });

  const dashboardStatsData = dashboardStats?.data;

  return (
    <div>
      <h4 className="text-lg font-bold">{heading}</h4>
      {isNumericDataLoading ? (
        <DashboardStatsShimmer count={shimmerCount} />
      ) : isNumericDataError && numericDataError ? (
        <DataFetchingError message={'Data fetching failed'} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
          {statsMap.length > 0
            ? statsMap.map(({ title, key, icon, price, plans }) => {
                const metric = dashboardStatsData?.[key as keyof T];

                return (
                  <StatsCard
                    key={key as string}
                    title={title}
                    value={metric?.value ?? 0}
                    trend={metric?.trend ?? '0'}
                    icon={icon}
                    price={price}
                    isShow={role === 'PROVIDER' ? plans?.includes(subscriptionPlan) : true}
                  />
                );
              })
            : null}
        </div>
      )}
    </div>
  );
};

export default DashboardStats;
