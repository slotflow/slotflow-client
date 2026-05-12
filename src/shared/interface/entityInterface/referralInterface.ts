import { ReferralStatus } from "../enums";

export interface ReferralProps {
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
