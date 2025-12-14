import z from "zod";
import { strongPasswordRegex, usernameRegex } from "./regex";

// Signup Schema
export const signupZodSchema = z
  .object({
    username: z
      .string()
      .min(4, "Username must be at least 4 characters")
      .max(30, "Username cannot exceed 30 characters")
      .regex(usernameRegex, "Invalid Username format"),

    email: z.string().email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password cannot exceed 50 characters")
      .regex(strongPasswordRegex, "Password must contain uppercase, lowercase, number & symbol"),

    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters")
      .max(50, "Confirm Password cannot exceed 50 characters")
      .regex(strongPasswordRegex, "Confirm Password must contain uppercase, lowercase, number & symbol"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type SignupFormType = z.infer<typeof signupZodSchema>;


// Login Schema
export const LoginZodSchema = z.object({
  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password cannot exceed 50 characters")
    .regex(strongPasswordRegex, "Invalid Password"),
});

export type LoginFormType = z.infer<typeof LoginZodSchema>;


// Verify OTP Schema
export const verifyOtpZodSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits"),
});

export type VerifyOtpFormType = z.infer<typeof verifyOtpZodSchema>;


// Reset Password Schema
export const resetPasswordZodSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password cannot exceed 50 characters")
      .regex(strongPasswordRegex, "Invalid Password"),

    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters")
      .max(50, "Confirm Password cannot exceed 50 characters")
      .regex(strongPasswordRegex, "Invalid Confirm Password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormType = z.infer<typeof resetPasswordZodSchema>;


// Verify Email Schema
export const verifyEmailZodSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type VerifyEmailFormType = z.infer<typeof verifyEmailZodSchema>;
