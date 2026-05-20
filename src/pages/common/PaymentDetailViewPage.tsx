import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DataField from "@/components/app/DataField";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { fetchPaymentDetails } from "@/shared/apis/payment";
import DataFetchingError from "@/components/error/DataFetchingError";
import ProfileDetailsShimmer from "@/components/shimmers/DataFieldShimmer";
import { BadgeCheck, Calendar, CreditCard, FileText, Hash, IndianRupee, Landmark, Layers, Link, Mail, Receipt } from "lucide-react";

const PaymentDetailViewPage: React.FC = () => {

    const { paymentId } = useParams<{ paymentId: string }>();

    const { data, isLoading, isError, error } = useQuery({
        queryFn: async () => {
            const res = await fetchPaymentDetails(paymentId!);
            return res.data;
        },
        queryKey: ["payment", paymentId],
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: !!paymentId
    });

    const dataMap = [
        { label: "Transaction ID", value: data?.transactionId, canCopy: true, Icon: Hash },
        { label: "Payment Status", value: data?.paymentStatus, Icon: BadgeCheck },
        { label: "Payment Method", value: data?.paymentMethod, Icon: CreditCard },
        { label: "Payment Gateway", value: data?.paymentGateway, Icon: Landmark },
        { label: "Payment Category", value: data?.paymentFor, Icon: Layers },
        { label: "Initial Amount", value: data?.initialAmount, isPrice: true, Icon: IndianRupee },
        { label: "Discount Amount", value: data?.discountAmount, isPrice: true, Icon: IndianRupee },
        { label: "Total Amount", value: data?.totalAmount, isPrice: true, Icon: Receipt },
        { label: "Receipt URL", value: data?.receiptUrl, link: true, Icon: Link },
        { label: "Customer Email", value: data?.customerEmail, Icon: Mail },
        { label: "Description", value: data?.description, Icon: FileText },
        { label: "Created At", value: data?.createdAt, isDate: true, Icon: Calendar },
    ];

    return (
        <div className="p-4">
            {isError && error ? (
                <DataFetchingError message={(error as Error).message} />
            ) : isLoading ? (
                <ProfileDetailsShimmer row={12} />
            ) : data ? (
                <div className="">
                    <PageHeader
                        title="Payment Details"
                        description="Detailed view of payment"
                    />
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

export default PaymentDetailViewPage;