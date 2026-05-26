import { Service } from "../entityInterface/appServiceInterface";

// response type of admin fetch all app services api
export type FetchServicesResponse = Pick<Service, "_id" | "serviceName" | "isBlocked" | "serviceCategory">;

// request type of admin create app service api
export type CreateServiceRequest = Pick<Service, "serviceName" | "serviceCategory">

// request type of admin change app service block status api
export type ChangeServiceBlockStatusRequest = {
    serviceId: Service["_id"];
    isBlocked: Service["isBlocked"];
}

// response type of user fetch app services by category api
export type FetchServicesByCategoryResponse = Pick<Service, "_id" | "serviceName">;
