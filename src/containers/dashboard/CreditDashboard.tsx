import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import MetricCard from '@/components/common/MetricCard';
import { formatDate } from '@/shared/utils/helper/formatDate';
import ChartLineLinear from '@/components/chart/ChartLineLinear';
import DataFetchingError from '@/components/error/DataFetchingError';
import { Wallet, TrendingUp, TrendingDown, Info } from 'lucide-react';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import { FetchCreditTransactionsResponse } from '@/shared/types/api/credit';
import { dateFormats, queryKeys } from '@/shared/utils/constants/appConstants';
import { creditAccountChartConfig } from '@/shared/utils/constants/chartConstants';
import { fetchCreditAccountDetails, fetchCreditTransactions } from '@/services/apis/credit';
import CreditTransactionTableColumn from '@/components/table/tableColumns/CreditTransactionTableColumn';

// TODO add daterage selector
const CreditDashboard = () => {

  const column = CreditTransactionTableColumn();
  
  const startDate = formatDate(dayjs().subtract(1, 'month').toDate(), dateFormats.ISO_DATE);
  const endDate = formatDate(dayjs().toDate(), dateFormats.ISO_DATE);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: [queryKeys.CREDIT_DETAILS],
    queryFn: async () => {
      const res = await fetchCreditAccountDetails({
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
            title="Balance Credits"
            isLoading={isLoading}
            isError={isError}
            error={error}
            data={data?.balanceCredits?.count ?? 0}
            Icon={Wallet}
            percentage={data?.balanceCredits?.percentage}
            days={data?.balanceCredits?.days}
            chartData={data?.balanceCredits?.chartData ?? []}
            bgColour="bg-gradient-to-r from-violet-500 to-indigo-400"
          />
          <MetricCard
            title="Account Status"
            isLoading={isLoading}
            isError={isError}
            error={error}
            data={data?.isActive ?? false}
            Icon={Info}
          />
          <MetricCard
            title="Total Credits"
            isLoading={isLoading}
            isError={isError}
            error={error}
            data={data?.totalCredits?.count ?? 0}
            Icon={TrendingUp}
            percentage={data?.totalCredits?.percentage}
            days={data?.totalCredits?.days}
            chartData={data?.totalCredits?.chartData ?? []}
          />
          <MetricCard
            title="Spent Credits"
            isLoading={isLoading}
            isError={isError}
            error={error}
            data={data?.spentCredits?.count ?? 0}
            Icon={TrendingDown}
            percentage={data?.spentCredits?.percentage}
            days={data?.spentCredits?.days}
            chartData={data?.spentCredits?.chartData ?? []}
            bgColour="bg-gradient-to-r from-violet-500 to-indigo-400"
          />
        </div>
        <div>
          {isError && error ? (
            <DataFetchingError message="Failed to fetch chart Data" />
          ) : (
            <ChartLineLinear
              title="Credits chart"
              description="Detailed chart view of the credits"
              chartData={data?.chartData ?? []}
              chartConfig={creditAccountChartConfig}
              dataKeyOne="totalCredits"
              dataKeyTwo="spentCredits"
              dataKeyThree="balanceCredits"
              chartContainerClassName="h-64"
            />
          )}
        </div>
      </div>
      <div>
        <PaginatedDataTable<FetchCreditTransactionsResponse>
          column={column}
          fetchApiFunction={(params) =>
            fetchCreditTransactions({
              ...params,
              startDate,
              endDate,
            })
          }
          columnsCount={5}
          queryKey={[queryKeys.CREDIT_TRANSACTIONS]}
        />
      </div>
    </div>
  );
};

export default CreditDashboard;
