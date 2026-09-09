import { DollarSign } from 'lucide-react';
import Reorderable from '../../Reorderable';
import { Role } from '@/shared/types/enums';
import DataAnalysis from '../../DataAnalyisis';
import RevenueListCard from './RevenueListCard';
import DashboardStats from '../../DashboardStats';
import { DashboardItem } from '@/shared/types/common';
import { RevenueDataChart } from './RevenueDataChart';
import { AdminDashboardRevenueDataProps } from '@/shared/types/component';
import {
  adminFetchDashboardRevenueStatsData,
  adminfFetchAnalyticsInsight,
} from '@/services/apis/admin';
import { AdminFetchDashboardRevenueAndPaymentsStatsDataResponse } from '@/shared/types/api/adminDashboard';
import {
  AiResponseEntities,
  queryKeys,
  revenueAndPaymentsStatsMapForAdmin,
} from '@/shared/utils/constants';

export default function AdminDashboardRevenueData({ dateRange }: AdminDashboardRevenueDataProps) {
  const initialItems: DashboardItem[] = [
    {
      id: 'stats-card',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <DashboardStats<AdminFetchDashboardRevenueAndPaymentsStatsDataResponse>
          queryFunction={() =>
            adminFetchDashboardRevenueStatsData({
              startDate: dateRange?.from,
              endDate: dateRange?.to,
            })
          }
          queryKey={[queryKeys.DASHBOARD_REVENUE_STATS]}
          dependencies={dateRange}
          statsMap={revenueAndPaymentsStatsMapForAdmin}
          shimmerCount={6}
          role={Role.ADMIN}
        />
      ),
    },
    {
      id: 'insights-card',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <DataAnalysis
          badgeText="Revenue Insights"
          badgeIcon={DollarSign}
          title="Revenue Analysis"
          fetchFn={() =>
            adminfFetchAnalyticsInsight({ dateRange, entity: AiResponseEntities.REVENUE })
          }
          queryKey={queryKeys.REVENUE_STATS_AI_RES}
        />
      ),
    },
    {
      id: 'chart-card',
      colSpan: 'col-span-12 lg:col-span-6',
      component: <RevenueDataChart dateRange={dateRange} />,
    },
    {
      id: 'list-card',
      colSpan: 'col-span-12 lg:col-span-6',
      component: <RevenueListCard />,
    },
  ];

  return <Reorderable initialItems={initialItems} />;
}
