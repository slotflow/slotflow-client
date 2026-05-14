import { ReferralStatus } from "../enums";

export interface Referral {
    _id: string;
    referrerUserId: string;
    referredUserId: string;
    referralCode: string;
    status: ReferralStatus;
    rewardGiven: boolean;
    createdAt: Date;
    completedAt?: Date;
    updatedAt: Date;
}
