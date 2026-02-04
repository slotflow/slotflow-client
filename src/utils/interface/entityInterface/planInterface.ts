import { PlanName } from "../enums";

export interface Plan {
    _id: string;
    planName: PlanName;
    description: string;
    price: number;
    features: string[];
    maxBookingPerMonth: number;
    adVisibility: boolean;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
}

