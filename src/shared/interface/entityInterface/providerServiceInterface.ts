import { ServiceMode, ServiceType } from "../enums";

// Provider service interface
export interface ProviderService {
    _id: string;
    providerId: string;
    serviceId: string; // id of the appservice
    serviceName: string;
    serviceDescription: string;
    servicePrice: number;
    serviceExperience: string;
    requirements?: string;
    serviceType?: ServiceType;
    serviceMode: ServiceMode;
    tags?: string[];
    videoUrl?: string;
    portfolioUrl?: string;
    maxParticipants?: number;
    isGroupService?: boolean;
    createdAt: string;
    updatedAt: string;
}