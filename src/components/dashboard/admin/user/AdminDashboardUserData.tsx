import {
  fetchAnalyticsInsight,
  adminFetchDashboardUserStatsData,
} from '@/services/apis/admin';
import { Users } from 'lucide-react';
import UserListCard from './UserListCard';
import Reorderable from '../../Reorderable';
import UserDataChart from './UserDataChart';
import { Role } from '@/shared/types/enums';
import DataAnalysis from '../../DataAnalyisis';
import DashboardStats from '../../DashboardStats';
import { DashboardItem } from '@/shared/types/common';
import { AdminDashboardUserDataProps } from '@/shared/types/component';
import { userStatsMapForAdmin } from '@/shared/utils/constants/statsConstats';
import { aiResponseEntities, queryKeys } from '@/shared/utils/constants/appConstants';
import { AdminFetchDashboardUserStatsDataResponse } from '@/shared/types/api/adminDashboard';

export default function AdminDashboardUserData({ dateRange }: AdminDashboardUserDataProps) {

  const initialItems: DashboardItem[] = [
    {
      id: 'stats-card',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <DashboardStats<AdminFetchDashboardUserStatsDataResponse>
          queryFunction={() =>
            adminFetchDashboardUserStatsData(dateRange)
          }
          queryKey={[queryKeys.DASHBOARD_USERS_STATS, dateRange?.toString()]}
          statsMap={userStatsMapForAdmin}
          dependencies={dateRange}
          shimmerCount={4}
          role={Role.ADMIN}
        />
      ),
    },
    {
      id: 'insights-card',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <DataAnalysis
          badgeText="User Insights"
          badgeIcon={Users}
          title="User Engagement & Retention"
          fetchFn={() =>
            fetchAnalyticsInsight({
              ...dateRange,
              entity: aiResponseEntities.USER
            })
          }
          queryKey={queryKeys.USER_ENGAGEMENT_AI_RES}
        />
      ),
    },
    {
      id: 'chart-card',
      colSpan: 'col-span-12 lg:col-span-6',
      component: <UserDataChart dateRange={dateRange} />,
    },
    {
      id: 'users-card',
      colSpan: 'col-span-12 lg:col-span-6',
      component: <UserListCard />,
    },
  ];

  return <Reorderable initialItems={initialItems} />;
}
