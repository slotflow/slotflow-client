import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import DataFilter from '@/components/filters/DataFilter';
import ProviderDashboardGraphs from '@/components/dashboard/provider/ProviderDashboardGraphs';

const ProviderDashboardGraphsPage = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <div className="w-full">
      <DataFilter dateRange={dateRange} setDateRange={setDateRange} />
      <ProviderDashboardGraphs dateRange={dateRange as DateRange} />
    </div>
  );
};

export default ProviderDashboardGraphsPage;
