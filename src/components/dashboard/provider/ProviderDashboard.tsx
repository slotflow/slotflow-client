import { useMemo, useState } from 'react';
import { BookIcon } from "lucide-react";
import Reorderable from '../Reorderable';
import { Role } from "@/shared/types/enums";
import DataAnalysis from "../DataAnalyisis";
import { DateRange } from 'react-day-picker';
import DashboardStats from "../DashboardStats";
import DateFilter from '@/components/filters/DateFilter';
import { formatDate } from '@/shared/utils/helper/formatDate';
import { fetchAnalyticsInsight } from "@/services/apis/admin";
import { useProviderDashboardCharts } from "./ProviderDashboardGraphs";
import { DashboardItem, DateRangeStrings } from "@/shared/types/common";
import { aiResponseEntities, dateFormats, queryKeys } from "@/shared/utils/constants/appConstants";
import { revenueStatsMapForProvider, statsMapForProvider } from '@/shared/utils/constants/statsConstats';
import { providerFetchDashboardRevenueStatsData, providerFetchDashboardStatsData } from "@/services/apis/providerProfile";
import { ProviderFetchDashboardBookingStatsDataResponse, ProviderFetchDashboardRevenueStatsDataResponse } from "@/shared/types/api/providerProfile";

const ProviderDashboard = () => {

    const [dateRange, setDateRange] = useState<DateRange>(() => {
        const today = new Date();
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(today.getMonth() - 1);

        return {
            from: oneMonthAgo,
            to: today,
        };
    });

    const formateddateRange: DateRangeStrings = useMemo(() => ({
        startDate: formatDate(dateRange?.from, dateFormats.ISO_DATE),
        endDate: formatDate(dateRange?.to, dateFormats.ISO_DATE)
    }), [dateRange?.from, dateRange?.to]);

    const charts = useProviderDashboardCharts({ dateRange: formateddateRange });

    const initialItems: DashboardItem[] = [
        {
            id: 'stats-card-1',
            colSpan: 'col-span-12 lg:col-span-6',
            component: (
                <DashboardStats<ProviderFetchDashboardBookingStatsDataResponse>
                    queryFunction={() =>
                        providerFetchDashboardStatsData(formateddateRange)
                    }
                    queryKey={[queryKeys.DASHBOARD_APPOINTMENTS_STATS]}
                    dependencies={dateRange}
                    statsMap={statsMapForProvider}
                    shimmerCount={6}
                    role={Role.PROVIDER}
                />
            ),
        },
        {
            id: 'stats-card-2',
            colSpan: 'col-span-12 lg:col-span-6',
            component: <DashboardStats<ProviderFetchDashboardRevenueStatsDataResponse>
                queryFunction={() =>
                    providerFetchDashboardRevenueStatsData(formateddateRange)
                }
                queryKey={[queryKeys.DASHBOARD_REVENUE_STATS]}
                dependencies={dateRange}
                statsMap={revenueStatsMapForProvider}
                shimmerCount={5}
                role={Role.PROVIDER}
            />,
        },
        {
            id: 'insights-card',
            colSpan: 'col-span-12 lg:col-span-6',
            component: (
                <DataAnalysis
                    badgeText="Appointments Insights"
                    badgeIcon={BookIcon}
                    title="User Engagement & Retention"
                    fetchFn={() =>
                        fetchAnalyticsInsight({
                            ...formateddateRange,
                            entity: aiResponseEntities.APPOINTMENTS
                        })
                    }
                    queryKey={queryKeys.USER_ENGAGEMENT_AI_RES}
                />
            ),
        },
        ...charts
    ]
    return (
        <>
            <DateFilter dateRange={dateRange} setDateRange={setDateRange} />
            <Reorderable initialItems={initialItems} />;
        </>
    )
}

export default ProviderDashboard;