import { Plan } from '../entity/planInterface';

// response type of admin fetch all plans api
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

// request type of create plan api
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

// request type of change plan block status api
export type ChangePlanBlockStatusRequest = {
  planId: Plan['_id'];
  isBlocked: Plan['isBlocked'];
};

// response type of provider fetch plans api
export type ProviderFetchPlansResponse = Pick<
  Plan,
  '_id' | 'planName' | 'monthlyPrice' | 'yearlyPrice' | 'features' | 'description'
>;

// request type of resync plan stripe
export type ResyncPlanStripeRequest = {
  planId: Plan['_id'];
};

// request type of resync plan stripe
export type ResyncPlanStripeResponse = {
  planId: Plan['_id'];
  stripePlanDetails: Plan['stripePlanDetails'];
  stripeSync: Plan['stripeSync'];
};

// response type for plan details
export type AdminFetchPlanDetailsResponse = Omit<Plan, 'createdAt' | 'updatedAt'>;
