import { Role } from '@/shared/types/enums';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/utils/constants';
import { fetchRoleBasedChartData } from '@/services/apis/admin';
import { ProviderDataChartProps } from '@/shared/types/component';
import BarChartHorizontal from '@/components/chart/BarChartHorizontal';
import { newVsReturningProvidersChartConfig } from '@/shared/utils/chartConstants';

const ProviderDataChart = ({ dateRange }: ProviderDataChartProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.DASHBOARD_PROVIDERS_CHART, dateRange],
    queryFn: () =>
      fetchRoleBasedChartData({
        startDate: dateRange.from,
        endDate: dateRange.to,
        role: Role.PROVIDER,
      }),
  });

  const chartData = data?.data || [];
  return (
    <BarChartHorizontal
      title="New vs Returning Providers"
      description="Compare new provider acquisition against returning active provider density"
      chartData={chartData}
      dataKeyOne="date"
      dataKeyTwo="newUsers"
      dataKeyThree="returningUsers"
      chartConfig={newVsReturningProvidersChartConfig}
      isError={isError}
      isLoading={isLoading}
    />
  );
};

export default ProviderDataChart;
