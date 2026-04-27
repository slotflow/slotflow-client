import { User } from "../entityInterface/userInterface";
import { AdminVerificationStatus, PlanName, Role } from "../enums";

// Used as the request type of the user or provider sign up api
export type SignupRequest = Pick<User, "username" | "email" | "password">;

// Used as the request type of the otp verification api
export interface VerifyOtpRequest {
    otp: string
};

// Used as the request type of the verify email api
export interface VerifyEmailRequest {
    email: string;
}

// Used as the request type of user or provider or admin sign in api
export interface SigninRequest {
    email: string;
    password: string;
};

// Used as the response interface of user or provider or admin sign in api
export interface SigninResponse {
    username: string;
    phone: string;
    profileImage: string;
    email: string;
    role: Role;
    hasSelectedRole: boolean;
    isOnboardingCompleted: boolean;
    isBlocked: boolean;
    isLoggedIn: boolean;
    isAddressAdded?: boolean,
    isServiceDetailsAdded?: boolean,
    isServiceAvailabilityAdded?: boolean,
    isAdminVerified?: boolean,
    providerSubscription?: PlanName;
    googleConnected: boolean;
    uid: string;
    isProofSubmitted?: boolean;
    verificationRejectionReason?: string | null,
    adminVerificationStatus?: AdminVerificationStatus,
    isAddressVerified?: boolean,
    isServiceDetailsVerified?: boolean,
    isAvailabilityVerified?: boolean,
    isProofsVerified?: boolean,
    allowPushNotification?: boolean;
    googleId?: string;
    stripeAccountId?: string;
    stripeConnected?: boolean;
}

//  Used as the Request type of update password api
export type UpdatePasswordRequest = Pick<User, "password">;