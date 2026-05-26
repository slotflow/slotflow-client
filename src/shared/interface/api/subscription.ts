import { Plan } from "../entityInterface/planInterface";
import { Subscription } from "../entityInterface/subscriptionInterface";
import { PlanName, SubscriptionStatus, SubscriptionValidity } from "../enums";

// query params of fetch subscription
export interface FetchSubscriptionsQueryParams {
  providerId?: string;
}

// response of fetch subscriptions
export type FetchProviderSubscriptionsResponse = Pick<Subscription, "_id" | "startDate" | "endDate" | "subscriptionStatus"> & Pick<Plan, "planName">;

// subscription props
type SubscriptionProps = Pick<Subscription, "startDate" | "endDate" | "subscriptionStatus" | "createdAt">;

// plan props
type PlanProps = Pick<Plan, "planName" | "price" | "adVisibility" | "maxBookingPerMonth">;

// response of fetch subscription details
export interface FetchSubscriptionDetailsResponse extends SubscriptionProps {
  subscriptionPlanId: PlanProps,
}

// response of fetch activated subscription
export interface SubscriptionActivated {
  providerId: string;
  subscribedPlan: PlanName;
  startDate: Date;
  endDate: Date;
  subscriptionStatus: SubscriptionStatus;
}

// response of fetch my subscription
export type FetchMySubscriptionResponse = SubscriptionActivated

// request of checkout for subscribe plan
export interface CheckoutForSubscribePlanRequest {
  planId: Plan["_id"];
  planDuration: SubscriptionValidity
}