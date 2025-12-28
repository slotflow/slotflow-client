import z from "zod";
import { ServiceCategory, ServiceMode, ServiceType } from "../interface/enums";
import { serviceExperienceRegex, serviceDescriptionRegex, serviceNameRegex } from "./regex";

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

  serviceExperience: z
    .string()
    .min(1, "Experience must be at least 1 character")
    .max(500, "Experience cannot exceed 500 characters")
    .regex(
      serviceExperienceRegex,
      "Invalid experience. Only alphanumeric characters, spaces, and symbols allowed (1–500 chars)."
    ),

  service: z
    .string()
    .min(1, "Service Category ID is required")
    .max(100, "Service Category ID cannot exceed 100 characters"),

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
    .string()
    .max(500, "Requirements cannot exceed 500 characters")
    .optional(),

  videoUrl: z
    .string()
    .url("Invalid video URL")
    .optional(),
});

export type ProviderCreateServiceDetailsFormType = z.infer<  typeof providerCreateServiceDetailsZodSchema>;


export const providerServiceAvailabilityZodSchema = z.object({
  day: z.string(),
  duration: z.number().min(1, "Duration is required"),
  startTime: z.date(),
  endTime: z.date(),
  modes: z.array(z.string()),
  timeSlots: z.array(z.string()),
  selectedTimeSlots: z.array(z.string().min(1).max(30).regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/)),
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
  planDuration: z.string().min(1, "Please select a plan duration"),
});

export type PlanDurationFormType = z.infer<typeof planDurationZodSchema>;