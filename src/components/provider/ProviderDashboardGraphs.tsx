import { format } from 'date-fns';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { useSelector } from 'react-redux';
import { DateRange } from 'react-day-picker';
import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PlanName } from '@/utils/interface/enums';
import { RootState } from '@/utils/redux/appStore';
import RadialChart from '../common/chart/RadialChart';
import { CalendarIcon, GitGraph } from 'lucide-react';
import DataFetchingError from '../common/DataFetchingError';
import LoadingFallback from '@/pages/common/LoadingFallback';
import BarChartVertical from '../common/chart/BarChartVertical';
import AreaGroupedChart from '../common/chart/AreaGroupedChart';
import ChartLineMultiple from '../common/chart/ChatLineMultiple';
import BarChartHorizontal from '../common/chart/BarChartHorizontal';
import LineChartHorizontal from '../common/chart/LineChartHorizontal';
import { providerFetchDashboardGraphData } from '@/utils/apis/provider.api';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import PieChartCompletionBreakdown from '../common/chart/PieChartCompletionBreakdown';
import { ProviderDashboardGraphResponse } from '@/utils/interface/api/provider';
import { appointmentModeChartConfig, appointmentsOverTimeChartConfig, completionBreakdownChartConfig, newVsReturningUsersChartConfig, peakBookingHoursChartConfig, topBookingDaysChartConfig } from '@/utils/constants';
import { graphView } from '@/utils/helper/GraphView';

const ProviderDashboardGraphs: React.FC = () => {

    const user = useSelector((store: RootState) => store.auth.authUser);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

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
        queryFn: () => providerFetchDashboardGraphData(subscriptionPlan, dateRange),
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: subscriptionPlan !== PlanName.NO_SUBSCRIPTION
    });

    return (
        <div className="mt-4">
            {isGraphLoading ? (
                <div className="h-screen flex items-center justify-center">
                    <LoadingFallback />
                </div>
            ) : isGraphError ? (
                <DataFetchingError message={"Failed to load graphs" + graphError} />
            ) : dashboardGraphData ? (
                <React.Fragment>
                    <div className='border rounded-md my-2 p-2'>
                        <div className='flex justify-between items-center'>
                            <div className='flex space-x-2'>
                                <GitGraph />
                                <h2 className="text-xl font-bold"> Detailed Graph With Aggregated Data</h2>
                            </div>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button title="Select Date" variant="default" className="w-full md:w-auto justify-start text-left font-normal cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateRange?.from && dateRange?.to ? (
                                            <>
                                                {format(dateRange.from, "MMM dd, yyyy")} - {format(dateRange.to, "MMM dd, yyyy")}
                                            </>
                                        ) : (
                                            <span>Select Date Range</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="range"
                                        selected={dateRange}
                                        onSelect={setDateRange}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>

                        </div>
                    </div>
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
                        />
                        <RadialChart
                            title="Top Booking Days"
                            description="Distribution of bookings throughout the week"
                            chartData={(dashboardGraphData as ProviderDashboardGraphResponse).topBookingDaysChartData}
                            dataKeyOne="count"
                            dataKeyTwo="day"
                            chartConfig={topBookingDaysChartConfig}
                            isLocked={!graphView(subscriptionPlan, "TopBookingDays")}
                        />
                        <LineChartHorizontal
                            title="Appointment Mode Trend"
                            description="Online vs Offline Appointments over Time"
                            chartData={(dashboardGraphData as ProviderDashboardGraphResponse).appointmentModeChartData}
                            dataKeyOne="online"
                            dataKeyTwo="offline"
                            chartConfig={appointmentModeChartConfig}
                            isLocked={!graphView(subscriptionPlan, "AppointmentModeTrend")}
                        />
                        <ChartLineMultiple
                            title="New vs Returning Users"
                            description="User engagement trends over the last 10 days"
                            chartData={(dashboardGraphData as ProviderDashboardGraphResponse).newVsReturningUsersChartData}
                            chartConfig={newVsReturningUsersChartConfig}
                            dataKeyOne="newUsers"
                            dataKeyTwo="returningUsers"
                            isLocked={!graphView(subscriptionPlan, "NewVsReturningUsers")}
                        />
                        <BarChartVertical
                            title="Appointment Distribution"
                            description="Online vs Offline appointments over the last 7 days"
                            chartData={(dashboardGraphData as ProviderDashboardGraphResponse).appointmentModeChartData}
                            dataKeyOne="online"
                            dataKeyTwo="offline"
                            chartConfig={appointmentModeChartConfig}
                            isLocked={!graphView(subscriptionPlan, "AppointmentDistribution")}
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
                        />
                        <PieChartCompletionBreakdown
                            title="Appointment Completion Breakdown"
                            description="Completed, Missed, and Cancelled Appointments"
                            chartData={(dashboardGraphData as ProviderDashboardGraphResponse).completionBreakdownChartData}
                            dataKey="value"
                            chartConfig={completionBreakdownChartConfig}
                            nameKey={"status"}
                            isLocked={!graphView(subscriptionPlan, "AppointmentCompletionBreakdown")}
                        />
                    </div>
                </React.Fragment>
            ) : null}
        </div>
    )
}

export default ProviderDashboardGraphs;