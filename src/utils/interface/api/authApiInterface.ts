import { AdminVerificationStatus, PlanName, Role } from "../enums";
import { ApiBaseResponse } from "../commonInterface";

interface UserBaseInterface {
    username: string;
    email: string;
    password: string;
    role: string;
    verificationToken: string;
    otp: string;
}


// **** Used as the request type of the user or provider sign up api
export type SignupRequest = Pick<UserBaseInterface, "username" | "email" | "password" | "role">;
// **** Used as the response interface of the user or provider sign up api
export interface SignupResponse extends ApiBaseResponse {
    data: {
        verificationToken: string;
        role: Role;
    };
}


// **** Used as the request type of the otp verification api
export type VerifyOtpRequest = Pick<UserBaseInterface, "otp" | "verificationToken" | "role">;


// **** Used as the request type of user or provider or admin sign in api
export type SigninRequest = Pick<UserBaseInterface, "email" | "password" | "role">;
// **** Used as the response interface of user or provider or admin sign in api
export interface SigninResponse extends ApiBaseResponse {
    data: {
        username: string;
        phone: string;
        profileImage: string;
        role: Role;
        isBlocked: boolean;
        isLoggedIn: boolean;
        isAddressAdded?: boolean,
        isServiceDetailsAdded?: boolean,
        isServiceAvailabilityAdded?: boolean,
        isAdminVerified?: boolean,
        providerSubscription?: PlanName;
        googleConnected: boolean;
        uid?: string;
        isProofSubmitted?: boolean;
        verificationRejectionReason?: string | null,
        adminVerificationStatus?: AdminVerificationStatus,
        isAddressVerified?: boolean,
        isServiceDetailsVerified?: boolean,
        isAvailabilityVerified?: boolean,
        isProofsVerified?: boolean,
        allowPushNotification?: boolean;
    };

}


// **** Inline interface used for the signout api


// **** Used as the request type of the resend otp api
export type ResendOtpRequest = Pick<UserBaseInterface, "role"> & Partial<Pick<UserBaseInterface, "verificationToken" | "email">>;
// **** Used as the response interface of the resend otp api
export interface ResendOtpResponse extends ApiBaseResponse {
    data: {
        verificationToken: string;
        role: Role;
    };
}


// ****  Used as the Request type of update password api
export type UpdatePasswordRequest = Pick<UserBaseInterface, "password" | "role" | "verificationToken">;

//
export interface ProviderSubscriptionUpdatedPayload {
    providerId: string;
    subscriptionPlan: PlanName;
    startDate: Date;
    endDate: Date;
}