import { HearAboutUsOptionValue, Role } from "../enums";
import { User } from "../entityInterface/userInterface";
import { ProviderCardsFilters } from "../commonInterface";
import { ProviderProfile } from "../entityInterface/providerProfileInterface";

// request type for the user preboarding api
export type PreBoardingRequest = {
    role: Role;
    whereDidHearAboutUs: HearAboutUsOptionValue;
    referralCode?: string
}

// response type of the setRole api
export type PreBoardingResponse = Pick<User, "hasSelectedRole" | "isOnboardingCompleted" | "role"> & {
    adminVerificationStatus: ProviderProfile["adminVerificationStatus"] | null 
};

// response type of the user profile details fetching api
export type UserFetchUserProfileDetailsResponse = Pick<User, "username" | "email" | "isBlocked" | "phone" | "createdAt" | "updatedAt">;

// request type of the user profile image updating api
export interface UserUpdateProfileImageRequest {
    s3FileKey: string;
}

// response type of the user profile image updating api
export type UserUpdateProfileImageResponse = User["profileImage"];

// request type of the user update userInfo api
export type UserUpdateUserInfoRequest = Pick<User, "username" | "phone">;

// response type of the user update userInfo api
export type UserUpdateUserInfoResponse = UserUpdateUserInfoRequest;

// request type of the user fetching service providers for the dashboard fetching api
export type UserFetchServiceProvidersRequest = Partial<ProviderCardsFilters> & {
    skip: number;
    limit: number;
};

// response type of the user fetching service providers for the dashboard fetching api
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

// response type of the fetchUsers api
export type AdminfetchAllUsersResponse = Pick<User, "_id" | "username" | "email" | "isBlocked">;


// request type of the changeUserBlockStatus api
export type AdminChangeUserStatusRequest = {
    userId: User["_id"];
    isBlocked: User["isBlocked"];
}

// response type of admin fetch user profile details
export type AdminFetchUserProfileDetailsResponse = Pick<User, "username" | "phone" | "profileImage" | "isBlocked" | "email">;

// return type for the provider fetch users for the chat side bar
export type FetchUsersForChatSidebarResponse = Array<Pick<User, "_id" | "username" | "profileImage">>