import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/utils/constants';
import { RevenueDataChartProps } from '@/shared/types/component';
import AreaGroupedChart from '@/components/chart/AreaGroupedChart';
import { revenueChartConfig } from '@/shared/utils/chartConstants';
import { adminFetchDashboardRevenueChartData } from '@/services/apis/admin';

export const RevenueDataChart = ({ dateRange }: RevenueDataChartProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.DASHBOARD_REVENUE_CHART, dateRange],
    queryFn: () =>
      adminFetchDashboardRevenueChartData({
        startDate: dateRange.from,
        endDate: dateRange.to,
      }),
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
