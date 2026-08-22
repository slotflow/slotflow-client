import { User } from '../entity/user';
import { BaseChartData } from '../common';
import { Referral } from '../entity/referral';
import { MiniCardData } from './commonApiInterface';

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
  userId?: User['_id'];
}

export type FetchReferralsResponse = Pick<
  Referral,
  '_id' | 'status' | 'createdAt' | 'completedAt' | 'rewardGiven'
>;
