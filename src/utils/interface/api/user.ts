import { User } from "../entityInterface/userInterface";
import { Provider } from "../entityInterface/providerInterface";
import { Service } from "../entityInterface/appServiceInterface";
import { ApiBaseResponse, ProviderCardsFilters } from "../commonInterface";
import { ProviderService } from "../entityInterface/providerServiceInterface";

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

// **** Used as the response interface of the user fetching service providers service details fetching api
type FetchServiceDetailsProps = Pick<ProviderService, "serviceName" | "serviceDescription" | "servicePrice" | "serviceExperience" | "videoUrl" | "serviceType" | "serviceMode" | "requirements" | "maxParticipants" | "isGroupService">;
export interface UserFetchProviderServiceResponse extends FetchServiceDetailsProps {
    service: Pick<Service, "serviceName">
}


// **** Used as the return type of the user fetch providers for the chat side bar
export type UserFetchProvidersForChatSidebarResponse = Array<Pick<Provider, "_id" | "username" | "profileImage">>;
