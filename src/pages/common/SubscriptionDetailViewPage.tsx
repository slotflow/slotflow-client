import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DataField from '@/components/app/DataField';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import DataFetchingError from '@/components/error/DataFetchingError';
import { fetchSubscriptionDetails } from '@/shared/apis/subscription';
import ProfileDetailsShimmer from '@/components/shimmers/DataFieldShimmer';
import { BadgeCheck, Calendar, CalendarClock, CalendarDays, IndianRupee, ListOrdered, Megaphone, Package } from 'lucide-react';

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
        { label: "Subscription Status", value: data?.subscriptionStatus, Icon: BadgeCheck },
        { label: "Subscribed on", value: data?.createdAt, isDate: true, Icon: Calendar },
        { label: "Subscription started on", value: data?.startDate, isDate: true, Icon: CalendarClock },
        { label: "Subscription expires on", value: data?.endDate, isDate: true, Icon: CalendarDays },
        { label: "Subscribed Plan Name", value: data?.subscriptionPlanId?.planName, Icon: Package },
        { label: "Subscription Max Bookings", value: data?.subscriptionPlanId?.maxBookingPerMonth, Icon: ListOrdered },
        { label: "Subscription Ad Visibility", value: data?.subscriptionPlanId?.adVisibility, isBoolean: true, Icon: Megaphone },
        { label: "Subscription price", value: data?.subscriptionPlanId?.price, isPrice: true, Icon: IndianRupee }
    ];

    return (
        <div className="p-4">
            <PageHeader
                title="Subscription Details"
                description="Detailed view of subscription"
            />
            {isError && error ? (
                <DataFetchingError message={(error as Error).message} />
            ) : isLoading ? (
                <ProfileDetailsShimmer row={8} />
            ) : data ? (
                <div className="">
                    <Card>
                        <CardContent className="space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {dataMap.map((item) => (
                                    <DataField key={item.label} {...item} />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <DataFetchingError message="No data found" />
            )}
        </div>
    )
}

export default SubscriptionDetailViewPage;