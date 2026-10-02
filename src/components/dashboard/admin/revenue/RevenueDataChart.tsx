import { useQuery } from '@tanstack/react-query';
import { RevenueDataChartProps } from '@/shared/types/component';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import AreaGroupedChart from '@/components/chart/AreaGroupedChart';
import { adminFetchDashboardRevenueChartData } from '@/services/apis/admin';
import { revenueChartConfig } from '@/shared/utils/constants/chartConstants';

export const RevenueDataChart = ({ dateRange }: RevenueDataChartProps) => {

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.DASHBOARD_REVENUE_CHART, dateRange],
    queryFn: () =>
      adminFetchDashboardRevenueChartData(dateRange),
  });

  const chartData = data?.data || [];

  return (
    <AreaGroupedChart
      title="Revenue Breakdown"
      description="Daily breakdown of net revenue, promotional discounts, and payment gateway processing fees."
      chartData={chartData}
      dataKeyOne="totalRevenue"
      dataKeyTwo="totalRefunds"
      dataKeyThree="netRevenue"
      chartConfig={revenueChartConfig}
      isError={isError}
      isLoading={isLoading}
    />
  );
};

export default RevenueDataChart;
