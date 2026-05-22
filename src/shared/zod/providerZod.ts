import z from "zod";
import { ServiceCategory, ServiceMode, ServiceType, SubscriptionValidity } from "../interface/enums";
import { serviceExperienceRegex, serviceDescriptionRegex, serviceNameRegex, objectIdRegex } from "./regex";

export const providerCreateServiceDetailsZodSchema = z.object({
  _id: z.string(),
  
  serviceCategory: z.nativeEnum(ServiceCategory),
  
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

  serviceExperienceYears: z.number().min(0).max(80),

  serviceExperience: z
    .string()
    .min(1, "Experience must be at least 1 character")
    .max(500, "Experience cannot exceed 500 characters")
    .regex(
      serviceExperienceRegex,
      "Invalid experience. Only alphanumeric characters, spaces, and symbols allowed (1–500 chars)."
    ),

  serviceId: z.string().regex(objectIdRegex, "Invalid serviceId"),

  serviceType: z.nativeEnum(ServiceType),

  serviceMode: z.nativeEnum(ServiceMode),

 tags: z
  .array(z.string())
  .optional(),

   maxParticipants: z
    .number()
    .min(1, "At least 1 participant required")
    .max(500, "Cannot exceed 500 participants")
    .optional(),

  isGroupService: z.boolean().optional(),

   requirements: z
    .array(
      z.string().max(200, "Each requirement cannot exceed 200 characters")
    )
    .max(10, "You can add at most 10 requirements")
    .optional(),

  videoUrl: z.union([
    z.string().url("Invalid video URL"),
    z.literal(""),
  ]).optional(),

  portfolioUrl: z.union([
    z.string().url("Invalid portfolio URL"),
    z.literal(""),
  ]).optional(),
});

export type ProviderCreateServiceDetailsFormType = z.infer<  typeof providerCreateServiceDetailsZodSchema>;


export const providerServiceAvailabilityZodSchema = z.object({
  day: z.string().min(1, "Day is required"),
  isAvailable: z.boolean(),
  duration: z.number().optional(),
  startTime: z.date().optional(),
  endTime: z.date().optional(),
  modes: z.array(z.string()).optional(),
  timeSlots: z.array(z.string()).optional(),
  selectedTimeSlots: z.array(z.string().min(1).max(30).regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/)).optional(),
});

export type ProviderServiceAvailabilityFormType = z.infer<typeof providerServiceAvailabilityZodSchema>;


export const imageFileZodeSchema = z.object({
  file: z
     .instanceof(File || undefined)
    .refine((file) => !!file, "Identity proof is required")
    .refine(
      (file) =>
        ["image/png", "image/jpeg", "image/jpg"].includes(file?.type),
      "Only PNG, JPG, or JPEG files are allowed"
    )
    .refine(
      (file) => file?.size <= 2 * 1024 * 1024,
      "File must be less than 2MB"
    ),
});

export type ImageFileFormType = z.infer<typeof imageFileZodeSchema>;


export const QueryZodSchema = z.object({
    query: z
      .string()
      .min(5, "Query must be at least 5 characters long")
      .max(500, "Query is too long"),
  });

export type QueryFormType = z.infer<typeof QueryZodSchema>;


export const planDurationZodSchema = z.object({
  planDuration: z.nativeEnum(SubscriptionValidity),
});

export type PlanDurationFormType = z.infer<typeof planDurationZodSchema>;