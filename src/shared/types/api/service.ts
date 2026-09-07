import { Service } from '../entity/appService';

// fetch all app services response
export type FetchServicesResponse = Pick<
  Service,
  '_id' | 'serviceName' | 'isBlocked' | 'serviceCategory'
>;

// Create app service request
export interface CreateServiceRequest {
  serviceCategory: Service['serviceCategory'];
  serviceNames: string[];
}

// Change app service block status request and response
export type ChangeServiceBlockStatusRequest = {
  serviceId: Service['_id'];
} & Pick<Service, 'isBlocked'>;
export type ChangeServiceBlockStatusResponse = Pick<Service, '_id' | 'isBlocked'>;

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
