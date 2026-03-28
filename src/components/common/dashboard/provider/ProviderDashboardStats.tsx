import React from "react";
import { DateRange } from "react-day-picker";
import DashboardStats from "../DashboardStats";
import { Role } from "@/utils/interface/enums";
import { revenueStatsMapForProvider, statsMapForProvider } from "@/utils/constants";
import { providerFetchDashboardRevenueStatsData, providerFetchDashboardStatsData } from "@/utils/apis/provider";
import { ProviderFetchDashboardRevenueStatsDataResponse, ProviderFetchDashboardStatsDataResponse } from "@/utils/interface/api/provider";

export interface ProviderDashboardStatsProps {
    dateRange: DateRange;
}

const ProviderDashboardStats: React.FC<ProviderDashboardStatsProps> = ({
    dateRange
}) => {
    return (
        <div className="flex flex-col gap-6">
            <DashboardStats<ProviderFetchDashboardStatsDataResponse>
                queryFunction={() => providerFetchDashboardStatsData({
                    startDate: dateRange.from,
                    endDate: dateRange.to,
                })}
                queryKey="dashboardStats"
                dependencies={dateRange}
                statsMap={statsMapForProvider}
                shimmerCount={6}
                role={Role.PROVIDER}
            />
            <DashboardStats<ProviderFetchDashboardRevenueStatsDataResponse>
                queryFunction={() => providerFetchDashboardRevenueStatsData({
                    startDate: dateRange.from,
                    endDate: dateRange.to,
                })}
                queryKey="dashboardRevenueStats"
                dependencies={dateRange}
                statsMap={revenueStatsMapForProvider}
                shimmerCount={5}
                role={Role.PROVIDER}
            />
        </div>
    )
}

export default ProviderDashboardStats