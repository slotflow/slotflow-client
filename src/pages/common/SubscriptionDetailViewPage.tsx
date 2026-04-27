import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DataFetchingError from '@/components/error/DataFetchingError';
import { fetchSubscriptionDetails } from '@/shared/apis/subscription';
import InfoDisplayComponent from '@/components/app/InfoDisplayComponent';
import ProfileDetailsShimmer from '@/components/shimmers/ProfileDetailsShimmer';

const SubscriptionDetailViewPage: React.FC = () => {

    const { subscriptionId } = useParams<{ subscriptionId: string }>();

    const { data, isLoading, isError, error } = useQuery({
        queryFn: async () => {
            const res = await fetchSubscriptionDetails(subscriptionId!);
            return res.data;
        },
        queryKey: ["subcription", subscriptionId],
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: !!subscriptionId
    });

    const dataMap = [
        { label: "Subscription Status", value: data?.subscriptionStatus },
        { label: "Subscribed on", value: data?.createdAt, isDate: true },
        { label: "Subscription started on", value: data?.startDate, isDate: true },
        { label: "Subscription expires on", value: data?.endDate, isDate: true },
        { label: "Subscribed Plan Name", value: data?.subscriptionPlanId?.planName },
        { label: "Subscription Max Bookings", value: data?.subscriptionPlanId?.maxBookingPerMonth },
        { label: "Subscription Ad Visibility", value: data?.subscriptionPlanId?.adVisibility, isBoolean: true },
        { label: "Subscription price", value: data?.subscriptionPlanId?.price, isPrice: true },
    ];

    return (
        <div className="w-full p-2 mx-auto mt-0 md:flex justify-start flex-grow bg">
            {isError && error ? (
                <DataFetchingError message={(error as Error).message} />
            ) : isLoading ? (
                <ProfileDetailsShimmer row={14} />
            ) : data ? (
                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-4">Subscription Details</h2>
                    <table className="table-auto border-collapse border  w-full">
                        <tbody>
                            {dataMap.map((item) => (
                                <InfoDisplayComponent key={item.label} {...item} />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <DataFetchingError message="No data found" />
            )}
        </div>
    )
}

export default SubscriptionDetailViewPage;