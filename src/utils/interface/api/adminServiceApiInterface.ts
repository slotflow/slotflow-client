import { Service } from "../entityInterface/appServiceInterface";

export type BasicAppServiceInfo = Pick<Service, "_id" | "serviceName" | "isBlocked">;

// **** Used as the response type for the admin fetch all app services api
export type AdminFetchAllServicesResponse = BasicAppServiceInfo;


// **** Used as the request type of adminAddNewService api
export type AdminAddNewAppServiceRequest = Pick<Service, "serviceName">

// **** Used as the request type for the admin change app service block status api
export type AdminChangeServiceBlockStatusRequest = {
    serviceId: Service["_id"];
    isBlocked: Service["isBlocked"];
}
