import z from "zod";
import { descriptionRegex, planNameRegex, appServiceNameRegex } from "./regex";
import { serviceCategoryArray } from "../constants";

// Admin Create Plan Schema
export const adminCreatePlanZodSchema = z.object({
  planName: z
    .string()
    .min(4, "Plan name must be at least 4 characters")
    .max(20, "Plan name cannot exceed 20 characters")
    .regex(
      planNameRegex,
      "Invalid plan name. Only alphabets and spaces are allowed, length between 4 and 20."
    ),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description cannot exceed 200 characters")
    .regex(
      descriptionRegex,
      "Invalid description. Contains unsupported characters."
    ),

  price: z
    .number({
      invalid_type_error: "Price must be a number",
    })
    .min(0, "Price cannot be negative")
    .max(100000, "Price cannot exceed 100000"),

  features: z
    .array(
      z
        .string()
        .min(1, "Feature must be at least 1 character")
        .max(50, "Feature cannot exceed 50 characters")
    )
    .min(1, "At least one feature is required")
    .max(10, "Maximum 10 features allowed"),

  maxBookingPerMonth: z
    .number({
      invalid_type_error: "Maximum booking must be a number",
    })
    .min(0, "Max booking cannot be negative")
    .max(10000, "Max booking cannot exceed 10000"),

  adVisibility: z.boolean({
    invalid_type_error: "Ad visibility must be true or false",
  }),
});

export type AdminCreatePlanForm = z.infer<typeof adminCreatePlanZodSchema>;


// Admin Create Service Schema
export const adminCreateServiceZodSchema = z.object({
  serviceName: z
    .string()
    .min(4, "Service name must be at least 4 characters")
    .max(50, "Service name cannot exceed 50 characters")
    .regex(
      appServiceNameRegex,
      "Service name can only contain letters, numbers, and spaces"
    ),
  serviceCategory: z.enum(serviceCategoryArray),
});

export type AdminCreateServiceForm = z.infer<typeof adminCreateServiceZodSchema>;
