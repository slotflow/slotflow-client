import { HearAboutUsOptionValue, OnboardingStatus, Role, StripeAccountStatus } from "../enums";

export interface User {
    _id: string
    username: string;
    email: string;
    password?: string;
    role: Role;
    onboardingType: Role | null;
    onboardingStatus: OnboardingStatus;
    isBlocked: boolean;
    phone?: string;
    profileImage?: string;
    addressId?: string;
    googleConnected: boolean;
    googleId?: string;
    stripeAccountStatus: StripeAccountStatus | null;
    stripeAccountId?: string;
    stripeCustomerId?: string;
    allowPushNotification: boolean;
    whereDidHearAboutUs: HearAboutUsOptionValue;
    referralCode?: string;
    referredBy?:string;
    createdAt: Date,
    updatedAt: Date
}