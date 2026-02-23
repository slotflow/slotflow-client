import { Provider } from "../entityInterface/providerInterface";
import { FetchPaymentsResponse } from "../api/commonApiInterface";
import { ApiPaginatedResponse, FetchFunctionParams } from "../commonInterface";
import { Role } from "../enums";

// Admin fetch provider payments compoenent props interface
export interface AdminFetchProviderPaymentsComponentProps {
    id: string;
    role: Role;
    fethFunction: (params: FetchFunctionParams) => Promise<ApiPaginatedResponse<FetchPaymentsResponse>>;
}

// Admin fetch provider subscriptions component props interface
export interface AdminFetchProviderSubscriptionsComponentProps {
    providerId: Provider["_id"];
}