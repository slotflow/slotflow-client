import { SubscriptionStatus } from "../enums";

// Provider subscription interface
export interface Subscription {
  _id: string;
  providerId: string;
  subscriptionStatus: SubscriptionStatus;
  subscribedPlanId: string,
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean | null;
  cancelAt: Date | null;
  lastEventAt: Date | null;
  paymentId: string;
  createdAt: string;
  updatedAt: string;
}
