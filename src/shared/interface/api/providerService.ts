import { ProviderService } from "../entityInterface/providerServiceInterface";

// response type of provider fetch self service details api
type FetchServiceDetailsResponse = Pick<ProviderService, "serviceName" | "serviceDescription" | "servicePrice" | "serviceExperience" | "serviceType" | "serviceMode" | "requirements" | "maxParticipants" | "isGroupService" | "videoUrl" | "portfolioUrl" | "serviceExperienceYears">;

// response type of provider fetch self service details api
export interface FetchProviderServiceResponse extends FetchServiceDetailsResponse {
   serviceId: { serviceName: string };
    _id?: string;
    providerId?: string;
    tags: string[] | [];
}

// request type of provider update service details api
export type ProviderUpdateServiceDetailsRequest = Pick<ProviderService, "_id" | "isGroupService" | "maxParticipants" | "requirements" | "serviceId" | "serviceDescription" | "serviceExperience" | "serviceMode" | "serviceName" | "servicePrice" | "serviceType" | "tags" | "videoUrl" | "serviceExperienceYears" | "portfolioUrl">;

// request type of provider create service details api
export type ProviderCreateServiceDetailsRequest = Pick<ProviderService, "isGroupService" | "maxParticipants" | "requirements" | "serviceId" | "serviceDescription" | "serviceExperience" | "serviceMode" | "serviceName" | "servicePrice" | "serviceType" | "tags" | "videoUrl" | "serviceExperienceYears" | "portfolioUrl">;
