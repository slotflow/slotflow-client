import { Plan } from "../entityInterface/planInterface";

// type for admin fetch all plans api
export type AdminFetchAllPlansResponse = Pick<Plan, "_id" | "planName" | "isBlocked" | "price" | "maxBookingPerMonth" | "adVisibility">;

// type for create plan api
export type CreatePlanRequest = Pick<Plan, 'planName' | 'description' | 'price' | 'features' | "maxBookingPerMonth" | "adVisibility">;

// type for change plan block status api
export type ChangePlanBlockStatusRequest = {
    planId: Plan["_id"];
    isBlocked: Plan["isBlocked"];
}

// type for provider fetch plans api
export type ProviderFetchPlansResponse = Array<Pick<Plan, "_id" | "planName" | "price" | "features" | "description">>;
