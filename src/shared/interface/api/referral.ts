import { BaseChartData } from "../commonInterface";
import { Referral } from "../entityInterface/referralInterface";
import { User } from "../entityInterface/userInterface";
import { MiniCardData } from "./commonApiInterface";


export interface FetchReferralDetailsRequest {
    startDate: Date;
    endDate: Date;
}
export interface MainChartData extends BaseChartData {
    totalReferrals: number;
    completedReferrals: number;
    pendingReferrals: number;
    rewardedReferrals: number;
}
export interface FetchReferralDetailsResponse {
    totalReferrals: MiniCardData;
    completedReferrals: MiniCardData;
    pendingReferrals: MiniCardData;
    rewardedReferrals: MiniCardData;
    chartData: MainChartData[];
}



export interface FetchReferralssQueryParams {
    userId?: User["_id"];
}

export type FetchReferralsResponse = Pick<Referral, "_id" | "status" | "createdAt" | "completedAt" | "rewardGiven">;