import React from "react";
import { useQuery } from "@tanstack/react-query";
import CreditCard from "@/components/credit/CreditCard";
import PageHeader from "@/components/common/PageHeader";
import CommonTable from "@/components/table/CommonTable";
import ChartLineLinear from "@/components/chart/ChartLineLinear";
import { chartLineLinearConfig } from "@/shared/utils/constants";
import DataFetchingError from "@/components/error/DataFetchingError";
import { Wallet, TrendingUp, TrendingDown, Info } from "lucide-react";
import { fetchCreditAccountDetails, fetchCreditTransactions } from "@/shared/apis/credit";
import CreditTransactionTableColumn from "@/components/table/tableColumns/CreditTransactionTableColumn";
import { FetchCreditTransactionsResponse } from "@/shared/interface/api/credit";

const CreditAccountPage: React.FC = () => {

    const column = CreditTransactionTableColumn();

    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["credit-account"],
        queryFn: async () => {
            const res = await fetchCreditAccountDetails();
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
                    <CreditCard
                        Icon={Wallet}
                        data={data?.balance ?? 0}
                        error={error}
                        isLoading={isLoading}
                        isError={isError}
                        title={"Balance Credits"}
                        main
                        bgColour="bg-[var(--mainColorHover)]"
                    />
                    <CreditCard
                        Icon={Info}
                        data={data?.isActive ?? false}
                        error={error}
                        isLoading={isLoading}
                        isError={isError}
                        title={"Account Status"}
                    />
                    <CreditCard
                        Icon={TrendingUp}
                        data={data?.totalCredits ?? 0}
                        error={error}
                        isLoading={isLoading}
                        isError={isError}
                        title={"Total Credits"}
                    />
                    <CreditCard
                        Icon={TrendingDown}
                        data={data?.spentCredits ?? 0}
                        error={error}
                        isLoading={isLoading}
                        isError={isError}
                        title={"Spent Credits"}
                    />
                </div>
                <div className="shadow">
                    {isError && error ? (
                        <DataFetchingError message="Failed to fetch chart Data" />
                    ) : (
                        <ChartLineLinear
                            chartData={data?.chartData ?? []}
                            chartConfig={chartLineLinearConfig}
                            dataKeyOne="credits"
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

export default CreditAccountPage;