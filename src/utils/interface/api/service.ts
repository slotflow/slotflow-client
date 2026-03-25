import { Service } from "../entityInterface/appServiceInterface";

// **** Used as the response type for the admin fetch all app services api
export type FetchServicesResponse = Pick<Service, "_id" | "serviceName" | "isBlocked" | "serviceCategory">;


// **** Used as the request type of adminAddNewService api
export type CreateServiceRequest = Pick<Service, "serviceName" | "serviceCategory">

// **** Used as the request type for the admin change app service block status api
export type ChangeServiceBlockStatusRequest = {
    serviceId: Service["_id"];
    isBlocked: Service["isBlocked"];
}


export type FetchServicesByCategoryResponse = Pick<Service, "_id" | "serviceName">;
