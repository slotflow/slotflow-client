import { useQuery } from '@tanstack/react-query';
import { UserDataChartProps } from '@/shared/types/component';
import BarChartHorizontal from '@/components/chart/BarChartHorizontal';
import { fetchRoleBasedChartData } from '@/services/apis/admin';
import { newVsReturningUsersChartConfig, queryKeys } from '@/shared/utils/constants';
import { Role } from '@/shared/types/enums';

const UserDataChart = ({ dateRange }: UserDataChartProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.DASHBOARD_USERS_CHART, dateRange],
    queryFn: () =>
      fetchRoleBasedChartData({
        startDate: dateRange.from,
        endDate: dateRange.to,
        role: Role.USER,
      }),
  });

  const chartData = data?.data || [];

  return (
    <BarChartHorizontal
      title="New vs Returning Users"
      description="Compare new user acquisition against returning active user density"
      chartData={chartData}
      dataKeyOne="date"
      dataKeyTwo="newUsers"
      dataKeyThree="returningUsers"
      chartConfig={newVsReturningUsersChartConfig}
      isError={isError}
      isLoading={isLoading}
    />
  );
};

export default UserDataChart;
