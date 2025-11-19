import z from "zod";
import { booleanField, numberField, stringField } from "./commonZod";

// dmin adding new plan form zod schema
export const adminCreatePlanZodSchema = z.object({
    planName: stringField("PlanName", 4, 20, /^[a-zA-Z ]{4,20}$/, "Invalid plan name. Only alphabets and spaces are allowed, length between 4 and 20."),
    description: stringField("Plan description", 10, 200, /^[\w\d\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{10,200}$/, "Invalid description. Contains unsupported characters."),
    price: numberField("Plan price", 0, 100000),
    features: z.array(
        stringField("Feature", 1, 50)
    )
        .min(1, "At least one feature is required")
        .max(10, "Maximum 10 features allowed"),
    maxBookingPerMonth: numberField("Plan maximum booking", 0, 10000),
    adVisibility: booleanField("Plan adVisibility"),
});
export type AdminCreatePlanForm = z.infer<typeof adminCreatePlanZodSchema>;

// Admin adding new app service form zod schema
export const adminCreateServiceZodSchema = z.object({
    serviceName: stringField("Service name",4,50,/^[A-Za-z0-9 ]{4,50}$/,"Service name can only contain letters, numbers, and spaces"),
});

export type AdminCreateServiceForm = z.infer<typeof adminCreateServiceZodSchema>;