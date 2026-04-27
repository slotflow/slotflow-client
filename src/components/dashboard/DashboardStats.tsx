import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { RootState } from '@/shared/redux/appStore';
import { PlanName } from '@/shared/interface/enums';
import StatsCard from '@/components/dashboard/StatsCard';
import DataFetchingError from '../error/DataFetchingError';
import { DashboardStatsProps } from '@/shared/interface/componentInterface';
import DashboardStatsShimmer from '@/components/shimmers/DashboardStatsShimmer';

const DashboardStats = <T extends Record<string, number>>({
    queryFunction,
    queryKey,
    statsMap,
    shimmerCount,
    heading,
    role,
    dependencies
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
        error: numericDataError
    } = useQuery({
        queryKey: [queryKey, dependencies],
        queryFn: queryFunction,
        staleTime: 1 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const dashboardStatsData = dashboardStats?.data;

    return (
        <div>
            <h4 className='text-lg font-bold'>{heading}</h4>
            {isNumericDataLoading ? (
                <DashboardStatsShimmer count={shimmerCount} />
            ) : (isNumericDataError && numericDataError) ? (
                <DataFetchingError message={"Data fetching failed"} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {statsMap.length > 0 ? (
                        statsMap.map(({ title, key, icon, price, plans }) => (
                            <StatsCard
                                key={key as string}
                                title={title}
                                value={dashboardStatsData?.[key] ?? 0}
                                icon={icon}
                                price={price}
                                isShow={role === "PROVIDER" ? plans?.includes(subscriptionPlan) : true}
                            />
                        ))
                    ) : null}
                </div>
            )}
        </div>
    )
}

export default DashboardStats;