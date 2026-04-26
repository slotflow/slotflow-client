import { ProviderService } from "../entityInterface/providerServiceInterface";

// **** Used as the response type for provider fetch self service details
type FetchServiceDetailsResponse = Pick<ProviderService, "serviceName" | "serviceDescription" | "servicePrice" | "serviceExperience" | "serviceType" | "serviceMode" | "requirements" | "maxParticipants" | "isGroupService" | "videoUrl">;
export interface FetchProviderServiceResponse extends FetchServiceDetailsResponse {
   serviceId: { serviceName: string };
    _id?: string;
    providerId?: string;
    tags: string[] | [];
}

export type ProviderUpdateServiceDetailsRequest = Pick<ProviderService, "_id" | "isGroupService" | "maxParticipants" | "requirements" | "serviceId" | "serviceDescription" | "serviceExperience" | "serviceMode" | "serviceName" | "servicePrice" | "serviceType" | "tags" | "videoUrl">;


export type ProviderCreateServiceDetailsRequest = Pick<ProviderService, "isGroupService" | "maxParticipants" | "requirements" | "serviceId" | "serviceDescription" | "serviceExperience" | "serviceMode" | "serviceName" | "servicePrice" | "serviceType" | "tags" | "videoUrl">;
