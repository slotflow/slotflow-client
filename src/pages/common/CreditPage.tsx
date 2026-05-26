import React from "react";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import StatCard from "@/components/common/StatsCard";
import PageHeader from "@/components/common/PageHeader";
import CommonTable from "@/components/table/CommonTable";
import ChartLineLinear from "@/components/chart/ChartLineLinear";
import DataFetchingError from "@/components/error/DataFetchingError";
import { Wallet, TrendingUp, TrendingDown, Info } from "lucide-react";
import { creditAccountChartLineLinearConfig } from "@/shared/utils/constants";
import { FetchCreditTransactionsResponse } from "@/shared/interface/api/credit";
import { fetchCreditAccountDetails, fetchCreditTransactions } from "@/shared/apis/credit";
import CreditTransactionTableColumn from "@/components/table/tableColumns/CreditTransactionTableColumn";

const CreditPage: React.FC = () => {

    const column = CreditTransactionTableColumn();
    const endDate = dayjs().toDate();
    const startDate = dayjs().subtract(1, "month").toDate();

    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["credit-details"],
        queryFn: async () => {
            const res = await fetchCreditAccountDetails({
                startDate,
                endDate
            });
            return res.data;
        },
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    return (
        <div className="container p-4 space-y-6">
            <PageHeader
                title="Credit Management"
                description="Manage your credit balance and view transaction history."
            />

            <div className="grid gap-2 grid-col-1 md:grid-cols-2">
                <div className="grid gap-2 grid-cols-2">
                    <StatCard
                        title="Balance Credits"
                        isLoading={isLoading}
                        isError={isError}
                        error={error}
                        data={data?.balanceCredits?.count ?? 0}
                        Icon={Wallet}
                        percentage={data?.balanceCredits?.percentage}
                        days={data?.balanceCredits?.days}
                        chartData={data?.balanceCredits?.chartData ?? []}
                        bgColour="bg-gradient-to-r from-violet-700 to-indigo-600"
                    />
                    <StatCard
                        title="Account Status"
                        isLoading={isLoading}
                        isError={isError}
                        error={error}
                        data={data?.isActive ?? false}
                        Icon={Info}
                    />
                    <StatCard
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
                    <StatCard
                        title="Spent Credits"
                        isLoading={isLoading}
                        isError={isError}
                        error={error}
                        data={data?.spentCredits?.count ?? 0}
                        Icon={TrendingDown}
                        percentage={data?.spentCredits?.percentage}
                        days={data?.spentCredits?.days}
                        chartData={data?.spentCredits?.chartData ?? []}
                        bgColour="bg-gradient-to-r from-violet-700 to-indigo-600"
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
                            chartConfig={creditAccountChartLineLinearConfig}
                            dataKeyOne="totalCredits"
                            dataKeyTwo="spentCredits"
                            dataKeyThree="balanceCredits"
                            chartContainerClassName="h-64"
                        />
                    )}
                </div>
            </div>
            <div>
                <CommonTable<FetchCreditTransactionsResponse>
                    column={column}
                    fetchApiFunction={(params) => fetchCreditTransactions({
                        ...params,
                        startDate: new Date().toISOString(),
                        endDate: new Date().toISOString(),
                    })}
                    columnsCount={5}
                    queryKey="credit-transactions"
                />
            </div>
        </div>
    );
};

export default CreditPage;