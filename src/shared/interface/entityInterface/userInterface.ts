import { Role } from "../enums";

export interface User {
    _id: string
    username: string;
    email: string;
    password: string | null;
    role: Role;
    hasSelectedRole: boolean;
    isOnboardingCompleted: boolean;
    isBlocked: boolean;
    phone: string | null;
    profileImage: string | null;
    addressId: string | null;
    googleConnected: boolean;
    googleId: string | null;
    stripeConnected: boolean;
    stripeAccountId: string | null;
    stripeCustomerId: string | null;
    allowPushNotification: boolean | null;
    createdAt: Date,
    updatedAt: Date
}