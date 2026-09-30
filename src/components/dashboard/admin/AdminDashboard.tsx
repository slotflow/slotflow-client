import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { TabItem } from '@/shared/types/common';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DateFilter from '@/components/filters/DateFilter';
import TabNavigation from '@/components/common/TabNavigation';
import AdminDashboardUserData from './user/AdminDashboardUserData';
import AdminDashboardRevenueData from './revenue/AdminDashboardRevenueData';
import AdminDashboardProviderData from './provider/AdminDashboardProviderData';
import AdminDashboardAppointmentsData from './appointment/AdminDashboardAppointmentsData';
import AdminDashboardSubscriptionData from './subscription/AdminDashboardSubscriptionData';
import { adminDashboardTabs } from '@/shared/utils/constants/tabConstants';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem['value']>(adminDashboardTabs[0].value);
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);

    return {
      from: oneMonthAgo,
      to: today,
    };
  });

  return (
    <div className="w-full">
      <div className="mb-2">
        <TabNavigation
          setTab={setSelectedTab}
          tab={selectedTab}
          isAdmin
          tabArray={adminDashboardTabs}
        />
      </div>

      <DateFilter dateRange={dateRange} setDateRange={setDateRange} />

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsContent value={adminDashboardTabs[0].value}>
          <AdminDashboardUserData dateRange={dateRange} />
        </TabsContent>

        <TabsContent value={adminDashboardTabs[1].value}>
          <AdminDashboardProviderData dateRange={dateRange} />
        </TabsContent>

        <TabsContent value={adminDashboardTabs[2].value}>
          <AdminDashboardSubscriptionData dateRange={dateRange} />
        </TabsContent>

        <TabsContent value={adminDashboardTabs[3].value}>
          <AdminDashboardRevenueData dateRange={dateRange} />
        </TabsContent>

        <TabsContent value={adminDashboardTabs[4].value}>
          <AdminDashboardAppointmentsData dateRange={dateRange} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
