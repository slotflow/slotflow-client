import { ServiceModeType, ServiceTypeType } from "../commonInterface";

// Provider service interface
export interface ProviderService {
    _id: string;
    providerId: string;
    service: string; // id of the appservice
    serviceName: string;
    serviceDescription: string;
    servicePrice: number;
    serviceExperience: string;
    requirements?: string;
    serviceType?: ServiceTypeType;
    serviceMode: ServiceModeType;
    tags?: string[];
    videoUrl?: string;
    maxParticipants?: number;
    isGroupService?: boolean;
    createdAt: string;
    updatedAt: string;
}