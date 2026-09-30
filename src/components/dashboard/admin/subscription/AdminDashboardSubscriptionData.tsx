import { CreditCard } from 'lucide-react';
import Reorderable from '../../Reorderable';
import { Role } from '@/shared/types/enums';
import DataAnalysis from '../../DataAnalyisis';
import DashboardStats from '../../DashboardStats';
import { DashboardItem } from '@/shared/types/common';
import SubscriptionsListCard from './SubscriptionsListCard';
import SubscriptionDataChart from './SubscriptionDataChart';
import { AdminDashboardSubscriptionDataProps } from '@/shared/types/component';
import { AdminFetchDashboardSubscriptionStatsDataResponse } from '@/shared/types/api/adminDashboard';
import { aiResponseEntities, queryKeys } from '@/shared/utils/constants/appConstants';
import {
  adminFetchDashboardSubscriptionStatsData,
  fetchAnalyticsInsight,
} from '@/services/apis/admin';
import { subscriptionStatsMapForAdmin } from '@/shared/utils/constants/statsConstats';

export default function AdminDashboardSubscriptionData({
  dateRange,
}: AdminDashboardSubscriptionDataProps) {
  const initialItems: DashboardItem[] = [
    {
      id: 'stats-card',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <DashboardStats<AdminFetchDashboardSubscriptionStatsDataResponse>
          queryFunction={() =>
            adminFetchDashboardSubscriptionStatsData({
              startDate: dateRange?.from,
              endDate: dateRange?.to,
            })
          }
          queryKey={[queryKeys.DASHBOARD_SUBSCRIPTION_STATS]}
          statsMap={subscriptionStatsMapForAdmin}
          dependencies={dateRange}
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
          badgeText="Subscription Insights"
          badgeIcon={CreditCard}
          title="Subscription Trends"
          fetchFn={() =>
            fetchAnalyticsInsight({ dateRange, entity: aiResponseEntities.SUBSCRIPTION })
          }
          queryKey={queryKeys.SUBSCRIPTION_USAGE_AI_RES}
        />
      ),
    },
    {
      id: 'chart-card',
      colSpan: 'col-span-12 lg:col-span-6',
      component: <SubscriptionDataChart dateRange={dateRange} />,
    },
    {
      id: 'list-card',
      colSpan: 'col-span-12 lg:col-span-6',
      component: <SubscriptionsListCard />,
    },
  ];

  return <Reorderable initialItems={initialItems} />;
}
