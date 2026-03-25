import { Provider } from "../entityInterface/providerInterface";
import { Service } from "../entityInterface/appServiceInterface";
import { ProviderService } from "../entityInterface/providerServiceInterface";

// **** Used as the response type of admin fetch all providers api
export type AdminFetchAllProvidersResponse = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified" | "isEmailVerified" | "trustedBySlotflow" | "adminVerificationStatus">;


// **** Used as the request interfaces of admin reject provider
export type AdminRejectProviderRequest = Pick<Provider, "verificationRejectionReason" | "isAddressVerified" | "isServiceDetailsVerified" | "isAvailabilityVerified" | "isProofsVerified"> & {
    providerId: Provider["_id"];
}


// **** Used as the request type for the admin change provider block status api
export type AdminChangeProviderBlockStatusRequest = {
    providerId: Provider["_id"];
    isBlocked: Provider["isBlocked"];
}


// **** Used as the request type for the admin change provider trust tag api
export type AdminChangeProviderTrustTagRequest = {
    providerId: Provider["_id"];
    trustedBySlotflow: Provider["trustedBySlotflow"];
}

// **** Used as the response type of the admin fetch provider serivde details api
type FetchProviderServiceApiResponse = Pick<ProviderService, "serviceName" | "serviceDescription" | "servicePrice" | "serviceExperience" | "isGroupService" | "maxParticipants" | "requirements" | "serviceMode" | "serviceType" | "tags" | "videoUrl">;
export interface AdminFetchProviderServiceResponse extends FetchProviderServiceApiResponse {
    service: Pick<Service, "serviceName">
}
