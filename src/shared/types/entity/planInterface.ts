import { PlanName } from '../enums';

export interface StripePlanDetails {
  productId: string;
  monthlyPriceId: string;
  yearlyPriceId: string;
}

export enum StripeSyncStatus {
  PENDING = 'pending',
  SYNCED = 'synced',
}

export interface Plan {
  _id: string;
  planName: PlanName;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  maxBookingPerMonth: number;
  adVisibility: boolean;
  isBlocked: boolean;
  stripePlanDetails: StripePlanDetails | null;
  stripeSync: StripeSyncStatus;
  createdAt: string;
  updatedAt: string;
}
