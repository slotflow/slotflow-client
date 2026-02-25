import { Provider } from "../entityInterface/providerInterface";
import { ApiPaginatedResponse, FetchFunctionBaseQueryParams } from "../commonInterface";
import { FetchPaymentsQueryParams, FetchPaymentsResponse } from "../api/paymentApiInterface";

// Admin fetch provider payments compoenent props interface
export interface AdminFetchProviderPaymentsComponentProps {
    providerId: string;
    fetchFunction: (params: FetchFunctionBaseQueryParams & FetchPaymentsQueryParams) => Promise<ApiPaginatedResponse<FetchPaymentsResponse>>
}

// Admin fetch provider subscriptions component props interface
export interface AdminFetchProviderSubscriptionsComponentProps {
    providerId: Provider["_id"];
}