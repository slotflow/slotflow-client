import z from "zod";
import { emailField, otpField, passwordField, usernameField } from "./commonZod";

// Login Form zod schema
export const LoginZodSchema = z.object({
    email: emailField,
    password: passwordField,
});

// Signin Form zod schema
export const signupZodSchema = z.object({
    username: usernameField,
    email: emailField,
    password: passwordField,
    confirmPassword: passwordField,
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});

// Verify OTP Form zod schema
export const verifyOtpZodSchema = z.object({
    otp: otpField,
});

// Reset Password Form zod schema
export const resetPasswordZodSchema = z.object({
    password: passwordField,
    confirmPassword: passwordField,
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});

// Verify Email Form zod schema
export const verifyEmailZodSchema = z.object({
    email: emailField,
});