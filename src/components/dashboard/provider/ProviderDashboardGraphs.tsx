import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { PlanName } from '@/shared/interface/enums';
import { RootState } from '@/shared/redux/appStore';
import RadialChart from '../../chart/RadialChart';
import { graphView } from '@/shared/helper/graphView';
import AreaGroupedChart from '../../chart/AreaGroupedChart';
import BarChartVertical from '../../chart/BarChartVertical';
import LoadingFallback from '@/pages/common/LoadingFallback';
import ChartLineMultiple from '../../chart/ChatLineMultiple';
import DataFetchingError from '../../error/DataFetchingError';
import BarChartHorizontal from '../../chart/BarChartHorizontal';
import LineChartHorizontal from '../../chart/LineChartHorizontal';
import { providerFetchDashboardGraphData } from '@/shared/apis/providerProfile';
import PieChartCompletionBreakdown from '../../chart/PieChartCompletionBreakdown';
import { ProviderDashboardGraphsProps } from '@/shared/interface/componentInterface';
import { ProviderDashboardGraphResponse } from '@/shared/interface/api/providerProfile';
import { appointmentModeChartConfig, appointmentsOverTimeChartConfig, completionBreakdownChartConfig, newVsReturningUsersChartConfig, peakBookingHoursChartConfig, topBookingDaysChartConfig } from '@/shared/utils/constants';

const ProviderDashboardGraphs: React.FC<ProviderDashboardGraphsProps> = ({ dateRange }) => {

    const user = useSelector((store: RootState) => store.auth.authUser);

    const subscriptionPlan = useMemo(() => {
        if (!user) return PlanName.NO_SUBSCRIPTION;
        return user.providerSubscription ?? PlanName.NO_SUBSCRIPTION;
    }, [user]);

    const {
        data: dashboardGraphData,
        isLoading: isGraphLoading,
        isError: isGraphError,
        error: graphError,
    } = useQuery({
        queryKey: ['providerDashboardGraph', subscriptionPlan, dateRange],
        queryFn: async () => {
            const res = await providerFetchDashboardGraphData(subscriptionPlan, dateRange);
            return res.data;
        },
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: subscriptionPlan !== PlanName.NO_SUBSCRIPTION
    });

    return (
        <>
            {isGraphLoading ? (
                <div className="h-screen flex items-center justify-center">
                    <LoadingFallback />
                </div>
            ) : isGraphError ? (
                <DataFetchingError message={"Failed to load graphs" + graphError} />
            ) : dashboardGraphData ? (
                <>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <AreaGroupedChart
                            title="Appointments Over Time"
                            description="Completed, Missed, and Cancelled Appointments"
                            chartData={(dashboardGraphData as ProviderDashboardGraphResponse).appointmentsOvertimeChartData}
                            dataKeyOne="completed"
                            dataKeyTwo="missed"
                            dataKeyThree="cancelled"
                            chartConfig={appointmentsOverTimeChartConfig}
                            isLocked={!graphView(subscriptionPlan, "AppointmentsOverTime")}
                            minimumPlan={PlanName.TRIAL}
                        />
                        <RadialChart
                            title="Top Booking Days"
                            description="Distribution of bookings throughout the week"
                            chartData={(dashboardGraphData as ProviderDashboardGraphResponse).topBookingDaysChartData}
                            dataKeyOne="count"
                            dataKeyTwo="day"
                            chartConfig={topBookingDaysChartConfig}
                            isLocked={!graphView(subscriptionPlan, "TopBookingDays")}
                            minimumPlan={PlanName.STARTER}
                        />
                        <LineChartHorizontal
                            title="Appointment Mode Trend"
                            description="Online vs Offline Appointments over Time"
                            chartData={(dashboardGraphData as ProviderDashboardGraphResponse).appointmentModeChartData}
                            dataKeyOne="online"
                            dataKeyTwo="offline"
                            chartConfig={appointmentModeChartConfig}
                            isLocked={!graphView(subscriptionPlan, "AppointmentModeTrend")}
                            minimumPlan={PlanName.STARTER}
                        />
                        <ChartLineMultiple
                            title="New vs Returning Users"
                            description="User engagement trends over the last 10 days"
                            chartData={(dashboardGraphData as ProviderDashboardGraphResponse).newVsReturningUsersChartData}
                            chartConfig={newVsReturningUsersChartConfig}
                            dataKeyOne="newUsers"
                            dataKeyTwo="returningUsers"
                            isLocked={!graphView(subscriptionPlan, "NewVsReturningUsers")}
                            minimumPlan={PlanName.PROFESSIONAL}
                        />
                        <BarChartVertical
                            title="Appointment Distribution"
                            description="Online vs Offline appointments over the last 7 days"
                            chartData={(dashboardGraphData as ProviderDashboardGraphResponse).appointmentModeChartData}
                            dataKeyOne="online"
                            dataKeyTwo="offline"
                            chartConfig={appointmentModeChartConfig}
                            isLocked={!graphView(subscriptionPlan, "AppointmentDistribution")}
                            minimumPlan={PlanName.PROFESSIONAL}
                        />
                        <BarChartHorizontal
                            title="Peak Booking Hours"
                            description="Hourly booking trends for the past 10 days"
                            chartData={(dashboardGraphData as ProviderDashboardGraphResponse).peakBookingHoursChartData}
                            dataKeyOne="hour"
                            dataKeyTwo="bookings"
                            dataKeyThree="bookings"
                            chartConfig={peakBookingHoursChartConfig}
                            isLocked={!graphView(subscriptionPlan, "PeakBookingHours")}
                            minimumPlan={PlanName.ENTERPRISE}
                        />
                        <PieChartCompletionBreakdown
                            title="Appointment Completion Breakdown"
                            description="Completed, Missed, and Cancelled Appointments"
                            chartData={(dashboardGraphData as ProviderDashboardGraphResponse).completionBreakdownChartData}
                            dataKey="value"
                            chartConfig={completionBreakdownChartConfig}
                            nameKey={"status"}
                            isLocked={!graphView(subscriptionPlan, "AppointmentCompletionBreakdown")}
                            minimumPlan={PlanName.ENTERPRISE}
                        />
                    </div>
                </>
            ) : null}
        </>
    )
}

export default ProviderDashboardGraphs;