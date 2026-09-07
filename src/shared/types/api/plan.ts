import { Plan } from '../entity/planInterface';

// Fetch all plans ( by admin )
export type AdminFetchAllPlansResponse = Pick<
  Plan,
  | '_id'
  | 'planName'
  | 'isBlocked'
  | 'monthlyPrice'
  | 'yearlyPrice'
  | 'maxBookingPerMonth'
  | 'adVisibility'
  | 'stripeSync'
>;

// Create plan
export type CreatePlanRequest = Pick<
  Plan,
  | 'planName'
  | 'description'
  | 'monthlyPrice'
  | 'yearlyPrice'
  | 'features'
  | 'maxBookingPerMonth'
  | 'adVisibility'
  | 'hasTrial'
  | 'trialDays'
>;
export type CreatePlanResponse = Omit<Plan, 'createdAt' | 'updatedAt'>;

// Update plan
export type UpdatePlanRequest = Partial<
  Pick<
    Plan,
    | 'planName'
    | 'description'
    | 'monthlyPrice'
    | 'yearlyPrice'
    | 'features'
    | 'maxBookingPerMonth'
    | 'adVisibility'
    | 'hasTrial'
    | 'trialDays'
  >
> & {
  planId: Plan['_id'];
};
export type UpdatePlanResponse = Omit<Plan, 'createdAt' | 'updatedAt'>;

// Change plan block status
export type ChangePlanBlockStatusRequest = {
  planId: Plan['_id'];
} & Pick<Plan, 'isBlocked'>;
export type ChangePlanBlockStatusResponse = Pick<Plan, '_id' | 'isBlocked'>;

// Fetch plans ( by provider )
export type ProviderFetchPlansResponse = Pick<
  Plan,
  '_id' | 'planName' | 'monthlyPrice' | 'yearlyPrice' | 'features' | 'description'
>;

// Resync plan with stripe
export type ResyncPlanStripeRequest = {
  planId: Plan['_id'];
};
export type ResyncPlanStripeResponse = Pick<Plan, '_id' | 'stripePlanDetails' | 'stripeSync'>;

// Plan details
export interface AdminFetchPlanDetailsRequest {
  planId: Plan['_id'];
}
export type AdminFetchPlanDetailsResponse = Omit<Plan, 'createdAt' | 'updatedAt'>;
