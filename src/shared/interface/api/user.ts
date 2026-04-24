import { Role } from "../enums";
import { User } from "../entityInterface/userInterface";
import { ApiBaseResponse, ProviderCardsFilters } from "../commonInterface";

// Used as the request type of the setRole api
export interface setRoleRequest {
    role: Role
};
export interface setRoleResponse extends ApiBaseResponse {
    data: Pick<User, "hasSelectedRole" | "isOnboardingCompleted">;
}

// Used as the response type of the user profile details fetching api
export type UserFetchUserProfileDetailsResponse = Pick<User, "username" | "email" | "isBlocked" | "phone" | "createdAt" | "updatedAt">;


// Used as the response type of the user profile image updating api
export interface UserUpdateProfileImageRequest {
    s3FileKey: string;
}
export interface UserUpdateProfileImageResponse extends ApiBaseResponse {
    data: User["profileImage"]
}


// Used as the request type of user update userInfo api
export type UserUpdateUserInfoRequest = Pick<User, "username" | "phone">;
// Used as the response interface of user update userInfo api
export interface UserUpdateUserInfoResponse extends ApiBaseResponse {
    data: UserUpdateUserInfoRequest
}




// Used as the response interface of the user fetching service providers for the dashboard fetching api
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

// Used as the response type of the fetchUsers api
export type AdminfetchAllUsersResponse = Pick<User, "_id" | "username" | "email" | "isBlocked">;


// Used as the request type of the changeUserBlockStatus api
export type AdminChangeUserStatusRequest = {
    userId: User["_id"];
    isBlocked: User["isBlocked"];
}

// Used as the response type of admin fetch user profile details
export type AdminFetchUserProfileDetailsResponse = Pick<User, "username" | "phone" | "profileImage" | "isBlocked" | "email">;
