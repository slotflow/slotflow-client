import {
  completionChartConfig,
  topBookingDaysChartConfig,
  usersChartConfig,
  peakBookingHoursChartConfig,
  appointmentsOvertimeChartConfig,
  usersRetensionChartConfig,
} from '@/shared/utils/constants/chartConstants';
import { useQuery } from '@tanstack/react-query';
import { DashboardItem } from '@/shared/types/common';
import RadialChart from '@/components/chart/RadialChart';
import BarChartStacked from '@/components/chart/BarChartStacked';
import PieChartRounded from '@/components/chart/PieChartRounded';
import BarChartVertical from '@/components/chart/BarChartVertical';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import BarChartHorizontal from '@/components/chart/BarChartHorizontal';
import LineChartHorizontal from '@/components/chart/LineChartHorizontal';
import { UseAppointmentsDataChartsProps } from '@/shared/types/component';
import { adminFetchDashboardBookingChartData } from '@/services/apis/admin';

export const useAppointmentsDataCharts = ({
  dateRange,
}: UseAppointmentsDataChartsProps): DashboardItem[] => {
  const {
    data: dashboardGraphData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [queryKeys.DASHBOARD_APPOINTMENTS_CHART, dateRange],
    queryFn: async () => {
      const res = await adminFetchDashboardBookingChartData(dateRange);
      return res.data;
    },
    enabled: Boolean(dateRange.endDate && dateRange.startDate),
  });

  const graphData = dashboardGraphData ?? {
    appointmentsOvertimeChartData: [],
    topBookingDaysChartData: [],
    appointmentModeChartData: [],
    newVsReturningUsersChartData: [],
    peakBookingHoursChartData: [],
    completionBreakdownChartData: [],
  };

  return [
    {
      id: 'chart-1',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <BarChartStacked
          title="Appointments Overtime Data"
          description="Appointments status detailed chart"
          chartData={graphData.appointmentsOvertimeChartData}
          dataKeyOne="completed"
          dataKeyTwo="missed"
          dataKeyThree="cancelled"
          chartConfig={appointmentsOvertimeChartConfig}
          isLoading={isLoading}
          isError={isError}
        />
      ),
    },
    {
      id: 'chart-2',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <BarChartVertical
          title="Peak Booking Hours"
          description="Booking distribution by time slots"
          chartData={graphData.peakBookingHoursChartData}
          dataKeyOne="hours"
          dataKeyTwo="bookings"
          chartConfig={peakBookingHoursChartConfig}
          isLoading={isLoading}
          isError={isError}
        />
      ),
    },
    {
      id: 'chart-3',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <LineChartHorizontal
          title="Appointment Modes"
          description="Comparison between online and offline bookings"
          chartData={graphData.appointmentModeChartData}
          dataKeyOne="offline"
          dataKeyTwo="online"
          chartConfig={usersChartConfig}
          isLoading={isLoading}
          isError={isError}
        />
      ),
    },
    {
      id: 'chart-4',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <PieChartRounded
          title="Completion Status Breakdown"
          description="Distribution of appointment statuses"
          chartData={graphData.completionBreakdownChartData}
          dataKey="value"
          nameKey="status"
          chartConfig={completionChartConfig}
          isLoading={isLoading}
          isError={isError}
        />
      ),
    },
    {
      id: 'chart-5',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <BarChartHorizontal
          title="New vs Returning Users"
          description="Compare new user acquisition against returning user density"
          chartData={graphData.newVsReturningUsersChartData}
          dataKeyOne="date"
          dataKeyTwo="newUsers"
          dataKeyThree="returningUsers"
          chartConfig={usersRetensionChartConfig}
          isLoading={isLoading}
          isError={isError}
        />
      ),
    },
    {
      id: 'chart-6',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <RadialChart
          title="Top Booking Days"
          description="Distribution of bookings throughout the week"
          chartData={graphData.topBookingDaysChartData}
          dataKeyOne="count"
          dataKeyTwo="day"
          chartConfig={topBookingDaysChartConfig}
          isLoading={isLoading}
          isError={isError}
        />
      ),
    },
  ];
};
