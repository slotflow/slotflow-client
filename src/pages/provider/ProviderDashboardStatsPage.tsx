import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import DateFilter from '@/components/filters/DateFilter';
import ProviderDashboardStats from '@/components/dashboard/provider/ProviderDashboardStats';

const ProviderDashboardStatsPage = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <div className="w-full">
      <DateFilter dateRange={dateRange} setDateRange={setDateRange} />
      <ProviderDashboardStats dateRange={dateRange as DateRange} />
    </div>
  );
};

export default ProviderDashboardStatsPage;
