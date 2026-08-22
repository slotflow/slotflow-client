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
import { revenueStatsMapForProvider, statsMapForProvider } from '@/shared/utils/constants';

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
        queryKey="dashboardStats"
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
        queryKey="dashboardRevenueStats"
        dependencies={dateRange}
        statsMap={revenueStatsMapForProvider}
        shimmerCount={5}
        role={Role.PROVIDER}
      />
    </div>
  );
};

export default ProviderDashboardStats;
