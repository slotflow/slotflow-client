import React, { useState } from 'react';
import {
    userStatsMapForAdmin,
    todayStatsMapForAdmin,
    providerStatsMapForAdmin,
    AppointmentsStatsMapForAdmin,
    subscriptionStatsMapForAdmin,
    revenueAnAndPaymentsStatsMapForAdmin,
    adminOverviewTabs,
} from '@/utils/constants';
import {
    adminFetchDashboardUserStatsData,
    adminFetchDashboardTodayStatsData,
    adminFetchDashboardRevenueStatsData,
    adminFetchDashboardProviderStatsData,
    adminFetchDashboardAppointmentStatsData,
    adminFetchDashboardSubscriptionStatsData,
} from '@/utils/apis/dashboard.api';
import {
    AdminFetchDashboardUserStatsDataResponse,
    AdminFetchDashboardTodayStatsDataResponse,
    AdminFetchDashboardProviderStatsDataResponse,
    AdminFetchDashboardAppointmentStatsDataResponse,
    AdminFetchDashboardSubscriptionStatsDataResponse,
    AdminFetchDashboardRevenueAndPaymentsStatsDataResponse,
} from "@/utils/interface/api/dashboardApiInterface";
import DashboardStats from '@/components/common/dashboard/DashboardStats';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

const AdminDashboardPage: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(adminOverviewTabs[0].value);

    return (
        <div className="p-4 w-full">
            {/* Dropdown for small screens */}
            <div className="md:hidden mb-4">
                <Select value={selectedTab} onValueChange={setSelectedTab}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Tab" />
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

            {/* Grid tabs for md+ screens */}
            <div className="hidden md:block mb-4">
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                    <TabsList className="grid grid-cols-6 gap-2 w-full">
                        {adminOverviewTabs.map((tab) => (
                            <TabsTrigger key={tab.value} value={tab.value}>
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            {/* Tab contents */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsContent value="today">
                    <DashboardStats<AdminFetchDashboardTodayStatsDataResponse>
                        queryFunction={adminFetchDashboardTodayStatsData}
                        queryKey="dashboardTodayStats"
                        statsMap={todayStatsMapForAdmin}
                        shimmerCount={6}
                        heading=""
                        role="ADMIN"
                    />
                </TabsContent>

                <TabsContent value="users">
                    <DashboardStats<AdminFetchDashboardUserStatsDataResponse>
                        queryFunction={adminFetchDashboardUserStatsData}
                        queryKey="dashboardUsersStats"
                        statsMap={userStatsMapForAdmin}
                        shimmerCount={3}
                        heading=""
                        role="ADMIN"
                    />
                </TabsContent>

                <TabsContent value="providers">
                    <DashboardStats<AdminFetchDashboardProviderStatsDataResponse>
                        queryFunction={adminFetchDashboardProviderStatsData}
                        queryKey="dashboardProvidersStats"
                        statsMap={providerStatsMapForAdmin}
                        shimmerCount={7}
                        heading=""
                        role="ADMIN"
                    />
                </TabsContent>

                <TabsContent value="subscriptions">
                    <DashboardStats<AdminFetchDashboardSubscriptionStatsDataResponse>
                        queryFunction={adminFetchDashboardSubscriptionStatsData}
                        queryKey="dashboardSubscriptionStats"
                        statsMap={subscriptionStatsMapForAdmin}
                        shimmerCount={6}
                        heading=""
                        role="ADMIN"
                    />
                </TabsContent>

                <TabsContent value="revenue">
                    <DashboardStats<AdminFetchDashboardRevenueAndPaymentsStatsDataResponse>
                        queryFunction={adminFetchDashboardRevenueStatsData}
                        queryKey="dashboardRevenueStats"
                        statsMap={revenueAnAndPaymentsStatsMapForAdmin}
                        shimmerCount={9}
                        heading=""
                        role="ADMIN"
                    />
                </TabsContent>

                <TabsContent value="appointments">
                    <DashboardStats<AdminFetchDashboardAppointmentStatsDataResponse>
                        queryFunction={adminFetchDashboardAppointmentStatsData}
                        queryKey="dashboardAppointmentsStats"
                        statsMap={AppointmentsStatsMapForAdmin}
                        shimmerCount={5}
                        heading=""
                        role="ADMIN"
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminDashboardPage;
