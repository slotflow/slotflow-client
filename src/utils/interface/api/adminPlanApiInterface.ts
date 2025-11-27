import { Plan } from "../entityInterface/planInterface";


// ****  Used as the response type of admin fetch all plans api
export type AdminFetchAllPlansResponse = Pick<Plan, "_id" | "planName" | "isBlocked" | "price" | "maxBookingPerMonth" | "adVisibility">;


// **** Used as the request type of admin add new plan api
export type AdminAddNewPlanRequest = Pick<Plan,'planName' | 'description' | 'price' | 'features' | "maxBookingPerMonth" | "adVisibility">;



// **** Used as the request type of admin change plan block status api
export type AdminChangePlanBlockStatusRequest = {
    planId: Plan["_id"];
    isBlocked: Plan["isBlocked"];
}
