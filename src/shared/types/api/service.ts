import { Service } from '../entity/appService';

// fetch all app services response
export type FetchServicesResponse = Pick<
  Service,
  '_id' | 'serviceName' | 'isBlocked' | 'serviceCategory'
>;

// Create app service request
export interface CreateServicesRequest {
  serviceCategory: Service['serviceCategory'];
  serviceNames: string[];
}
export type CreateSservicesResponse = Array<Pick<Service, "_id" | "serviceName" | "serviceCategory" | "isBlocked">>;


// Change app service block status request and response
export type AdminChangeServiceBlockStatusRequest = {
  serviceId: Service['_id'];
} & Pick<Service, 'isBlocked'>;
export type AdminChangeServiceBlockStatusResponse = Pick<Service, '_id' | 'isBlocked'>;

// Fetch app services by category response
export type FetchServicesByCategoryResponse = Pick<Service, '_id' | 'serviceName'>;

// Update serivce request and response
export type UpdateServiceRequest = {
  serviceId: Service['_id'];
} & Pick<Service, 'serviceCategory' | 'isBlocked' | 'serviceName'>;
export type UpdateServiceResponse = Pick<
  Service,
  '_id' | 'serviceCategory' | 'isBlocked' | 'serviceName'
>;
