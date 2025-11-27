import z from "zod";
import { adhaarRegex, providerExperienceRegex, serviceDescriptionRegex, serviceNameRegex } from "./regex";

// Provider add service details controller zod schema
export const providerAddServiceDetailsZodSchema = z.object({
  serviceName: z
    .string()
    .min(4, "Service name must be at least 4 characters")
    .max(50, "Service name cannot exceed 50 characters")
    .regex(
      serviceNameRegex,
      "Invalid service name. Only alphabets and spaces are allowed (4–50 characters)."
    ),

  serviceDescription: z
    .string()
    .min(10, "Service description must be at least 10 characters")
    .max(500, "Service description cannot exceed 500 characters")
    .regex(
      serviceDescriptionRegex,
      "Invalid service description. Only alphanumeric characters, spaces, and symbols are allowed (10–500 characters)."
    ),

  servicePrice: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() !== "") return Number(val);
      return val;
    },
    z
      .number({
        required_error: "Service price is required",
        invalid_type_error: "Service price must be a valid number",
      })
      .min(1, "Service price must be at least 1")
      .max(1_000_000, "Service price cannot exceed 1,000,000")
  ),

  providerAdhaar: z
    .string()
    .length(6, "Adhaar number must be exactly 6 digits")
    .regex(adhaarRegex, "Invalid adhaar number. Please enter exactly 6 digits."),

  providerExperience: z
    .string()
    .min(1, "Experience must be at least 1 character")
    .max(500, "Experience cannot exceed 500 characters")
    .regex(
      providerExperienceRegex,
      "Invalid experience. Only alphanumeric characters, spaces, and symbols allowed (1–500 chars)."
    ),

  serviceCategory: z
    .string()
    .min(1, "Service Category ID is required")
    .max(100, "Service Category ID cannot exceed 100 characters"),
});

export type ProviderAddServiceDetailsForm = z.infer<
  typeof providerAddServiceDetailsZodSchema
>;
