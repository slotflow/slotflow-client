import { axiosInstance } from "@/lib/axios";
import { FetchPaymentDetailsResponse } from "../interface/api/commonApiInterface";

export const fetchPaymentDetails = async (paymentId: string): Promise<FetchPaymentDetailsResponse> => {
    const response = await axiosInstance.get(`/payments/${paymentId}`);
    return response.data.data;
}
