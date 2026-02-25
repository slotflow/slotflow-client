import { Plan } from "../entityInterface/planInterface";
import { Subscription } from "../entityInterface/subscriptionInterface";

export interface FetchSubscriptionsQueryParams {
  providerId?: string;
}

export type FetchProviderSubscriptionsResponse = Pick<Subscription, "_id" | "startDate" | "endDate" | "subscriptionStatus"> & Pick<Plan, "planName">;

type SubscriptionProps = Pick<Subscription, "startDate" | "endDate" | "subscriptionStatus" | "createdAt">;
type PlanProps = Pick<Plan, "planName" | "price" | "adVisibility" | "maxBookingPerMonth">;
export interface FetchSubscriptionDetailsResponse extends SubscriptionProps {
  subscriptionPlanId: PlanProps,
}