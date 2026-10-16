import z from 'zod';
import { strongPasswordRegex, usernameRegex } from './regex';

// Signup Schema
export const signupZodSchema = z
  .object({
    email: z.string().email('Invalid email'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password cannot exceed 50 characters')
      .regex(strongPasswordRegex, 'Password must contain uppercase, lowercase, number & symbol'),

    confirmPassword: z
      .string()
      .min(8, 'Confirm Password must be at least 8 characters')
      .max(50, 'Confirm Password cannot exceed 50 characters')
      .regex(
        strongPasswordRegex,
        'Confirm Password must contain uppercase, lowercase, number & symbol',
      ),
    timeZone: z.object({
      value: z.string(),
      label: z.string(),
      offset: z.number(),
      abbrev: z.string(),
      altName: z.string(),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type SignupFormType = z.infer<typeof signupZodSchema>;

// Login Schema
export const LoginZodSchema = z.object({
  email: z.string().email('Invalid email'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password cannot exceed 50 characters')
    .regex(strongPasswordRegex, 'Invalid Password'),
});

export type LoginFormType = z.infer<typeof LoginZodSchema>;

// Verify OTP Schema
export const verifyOtpZodSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 digits'),
});

export type VerifyOtpFormType = z.infer<typeof verifyOtpZodSchema>;

// Reset Password Schema
export const resetPasswordZodSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password cannot exceed 50 characters')
      .regex(strongPasswordRegex, 'Invalid Password'),

    confirmPassword: z
      .string()
      .min(8, 'Confirm Password must be at least 8 characters')
      .max(50, 'Confirm Password cannot exceed 50 characters')
      .regex(strongPasswordRegex, 'Invalid Confirm Password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormType = z.infer<typeof resetPasswordZodSchema>;

// Verify Email Schema
export const verifyEmailZodSchema = z.object({
  email: z.string().email('Invalid email'),
});

export type VerifyEmailFormType = z.infer<typeof verifyEmailZodSchema>;

export const usernameSchema = z.object({
  username: z
    .string()
    .min(4, 'Username must be at least 4 characters')
    .max(30, 'Username cannot exceed 30 characters')
    .regex(usernameRegex, 'Only letters, numbers, spaces and underscores allowed'),
});

export type UsernameFormData = z.infer<typeof usernameSchema>;
