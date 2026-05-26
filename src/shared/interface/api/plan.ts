import { Plan } from "../entityInterface/planInterface";

// response type of admin fetch all plans api
export type AdminFetchAllPlansResponse = Pick<Plan, "_id" | "planName" | "isBlocked" | "price" | "maxBookingPerMonth" | "adVisibility">;

// request type of create plan api
export type CreatePlanRequest = Pick<Plan, 'planName' | 'description' | 'price' | 'features' | "maxBookingPerMonth" | "adVisibility">;

// request type of change plan block status api
export type ChangePlanBlockStatusRequest = {
    planId: Plan["_id"];
    isBlocked: Plan["isBlocked"];
}

// response type of provider fetch plans api
export type ProviderFetchPlansResponse = Pick<Plan, "_id" | "planName" | "price" | "features" | "description">;
