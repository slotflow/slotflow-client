import { ApiBaseResponse, Role } from "../commonInterface";

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
    authUser: {
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
    authUser: {
        username: string;
        profileImage: string;
        phone: string;
        role: Role;
        isBlocked: boolean;
        isLoggedIn: boolean;
        isAddressAdded?: boolean,
        isServiceDetailsAdded?: boolean,
        isServiceAvailabilityAdded?: boolean,
        isAdminApproved?: boolean,
        providerSubscription?: string;
        updatedAt: string;
        googleConnected: boolean;
    };
}


// **** Inline interface used for the signout api


// **** Used as the request type of the resend otp api
export type ResendOtpRequest = Pick<UserBaseInterface, "role"> & Partial<Pick<UserBaseInterface, "verificationToken" | "email">>;
// **** Used as the response interface of the resend otp api
export interface ResendOtpResponse extends ApiBaseResponse {
    authUser: {
        verificationToken: string;
        role: Role;
    };
}


// ****  Used as the Request type of update password api
export type UpdatePasswordRequest = Pick<UserBaseInterface, "password" | "role" | "verificationToken">;