import { ApiBaseResponse } from "../commonInterface";
import { Plan } from "../entityInterface/planInterface";
import { Subscription } from "../entityInterface/subscriptionInterface";
import { PlanName, SubscriptionStatus, SubscriptionValidity } from "../enums";

// interface for fetch subscriptions
export interface FetchSubscriptionsQueryParams {
  providerId?: string;
}

// type for fetch subscriptions response
export type FetchProviderSubscriptionsResponse = Pick<Subscription, "_id" | "startDate" | "endDate" | "subscriptionStatus"> & Pick<Plan, "planName">;

type SubscriptionProps = Pick<Subscription, "startDate" | "endDate" | "subscriptionStatus" | "createdAt">;
type PlanProps = Pick<Plan, "planName" | "price" | "adVisibility" | "maxBookingPerMonth">;
// interface for fetch subscription details response
export interface FetchSubscriptionDetailsResponse extends SubscriptionProps {
  subscriptionPlanId: PlanProps,
}

export interface SubscriptionActivated {
  providerId: string;
  subscribedPlan: PlanName;
  startDate: Date;
  endDate: Date;
  subscriptionStatus: SubscriptionStatus;
}
// interface for fetch my subscription response
export interface FetchMySubscriptionResponse extends ApiBaseResponse {
  data: SubscriptionActivated
}

// interface for checkout for subscribe plan request
export interface CheckoutForSubscribePlanRequest {
  planId: Plan["_id"];
  planDuration: SubscriptionValidity
}

// interface for checkout for subscribe plan response
export interface CheckoutForSubscribePlanResponse extends ApiBaseResponse {
  data: string
}