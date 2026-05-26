import dayjs from "dayjs";
import React from "react";
import { Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import StatCard from "@/components/common/StatsCard";
import PageHeader from "@/components/common/PageHeader";
import CommonTable from "@/components/table/CommonTable";
import ChartLineLinear from "@/components/chart/ChartLineLinear";
import DataFetchingError from "@/components/error/DataFetchingError";
import { referralChartLineLinearConfig } from "@/shared/utils/constants";
import { fetchReferralDetails, fetchReferrals } from "@/shared/apis/referral";
import ReferralTableColumn from "@/components/table/tableColumns/ReferralTableColumn";

const ReferralPage: React.FC = () => {

    const column = ReferralTableColumn();
    const endDate = dayjs().toDate();
    const startDate = dayjs().subtract(1, "month").toDate();

    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["referal-details"],
        queryFn: async () => {
            const res = await fetchReferralDetails({
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
                title="Referral Management"
                description="Manage your referral and view history."
            />
            <div className="grid gap-2 grid-col-1 md:grid-cols-2">
                <div className="grid gap-2 grid-cols-2">
                    <StatCard
                        title="Total Referrals"
                        isLoading={isLoading}
                        isError={isError}
                        error={error}
                        data={data?.totalReferrals?.count ?? 0}
                        Icon={Users}
                        percentage={data?.totalReferrals?.percentage}
                        days={data?.totalReferrals?.days}
                        chartData={data?.totalReferrals?.chartData ?? []}
                        bgColour="bg-gradient-to-r from-violet-700 to-indigo-600"
                    />
                    <StatCard
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
                    <StatCard
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
                    <StatCard
                        title="Rewarded Referrals"
                        isLoading={isLoading}
                        isError={isError}
                        error={error}
                        data={data?.rewardedReferrals?.count ?? 0}
                        Icon={Users}
                        percentage={data?.rewardedReferrals?.percentage}
                        days={data?.rewardedReferrals?.days}
                        chartData={data?.rewardedReferrals?.chartData ?? []}
                        bgColour="bg-gradient-to-r from-violet-700 to-indigo-600"
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
                            chartConfig={referralChartLineLinearConfig}
                            dataKeyOne="totalReferrals"
                            dataKeyTwo="completedReferrals"
                            dataKeyThree="pendingReferrals"
                            dataKeyFour="rewardedReferrals"
                            chartContainerClassName="h-64"
                        />
                    )}
                </div>
            </div>
            <CommonTable
                column={column}
                columnsCount={4}
                fetchApiFunction={fetchReferrals}
                queryKey="referrals"
            />
        </div>
    )
}

export default ReferralPage;