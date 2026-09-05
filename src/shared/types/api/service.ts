import { Service } from '../entity/appService';

// response type of admin fetch all app services api
export type FetchServicesResponse = Pick<
  Service,
  '_id' | 'serviceName' | 'isBlocked' | 'serviceCategory'
>;

// request type of admin create app service api
export interface CreateServiceRequest {
  serviceCategory: Service['serviceCategory'];
  serviceNames: string[];
}

// request type of admin change app service block status api
export type ChangeServiceBlockStatusRequest = Pick<Service, '_id' | 'isBlocked'>;

// response type of admin change app service block status api
export type ChangeServiceBlockStatusResponse = {
  serviceId: Service['_id'];
  isBlocked: Service['isBlocked'];
};

// response type of user fetch app services by category api
export type FetchServicesByCategoryResponse = Pick<Service, '_id' | 'serviceName'>;

// Update serivce request and response
export type UpdateServiceRequest = Pick<
  Service,
  '_id' | 'serviceCategory' | 'isBlocked' | 'serviceName'
>;
export type UpdateServiceResponse = Pick<
  Service,
  '_id' | 'serviceCategory' | 'isBlocked' | 'serviceName'
>;
