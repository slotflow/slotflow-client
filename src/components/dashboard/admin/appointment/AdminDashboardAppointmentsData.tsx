import { Briefcase } from 'lucide-react';
import Reorderable from '../../Reorderable';
import { Role } from '@/shared/types/enums';
import DataAnalysis from '../../DataAnalyisis';
import DashboardStats from '../../DashboardStats';
import { DashboardItem } from '@/shared/types/common';
import { useAppointmentsDataCharts } from './AppointmentsDataCharts';
import { AdminDashboardAppointmentsDataProps } from '@/shared/types/component';
import { AdminFetchDashboardAppointmentStatsDataResponse } from '@/shared/types/api/adminDashboard';
import {
  AiResponseEntities,
  AppointmentsStatsMapForAdmin,
  queryKeys,
} from '@/shared/utils/constants';
import {
  adminFetchDashboardAppointmentStatsData,
  adminfFetchAnalyticsInsight,
} from '@/services/apis/admin';

export default function AdminDashboardAppointmentsData({
  dateRange,
}: AdminDashboardAppointmentsDataProps) {
  const chartDashboardItems = useAppointmentsDataCharts({ dateRange });

  const initialItems: DashboardItem[] = [
    {
      id: 'stats-card',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <DashboardStats<AdminFetchDashboardAppointmentStatsDataResponse>
          queryFunction={() =>
            adminFetchDashboardAppointmentStatsData({
              startDate: dateRange?.from,
              endDate: dateRange?.to,
            })
          }
          queryKey={[queryKeys.DASHBOARD_APPOINTMENTS_STATS]}
          statsMap={AppointmentsStatsMapForAdmin}
          dependencies={dateRange}
          shimmerCount={5}
          role={Role.ADMIN}
        />
      ),
    },
    {
      id: 'insights-card',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <DataAnalysis
          badgeText="Appointments Insights"
          badgeIcon={Briefcase}
          title="Appointments Performance & Growth"
          fetchFn={() =>
            adminfFetchAnalyticsInsight({ dateRange, entity: AiResponseEntities.APPOINTMENTS })
          }
          queryKey={queryKeys.APPOINTMENT_AI_RES}
        />
      ),
    },
    ...chartDashboardItems,
  ];

  return <Reorderable initialItems={initialItems} />;
}
