import {
    adminOverviewTabs,
    userStatsMapForAdmin,
    providerStatsMapForAdmin,
    AppointmentsStatsMapForAdmin,
    subscriptionStatsMapForAdmin,
    revenueAnAndPaymentsStatsMapForAdmin,
} from '@/utils/constants';
import {
    adminFetchDashboardUserStatsData,
    adminFetchDashboardRevenueStatsData,
    adminFetchDashboardProviderStatsData,
    adminFetchDashboardAppointmentStatsData,
    adminFetchDashboardSubscriptionStatsData,
} from '@/utils/apis/admin';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Select,
    SelectItem,
    SelectValue,
    SelectTrigger,
    SelectContent,
} from "@/components/ui/select";
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import {
    AdminFetchDashboardUserStatsDataResponse,
    AdminFetchDashboardProviderStatsDataResponse,
    AdminFetchDashboardAppointmentStatsDataResponse,
    AdminFetchDashboardSubscriptionStatsDataResponse,
    AdminFetchDashboardRevenueAndPaymentsStatsDataResponse,
} from "@/utils/interface/api/adminDashboard";
import DataFilter from '@/components/filters/DataFilter';
import DashboardStats from '@/components/dashboard/DashboardStats';

const AdminDashboardStats: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(adminOverviewTabs[0].value);
    const [dateRange, setDateRange] = useState<DateRange>({
        from: new Date(),
        to: new Date(),
    });

    return (
        <div className="p-4 w-full">
            <div className="mb-6">
                <div className="md:hidden mb-4">
                    <Select value={selectedTab} onValueChange={setSelectedTab}>
                        <SelectTrigger className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {adminOverviewTabs.map((tab) => (
                                <SelectItem key={tab.value} value={tab.value}>
                                    {tab.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="hidden md:block">
                    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                        <TabsList className="grid grid-cols-5 gap-2 w-full bg-slate-100/50 dark:bg-slate-900/50 p-1 border border-slate-200 dark:border-slate-800 rounded-xl">
                            {adminOverviewTabs.filter(tab => tab.value !== 'today').map((tab) => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
                                >
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            <DataFilter dateRange={dateRange} setDateRange={setDateRange} />


            <Tabs value={selectedTab} onValueChange={setSelectedTab}>

                <TabsContent value="users">
                    <DashboardStats<AdminFetchDashboardUserStatsDataResponse>
                        queryFunction={() => adminFetchDashboardUserStatsData({
                            startDate: dateRange?.from,
                            endDate: dateRange?.to,
                        })}
                        queryKey="dashboardUsersStats"
                        statsMap={userStatsMapForAdmin}
                        dependencies={dateRange}
                        shimmerCount={3}
                        heading=""
                        role="ADMIN"
                    />
                </TabsContent>

                <TabsContent value="providers">
                    <DashboardStats<AdminFetchDashboardProviderStatsDataResponse>
                        queryFunction={() => adminFetchDashboardProviderStatsData({
                            startDate: dateRange?.from,
                            endDate: dateRange?.to,
                        })}
                        queryKey="dashboardProvidersStats"
                        statsMap={providerStatsMapForAdmin}
                        dependencies={dateRange}
                        shimmerCount={7}
                        heading=""
                        role="ADMIN"
                    />
                </TabsContent>

                <TabsContent value="subscriptions">
                    <DashboardStats<AdminFetchDashboardSubscriptionStatsDataResponse>
                        queryFunction={() => adminFetchDashboardSubscriptionStatsData({
                            startDate: dateRange?.from,
                            endDate: dateRange?.to,
                        })}
                        queryKey="dashboardSubscriptionStats"
                        statsMap={subscriptionStatsMapForAdmin}
                        dependencies={dateRange}
                        shimmerCount={6}
                        heading=""
                        role="ADMIN"
                    />
                </TabsContent>

                <TabsContent value="revenue">
                    <DashboardStats<AdminFetchDashboardRevenueAndPaymentsStatsDataResponse>
                        queryFunction={() => adminFetchDashboardRevenueStatsData({
                            startDate: dateRange?.from,
                            endDate: dateRange?.to,
                        })}
                        queryKey="dashboardRevenueStats"
                        dependencies={dateRange}
                        statsMap={revenueAnAndPaymentsStatsMapForAdmin}
                        shimmerCount={9}
                        heading=""
                        role="ADMIN"
                    />
                </TabsContent>

                <TabsContent value="appointments">
                    <DashboardStats<AdminFetchDashboardAppointmentStatsDataResponse>
                        queryFunction={() => adminFetchDashboardAppointmentStatsData({
                            startDate: dateRange?.from,
                            endDate: dateRange?.to,
                        })}
                        queryKey="dashboardAppointmentsStats"
                        statsMap={AppointmentsStatsMapForAdmin}
                        dependencies={dateRange}
                        shimmerCount={5}
                        heading=""
                        role="ADMIN"
                    />
                </TabsContent>

            </Tabs>
        </div>
    );
};

export default AdminDashboardStats;
