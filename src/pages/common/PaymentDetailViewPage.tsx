import React from "react"
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPaymentDetails } from "@/shared/apis/payment";
import DataFetchingError from "@/components/error/DataFetchingError";
import InfoDisplayComponent from "@/components/app/InfoDisplayComponent";
import ProfileDetailsShimmer from "@/components/shimmers/ProfileDetailsShimmer";

const PaymentDetailViewPage: React.FC = () => {

    const { paymentId } = useParams<{ paymentId: string }>();

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchPaymentDetails(paymentId!),
        queryKey: ["payment", paymentId],
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: !!paymentId
    });

    const dataMap = [
        { label: "Transaction ID", value: data?.transactionId },
        { label: "Payment Status", value: data?.paymentStatus },
        { label: "Payment Method", value: data?.paymentMethod },
        { label: "Payment Gateway", value: data?.paymentGateway },
        { label: "Payment Category", value: data?.paymentFor },
        { label: "Initial Amount", value: data?.initialAmount, isPrice: true },
        { label: "Discount Amount", value: data?.discountAmount, isPrice: true },
        { label: "Total Amount", value: data?.totalAmount, isPrice: true },
        { label: "Refund ID", value: data?.refundId },
        { label: "Refund Amount", value: data?.refundAmount, isPrice: true },
        { label: "Refund Status", value: data?.refundStatus },
        { label: "Refund Reason", value: data?.refundReason },
        { label: "Refunded At", value: data?.refundAt, isDate: true },
        { label: "Receipt URL", value: data?.receiptUrl },
        { label: "Customer Email", value: data?.customerEmail },
        { label: "Description", value: data?.description },
        { label: "Created At", value: data?.createdAt, isDate: true },
    ];

    return (
        <div className="w-full p-2 mx-auto mt-0 md:flex justify-start flex-grow bg">
            {isError && error ? (
                <DataFetchingError message={(error as Error).message} />
            ) : isLoading ? (
                <ProfileDetailsShimmer row={14} />
            ) : data ? (
                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
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

export default PaymentDetailViewPage;