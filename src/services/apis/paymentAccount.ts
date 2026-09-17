import { axiosInstance } from "@/lib/axios";
import { ApiBaseResponse } from "@/shared/types/common";
import { CheckStripeAccountStatusResponse, ConnectStripeAccountRequest, ConnexctStripeAccountResponse } from "@/shared/types/api/paymentAccount";

// check stripe account status after success onboarding
export const checkStripeAccountStatus = async (): Promise<
    ApiBaseResponse<CheckStripeAccountStatusResponse>
> => {
    const response = await axiosInstance.get('/payments/stripe/account-status');
    return response.data;
};

// create stripe account
export const connectStripeAccount = async (
  data: ConnectStripeAccountRequest,
): Promise<ApiBaseResponse<ConnexctStripeAccountResponse>> => {
  const response = await axiosInstance.post('/payments/stripe/account-link', data);
  return response.data;
};
