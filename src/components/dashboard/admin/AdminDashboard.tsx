import { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DateFilter from '@/components/filters/DateFilter';
import TabNavigation from '@/components/common/TabNavigation';
import { formatDate } from '@/shared/utils/helper/formatDate';
import { DateRangeStrings, TabItem } from '@/shared/types/common';
import AdminDashboardUserData from './user/AdminDashboardUserData';
import { dateFormats } from '@/shared/utils/constants/appConstants';
import { adminDashboardTabs } from '@/shared/utils/constants/tabConstants';
import AdminDashboardRevenueData from './revenue/AdminDashboardRevenueData';
import AdminDashboardProviderData from './provider/AdminDashboardProviderData';
import AdminDashboardAppointmentsData from './appointment/AdminDashboardAppointmentsData';
import AdminDashboardSubscriptionData from './subscription/AdminDashboardSubscriptionData';

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

  const formateddateRange: DateRangeStrings = useMemo(() => ({
    startDate: formatDate(dateRange?.from, dateFormats.ISO_DATE),
    endDate: formatDate(dateRange?.to, dateFormats.ISO_DATE)
  }), [dateRange?.from, dateRange?.to]);

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
          <AdminDashboardUserData dateRange={formateddateRange} />
        </TabsContent>

        <TabsContent value={adminDashboardTabs[1].value}>
          <AdminDashboardProviderData dateRange={formateddateRange} />
        </TabsContent>

        <TabsContent value={adminDashboardTabs[2].value}>
          <AdminDashboardSubscriptionData dateRange={formateddateRange} />
        </TabsContent>

        <TabsContent value={adminDashboardTabs[3].value}>
          <AdminDashboardRevenueData dateRange={formateddateRange} />
        </TabsContent>

        <TabsContent value={adminDashboardTabs[4].value}>
          <AdminDashboardAppointmentsData dateRange={formateddateRange} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
