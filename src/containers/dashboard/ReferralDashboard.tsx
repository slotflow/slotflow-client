import dayjs from 'dayjs';
import { Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import MetricCard from '@/components/common/MetricCard';
import ChartLineLinear from '@/components/chart/ChartLineLinear';
import DataFetchingError from '@/components/error/DataFetchingError';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import { referralChartConfig } from '@/shared/utils/constants/chartConstants';
import { fetchReferralDetails, fetchReferrals } from '@/services/apis/referral';
import ReferralTableColumn from '@/components/table/tableColumns/ReferralTableColumn';

const ReferralDashboard = () => {
  const column = ReferralTableColumn();
  const endDate = dayjs().toDate();
  const startDate = dayjs().subtract(1, 'month').toDate();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: [queryKeys.REFERRAL_DETAILS],
    queryFn: async () => {
      const res = await fetchReferralDetails({
        startDate,
        endDate,
      });
      return res.data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-2 grid-col-1 md:grid-cols-2">
        <div className="grid gap-2 grid-cols-2">
          <MetricCard
            title="Total Referrals"
            isLoading={isLoading}
            isError={isError}
            error={error}
            data={data?.totalReferrals?.count ?? 0}
            Icon={Users}
            percentage={data?.totalReferrals?.percentage}
            days={data?.totalReferrals?.days}
            chartData={data?.totalReferrals?.chartData ?? []}
            bgColour="bg-gradient-to-r from-violet-500 to-indigo-400"
          />
          <MetricCard
            title="Completed Referrals"
            isLoading={isLoading}
            isError={isError}
            error={error}
            data={data?.completedReferrals?.count ?? 0}
            Icon={Users}
            percentage={data?.completedReferrals?.percentage}
            days={data?.completedReferrals?.days}
            chartData={data?.completedReferrals?.chartData ?? []}
          />
          <MetricCard
            title="Pending Referrals"
            isLoading={isLoading}
            isError={isError}
            error={error}
            data={data?.pendingReferrals?.count ?? 0}
            Icon={Users}
            percentage={data?.pendingReferrals?.percentage}
            days={data?.pendingReferrals?.days}
            chartData={data?.pendingReferrals?.chartData ?? []}
          />
          <MetricCard
            title="Rewarded Referrals"
            isLoading={isLoading}
            isError={isError}
            error={error}
            data={data?.rewardedReferrals?.count ?? 0}
            Icon={Users}
            percentage={data?.rewardedReferrals?.percentage}
            days={data?.rewardedReferrals?.days}
            chartData={data?.rewardedReferrals?.chartData ?? []}
            bgColour="bg-gradient-to-r from-violet-500 to-indigo-400"
          />
        </div>
        <div>
          {isError && error ? (
            <DataFetchingError message="Failed to fetch chart Data" />
          ) : (
            <ChartLineLinear
              title="Referrals chart"
              description="Detailed chart view of the referrals"
              chartData={data?.chartData ?? []}
              chartConfig={referralChartConfig}
              dataKeyOne="totalReferrals"
              dataKeyTwo="completedReferrals"
              dataKeyThree="pendingReferrals"
              dataKeyFour="rewardedReferrals"
              chartContainerClassName="h-64"
            />
          )}
        </div>
      </div>
      <PaginatedDataTable
        column={column}
        columnsCount={4}
        fetchApiFunction={fetchReferrals}
        queryKey={[queryKeys.REFERRALS]}
      />
    </div>
  );
};

export default ReferralDashboard;
