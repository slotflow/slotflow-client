import z from "zod";
import { Role } from "../interface/commonInterface";

// String field zod validation
export const stringField = (
  fieldName = "Value",
  min?: number,
  max?: number,
  regex?: RegExp,
  regexMessage = "Invalid format"
) => {
  let schema = z.string({
    required_error: `${fieldName} is required`,
    invalid_type_error: `${fieldName} must be a string`,
  });

  if (min !== undefined) {
    schema = schema.min(min, `${fieldName} must be at least ${min} characters`);
  }

  if (max !== undefined) {
    schema = schema.max(max, `${fieldName} must be at most ${max} characters`);
  }

  if (regex !== undefined) {
    schema = schema.regex(regex, regexMessage);
  }

  return schema;
};

// Number field zod validation
export const numberField = (
  fieldName = "Value",
  min?: number,
  max?: number
) => {
  let schema = z.number({
    required_error: `${fieldName} is required`,
    invalid_type_error: `${fieldName} must be a number`
  });

  if (min !== undefined) {
    schema = schema.min(min, `${fieldName} must be at least ${min}`);
  }

  if (max !== undefined) {
    schema = schema.max(max, `${fieldName} must be at most ${max}`);
  }

  return schema;
};

// Boolean field zod validation
export const booleanField = (fieldName = "Boolean") =>
  z.boolean().refine(val => typeof val === 'boolean', {
    message: `${fieldName} status must be boolean`,
  });

export const emailField = z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
}).email("Invalid email format");

export const passwordField = z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string"
})
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,50}$/,
        "Invalid password"
    );

export const roleField = z.enum([Role.user, Role.provider, Role.admin] as const, {
    required_error: "Role is required",
    invalid_type_error: "Invalid role"
});

export const limitedRoleField = z.enum([Role.user, Role.provider], {
    required_error: "Role is required",
    invalid_type_error: "Invalid role"
});

export const usernameField = z.string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string"
})
    .min(4, "Username must be at least 4 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z ]{4,30}$/, "Invalid username");

export const otpField = z.string({
    required_error: "OTP is required",
    invalid_type_error: "OTP must be a string"
}).length(6, "OTP must be exactly 6 characters");


// User and Provider addess adding controllerz zod validation
export const AddAddressZodSchema = z.object({
  addressLine: stringField("AddressLine", 10, 150, /^[a-zA-Z0-9 .,#-]{10,150}$/, "Address line must be 10–150 characters long and can only include letters, numbers, spaces, and the symbols . , # -"),
  phone: stringField("Phone", 7, 20, /^\+?[0-9\s\-().]{7,20}$/, "Invalid phone number. Only digits, spaces, dashes (-), dots (.), parentheses (), and an optional + at the beginning are allowed. Length must be between 7 to 20 characters."),
  place: stringField("Place", 3, 50, /^[a-zA-Z .-]{3,50}$/, "Place name must be 3–50 characters long and can only include letters, spaces, dots, and hyphens"),
  city: stringField("City", 3, 50, /^[a-zA-Z ]{3,50}$/, "City must only contain letters and spaces"),
  district: stringField("District", 2, 50, /^[a-zA-Z ]{3,50}$/, "District must only contain letters and spaces"),
  pincode: stringField("pincode", 3, 12, /^[A-Za-z0-9\s-]{3,12}$/, "Invalid postal code"),
  state: stringField("State", 2, 50, /^[a-zA-Z ]{2,50}$/, "State must only contain letters and spaces"),
  country: stringField("Country", 2, 50, /^[a-zA-Z ]{2,50}$/, "Country must only contain letters and spaces"),
  googleMapLink: z.string({
    required_error: "Google Map link is required",
    invalid_type_error: "Google Map link must be a string",
  })
    .url("Invalid Google Map link"),
});