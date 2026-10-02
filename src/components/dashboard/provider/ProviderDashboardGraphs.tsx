import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { PlanName } from '@/shared/types/enums';
import { RootState } from '@/app/store/appStore';
import { useQuery } from '@tanstack/react-query';
import { DashboardItem } from '@/shared/types/common';
import RadialChart from '@/components/chart/RadialChart';
import { graphView } from '@/shared/utils/helper/graphView';
import PieChartRounded from '@/components/chart/PieChartRounded';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import BarChartVertical from '@/components/chart/BarChartVertical';
import AreaGroupedChart from '@/components/chart/AreaGroupedChart';
import ChartLineMultiple from '@/components/chart/ChatLineMultiple';
import BarChartHorizontal from '@/components/chart/BarChartHorizontal';
import { ProviderDashboardGraphsProps } from '@/shared/types/component';
import LineChartHorizontal from '@/components/chart/LineChartHorizontal';
import { providerFetchDashboardGraphData } from '@/services/apis/providerProfile';
import { usersRetensionChartConfig, appointmentModeChartConfig, appointmentsOvertimeChartConfig, completionChartConfig, peakBookingHoursChartConfig, topBookingDaysChartConfig } from '@/shared/utils/constants/chartConstants';

export const useProviderDashboardCharts = ({
  dateRange,
}: ProviderDashboardGraphsProps): DashboardItem[] => {

  const user = useSelector((store: RootState) => store.auth.authUser);

  const subscriptionPlan = useMemo(() => {
    if (!user) return PlanName.NO_SUBSCRIPTION;
    return user.providerSubscription ?? PlanName.NO_SUBSCRIPTION;
  }, [user]);

  const {
    data: dashboardGraphData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [queryKeys.DASHBOARD_GRAPH, subscriptionPlan, dateRange],
    queryFn: async () => {
      const res = await providerFetchDashboardGraphData({
        subscription: subscriptionPlan,
        ...dateRange,
      });
      return res.data;
    },
    enabled: subscriptionPlan !== PlanName.NO_SUBSCRIPTION,
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
      id: 'appointments-over-time',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <AreaGroupedChart
          title="Appointments Over Time"
          description="Completed, Missed, and Cancelled Appointments"
          chartData={graphData.appointmentsOvertimeChartData}
          dataKeyOne="completed"
          dataKeyTwo="missed"
          dataKeyThree="cancelled"
          chartConfig={appointmentsOvertimeChartConfig}
          isLocked={!graphView(subscriptionPlan, 'AppointmentsOverTime')}
          minimumPlan={PlanName.TRIAL}
          isLoading={isLoading}
          isError={isError}
        />
      ),
    },
    {
      id: 'top-booking-days',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <RadialChart
          title="Top Booking Days"
          description="Distribution of bookings throughout the week"
          chartData={graphData.topBookingDaysChartData}
          dataKeyOne="count"
          dataKeyTwo="day"
          chartConfig={topBookingDaysChartConfig}
          isLocked={!graphView(subscriptionPlan, 'TopBookingDays')}
          minimumPlan={PlanName.STARTER}
          isLoading={isLoading}
          isError={isError}
        />
      ),
    },
    {
      id: 'appointment-mode-trend',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <LineChartHorizontal
          title="Appointment Mode Trend"
          description="Online vs Offline Appointments over Time"
          chartData={graphData.appointmentModeChartData}
          dataKeyOne="online"
          dataKeyTwo="offline"
          chartConfig={appointmentModeChartConfig}
          isLocked={!graphView(subscriptionPlan, 'AppointmentModeTrend')}
          minimumPlan={PlanName.STARTER}
          isLoading={isLoading}
          isError={isError}
        />
      ),
    },
    {
      id: 'new-vs-returning-users',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <ChartLineMultiple
          title="New vs Returning Users"
          description="User engagement trends over the last 10 days"
          chartData={graphData.newVsReturningUsersChartData}
          chartConfig={usersRetensionChartConfig}
          dataKeyOne="newUsers"
          dataKeyTwo="returningUsers"
          isLocked={!graphView(subscriptionPlan, 'NewVsReturningUsers')}
          minimumPlan={PlanName.PROFESSIONAL}
          isLoading={isLoading}
          isError={isError}
        />
      ),
    },
    {
      id: 'appointment-distribution',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <BarChartVertical
          title="Appointment Distribution"
          description="Online vs Offline appointments over the last 7 days"
          chartData={graphData.appointmentModeChartData}
          dataKeyOne="online"
          dataKeyTwo="offline"
          chartConfig={appointmentModeChartConfig}
          isLocked={!graphView(subscriptionPlan, 'AppointmentDistribution')}
          minimumPlan={PlanName.PROFESSIONAL}
          isLoading={isLoading}
          isError={isError}
        />
      ),
    },
    {
      id: 'peak-booking-hours',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <BarChartHorizontal
          title="Peak Booking Hours"
          description="Hourly booking trends for the past 10 days"
          chartData={graphData.peakBookingHoursChartData}
          dataKeyOne="hour"
          dataKeyTwo="bookings"
          dataKeyThree="bookings"
          chartConfig={peakBookingHoursChartConfig}
          isLocked={!graphView(subscriptionPlan, 'PeakBookingHours')}
          minimumPlan={PlanName.ENTERPRISE}
          isLoading={isLoading}
          isError={isError}
        />
      ),
    },
    {
      id: 'appointment-completion-breakdown',
      colSpan: 'col-span-12 lg:col-span-6',
      component: (
        <PieChartRounded
          title="Appointment Completion Breakdown"
          description="Completed, Missed, and Cancelled Appointments"
          chartData={graphData.completionBreakdownChartData}
          dataKey="value"
          chartConfig={completionChartConfig}
          nameKey="status"
          isLocked={!graphView(subscriptionPlan, 'AppointmentCompletionBreakdown')}
          minimumPlan={PlanName.ENTERPRISE}
          isLoading={isLoading}
          isError={isError}
        />
      ),
    },
  ];
};