import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import PieChartRounded from '@/components/chart/PieChartRounded';
import { SubscriptionDataChartProps } from '@/shared/types/component';
import { subscriptionChartConfig } from '@/shared/utils/constants/chartConstants';
import { adminFetchDashboardSubscriptionChartData } from '@/services/apis/admin';

const SubscriptionDataChart = ({ dateRange }: SubscriptionDataChartProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.DASHBOARD_SUBSCRPITION_CHART, dateRange],
    queryFn: () =>
      adminFetchDashboardSubscriptionChartData({
        startDate: dateRange.from,
        endDate: dateRange.to,
      }),
  });

  const chartData = data?.data || [];
  return (
    <PieChartRounded
      title="Subscription Status Overview"
      description="Distribution of current subscription states across all providers"
      chartData={chartData}
      dataKey="value"
      nameKey="status"
      chartConfig={subscriptionChartConfig}
      isError={isError}
      isLoading={isLoading}
    />
  );
};

export default SubscriptionDataChart;
