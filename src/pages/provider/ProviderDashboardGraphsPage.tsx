import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import DateFilter from '@/components/filters/DateFilter';
import ProviderDashboardGraphs from '@/components/dashboard/provider/ProviderDashboardGraphs';

const ProviderDashboardGraphsPage = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <div className="w-full">
      <DateFilter dateRange={dateRange} setDateRange={setDateRange} />
      <ProviderDashboardGraphs dateRange={dateRange as DateRange} />
    </div>
  );
};

export default ProviderDashboardGraphsPage;
