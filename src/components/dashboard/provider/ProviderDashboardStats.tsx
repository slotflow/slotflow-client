import {
  providerFetchDashboardStatsData,
  providerFetchDashboardRevenueStatsData,
} from '@/services/apis/providerProfile';
import {
  ProviderFetchDashboardStatsDataResponse,
  ProviderFetchDashboardRevenueStatsDataResponse,
} from '@/shared/types/api/providerProfile';
import { Role } from '@/shared/types/enums';
import DashboardStats from '../DashboardStats';
import { ProviderDashboardStatsProps } from '@/shared/types/component';
import {
  queryKeys,
  revenueStatsMapForProvider,
  statsMapForProvider,
} from '@/shared/utils/constants';

const ProviderDashboardStats = ({ dateRange }: ProviderDashboardStatsProps) => {
  return (
    <div className="flex flex-col gap-6">
      <DashboardStats<ProviderFetchDashboardStatsDataResponse>
        queryFunction={() =>
          providerFetchDashboardStatsData({
            startDate: dateRange.from,
            endDate: dateRange.to,
          })
        }
        queryKey={[queryKeys.DASHBOARD_STATS]}
        dependencies={dateRange}
        statsMap={statsMapForProvider}
        shimmerCount={6}
        role={Role.PROVIDER}
      />
      <DashboardStats<ProviderFetchDashboardRevenueStatsDataResponse>
        queryFunction={() =>
          providerFetchDashboardRevenueStatsData({
            startDate: dateRange.from,
            endDate: dateRange.to,
          })
        }
        queryKey={[queryKeys.DASHBOARD_REVENUE_STATS]}
        dependencies={dateRange}
        statsMap={revenueStatsMapForProvider}
        shimmerCount={5}
        role={Role.PROVIDER}
      />
    </div>
  );
};

export default ProviderDashboardStats;
