import z from "zod";
import { addressLineRegex, cityRegex, countryRegex, districtRegex, landMarkRegex, phoneRegex, pincodeRegex, placeRegex, stateRegex, strongPasswordRegex } from "./regex";

// Address Zod Schema (Final)
export const createAddressZodSchema = z.object({
  _id: z.string(),

  addressLine: z
    .string()
    .min(10, "Address line must be at least 10 characters")
    .max(150, "Address line cannot exceed 150 characters")
    .regex(
      addressLineRegex,
      "Address line must be 10–150 characters long and can include letters, numbers, spaces, and . , # -"
    ),

  landMark: z
    .string()
    .min(5, "Landmark line must be at least 5 characters")
    .max(150, "Landmark line cannot exceed 150 characters")
    .regex(
      landMarkRegex,
      "Landmark must be 5–150 characters long and can include letters, numbers, spaces, and . , # -"
    ),

  phone: z
    .string()
    .min(7, "Phone number must be at least 7 characters")
    .max(20, "Phone number cannot exceed 20 characters")
    .regex(
      phoneRegex,
      "Invalid phone number. Only digits, spaces, dashes (-), dots (.), parentheses (), and an optional + are allowed."
    ),

  place: z
    .string()
    .min(3, "Place must be at least 3 characters")
    .max(50, "Place cannot exceed 50 characters")
    .regex(placeRegex, "Place can only include letters, spaces, dots, and hyphens"),

  city: z
    .string()
    .min(3, "City must be at least 3 characters")
    .max(50, "City cannot exceed 50 characters")
    .regex(cityRegex, "City must only contain letters and spaces"),

  district: z
    .string()
    .min(3, "District must be at least 3 characters")
    .max(50, "District cannot exceed 50 characters")
    .regex(districtRegex, "District must only contain letters and spaces"),

  pincode: z
    .string()
    .min(3, "Postal code must be at least 3 characters")
    .max(12, "Postal code cannot exceed 12 characters")
    .regex(pincodeRegex, "Invalid postal code"),

  state: z
    .string()
    .min(2, "State must be at least 2 characters")
    .max(50, "State cannot exceed 50 characters")
    .regex(stateRegex, "State must only contain letters and spaces"),

  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country cannot exceed 50 characters")
    .regex(countryRegex, "Country must only contain letters and spaces"),

  countryCode: z
    .string()
    .min(2, "Country code must be at least 2 characters")
    .max(10, "Country code cannot exceed 50 characters"),

  location: z.object({
    type: z.literal("Point"),
    coordinates: z
      .tuple([z.number(), z.number()])
      .refine((arr) => arr.length === 2, "Coordinates must be [lon, lat]"),
  }),
});

export type CreateAddressFormType = z.infer<typeof createAddressZodSchema>;


export const userInfoZodSchema = z.object({
  username: z.string().min(1, "Username is required"),
  phone: z.string().min(1, "Phone number is required"),
});

export type UserInfoFormType = z.infer<typeof userInfoZodSchema>;


export const paymentModeZodSchema = z.object({
  serviceMode: z.string().min(1, "Please select a service mode"),
});

export type PaymentModeFormType = z.infer<typeof paymentModeZodSchema>;



export const updatePasswordSchema = z.object({
  currentPassword: z.string().regex(strongPasswordRegex, "Invalid current Password"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password cannot exceed 50 characters")
    .regex(strongPasswordRegex, "Password must contain uppercase, lowercase, number & symbol"),
  confirmPassword: z
    .string()
    .min(8, "Confirm Password must be at least 8 characters")
    .max(50, "Confirm Password cannot exceed 50 characters")
    .regex(strongPasswordRegex, "Confirm Password must contain uppercase, lowercase, number & symbol"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });;

export type UpdatePasswordFormType = z.infer<typeof updatePasswordSchema>;