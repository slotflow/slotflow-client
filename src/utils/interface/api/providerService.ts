import { Service } from "../entityInterface/appServiceInterface";
import { ProviderService } from "../entityInterface/providerServiceInterface";

// Used as the response interface of the admin fetching provider service details api
// type FetchProviderServiceApiResponse = Pick<ProviderService, "serviceName" | "serviceDescription" | "servicePrice" | "serviceExperience" | "isGroupService" | "maxParticipants" | "requirements" | "serviceMode" | "serviceType" | "tags" | "videoUrl">;
// export interface AdminFetchProviderServiceResponse extends FetchProviderServiceApiResponse {
//     service: Pick<Service, "serviceName">
// }

// Used as the response interface of the user fetching provider service details api
type FetchServiceDetailsProps = Pick<ProviderService, "serviceName" | "serviceDescription" | "servicePrice" | "serviceExperience" | "videoUrl" | "serviceType" | "serviceMode" | "requirements" | "maxParticipants" | "isGroupService">;
export interface UserFetchProviderServiceResponse extends FetchServiceDetailsProps {
    service: Pick<Service, "serviceName">
}

// **** Used as the response type for provider fetch self service details
type FetchServiceDetailsResponse = Pick<ProviderService, "_id" | "serviceName" | "serviceDescription" | "servicePrice" | "serviceExperience" | "isGroupService" | "maxParticipants" | "requirements" | "serviceMode" | "serviceType" | "tags" | "videoUrl">;
export interface FetchProviderServiceResponse extends FetchServiceDetailsResponse {
  service: Pick<Service, "serviceName">
}

export type ProviderUpdateServiceDetailsRequest = Pick<ProviderService, "_id" | "isGroupService" | "maxParticipants" | "requirements" | "service" | "serviceDescription" | "serviceExperience" | "serviceMode" | "serviceName" | "servicePrice" | "serviceType" | "tags" | "videoUrl">;


export type ProviderCreateServiceDetailsRequest = Pick<ProviderService, "isGroupService" | "maxParticipants" | "requirements" | "service" | "serviceDescription" | "serviceExperience" | "serviceMode" | "serviceName" | "servicePrice" | "serviceType" | "tags" | "videoUrl">;
