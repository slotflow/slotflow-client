import { Briefcase } from 'lucide-react';
import Reorderable from '../../Reorderable';
import { Role } from '@/shared/types/enums';
import DataAnalysis from '../../DataAnalyisis';
import ProviderListCard from './ProviderListCard';
import DashboardStats from '../../DashboardStats';
import ProviderDataChart from './ProviderDataChart';
import { DashboardItem } from '@/shared/types/common';
import { formatDate } from '@/shared/utils/helper/formatDate';
import { AdminDashboardProviderDataProps } from '@/shared/types/component';
import { providerStatsMapForAdmin } from '@/shared/utils/constants/statsConstats';
import { AdminFetchDashboardProviderStatsDataResponse } from '@/shared/types/api/adminDashboard';
import { aiResponseEntities, dateFormats, queryKeys } from '@/shared/utils/constants/appConstants';
import { fetchAnalyticsInsight, adminFetchDashboardProviderStatsData } from '@/services/apis/admin';

export default function AdminDashboardProviderData({ dateRange }: AdminDashboardProviderDataProps) {

  const initialItems: DashboardItem[] = [
    {
      id: 'stats-card',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <DashboardStats<AdminFetchDashboardProviderStatsDataResponse>
          queryFunction={() =>
            adminFetchDashboardProviderStatsData(dateRange)
          }
          queryKey={[queryKeys.DASHBOARD_PROVIDERS_STATS]}
          statsMap={providerStatsMapForAdmin}
          dependencies={dateRange}
          shimmerCount={4}
          heading=""
          role={Role.ADMIN}
        />
      ),
    },
    {
      id: 'insights-card',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <DataAnalysis
          badgeText="Provider Insights"
          badgeIcon={Briefcase}
          title="Provider Performance & Growth"
          fetchFn={() =>
            fetchAnalyticsInsight({
              ...dateRange,
              entity: aiResponseEntities.PROVIDER
            })
          }
          queryKey={queryKeys.PROVIDER_ENGAGEMENT_AI_RES}
        />
      ),
    },
    {
      id: 'chart-card',
      colSpan: 'col-span-12 lg:col-span-6',
      component: <ProviderDataChart dateRange={dateRange} />,
    },
    {
      id: 'list-card',
      colSpan: 'col-span-12 lg:col-span-6',
      component: <ProviderListCard />,
    },
  ];

  return <Reorderable initialItems={initialItems} />;
}
