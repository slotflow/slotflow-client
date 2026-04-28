import { User } from "../entityInterface/userInterface";
import { AdminVerificationStatus, PlanName, Role } from "../enums";

// request type of the user or provider sign up api
export type SignupRequest = Pick<User, "username" | "email" | "password">;

// request type of the otp verification api
export interface VerifyOtpRequest {
    otp: string
};

// request type of the verify email api
export interface VerifyEmailRequest {
    email: string;
}

// request type of user or provider or admin sign in api
export interface SigninRequest {
    email: string;
    password: string;
};

// response interface of user or provider or admin sign in api
export interface SigninResponse {
    uid: string;
    username: string;
    phone: string;
    profileImage: string;
    email: string;
    role: Role;
    hasSelectedRole: boolean;
    isOnboardingCompleted: boolean;
    isBlocked: boolean;
    isLoggedIn: boolean;
    isAddressAdded: boolean,
    isServiceDetailsAdded: boolean,
    isServiceAvailabilityAdded: boolean,
    isAdminVerified: boolean,
    providerSubscription?: PlanName;
    googleConnected: boolean;
    isProofSubmitted: boolean;
    verificationRejectionReason?: string,
    adminVerificationStatus: AdminVerificationStatus,
    isAddressVerified: boolean,
    isServiceDetailsVerified: boolean,
    isAvailabilityVerified: boolean,
    isProofsVerified: boolean,
    allowPushNotification: boolean;
    googleId?: string;
    stripeAccountId?: string;
    stripeConnected: boolean;
    stripeCustomerId?: string;
}

//  request type of update password api
export type UpdatePasswordRequest = Pick<User, "password">;