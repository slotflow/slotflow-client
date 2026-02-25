import { ApiBaseResponse, ProviderCardsFilters } from "../commonInterface";
import { User } from "../entityInterface/userInterface";
import { Address } from "../entityInterface/addressInterface";
import { Provider } from "../entityInterface/providerInterface";
import { Service } from "../entityInterface/appServiceInterface";
import { ProviderService } from "../entityInterface/providerServiceInterface";
import { AvailabilityForResponse } from "../entityInterface/serviceAvailabilityInterface";

// **** Used as the response type of the user profile details fetching api
export type UserFetchUserProfileDetailsResponse = Pick<User, "username" | "email" | "isBlocked" | "isEmailVerified" | "phone" | "createdAt" | "updatedAt">;


// **** Used as the response type of the user profile image updating api
export interface UserUpdateProfileImageRequest {
    s3FileKey: string;
}
export interface UserUpdateProfileImageResponse extends ApiBaseResponse {
    data: User["profileImage"]
}


// **** Used as the request type of user update userInfo api
export type UserUpdateUserInfoRequest = Pick<User, "username" | "phone">;
// **** Used as the response interface of user update userInfo api
export interface UserUpdateUserInfoResponse extends ApiBaseResponse {
    data: UserUpdateUserInfoRequest
}


// **** Used as the request interface of the user add address api
export type CreateUserAddressRequest = Pick<Address, "addressLine" | "landMark" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "location">;
export interface UserCreateAddressResponse extends ApiBaseResponse {
    data: Pick<Address, "_id" | "addressLine" | "landMark" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "location" | "updatedAt">;
}



// **** Used as the response type of the user fetching api
export type UserFetchAddressResponse = Pick<Address, "_id" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "landMark" | "location" | "countryCode">;


// **** Used as the response type of the user fetch all services for the service selecting page fetching api
export type UserFetchAllAppServicesResponse = Pick<Service, "_id" | "serviceName">;


// **** Used as the response interface of the user fetching service providers for the dashboard fetching api
export type UserFetchServiceProvidersRequest = Partial<ProviderCardsFilters> & {
    skip: number;
    limit: number;
};

export interface UserFetchServiceProvidersResponse {
    _id: string,
    provider: {
        _id: string,
        username: string,
        profileImage: string | null,
        trustedBySlotflow: boolean,
    },
    serviceDetails: {
        serviceId: string;
        service: string;
        serviceCategory: string;
        serviceName: string;
        servicePrice: number;
    };
};


// **** Used as the response type of the user fetching service providers details fetching api
export type UserFetchProviderProfileDetailsResponse = Pick<Provider, "username" | "email" | "phone" | "profileImage" | "trustedBySlotflow">;


// **** Used as the response type of the user fetching service providers address fetching api
export type UserFetchProviderAddressResponse = Pick<Address, "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "landMark" | "location">;


// **** Used as the response interface of the user fetching service providers service details fetching api
type FetchServiceDetailsProps = Pick<ProviderService, "serviceName" | "serviceDescription" | "servicePrice" | "serviceExperience" | "videoUrl" | "serviceType" | "serviceMode" | "requirements" | "maxParticipants" | "isGroupService">;
export interface UserFetchProviderServiceResponse extends FetchServiceDetailsProps {
    service: Pick<Service, "serviceName">
}


// **** Used as the response type of the user fetching service providers service availability fetching api
export type UserFetchProviderAvailabilityResponse = AvailabilityForResponse;


// **** Used as the request type of the user book an appointment api
export type UserBookAnAppointmentRequest = {
    providerId: Provider["_id"];
    slotId: string;
    date: Date;
    selectedServiceMode: string;
}
// **** Used as the response interface of the user book an appointment api
export interface UserBookAppointmentResponse extends ApiBaseResponse {
    data: string
}


// **** Inline interface used for userSaveAppointmentBooking api


// **** Interfaces for userFetchBooking api is in common interface api file


// **** Inline interface used for userCancelBooking api


// **** Interfaces for userFetchPayments api is in common interface api file


// **** Used as the return type of the user fetch providers for the chat side bar
export type UserFetchProvidersForChatSidebarResponse = Array<Pick<Provider, "_id" | "username" | "profileImage">>;


// **** Address updating interfaces are in common interface file
