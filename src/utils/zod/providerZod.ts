import z from "zod";
import { stringField } from "./commonZod";

// Provider add service details controller zod schema
export const providerAddServiceDetailsZodSchema = z.object({
    serviceName: stringField("Service name", 4, 50, /^[A-Za-z ]{4,50}$/, "Invalid service name. Service name should contain only alphabets and spaces and be between 4 and 50 characters."),
    serviceDescription: stringField("Service description", 10, 500, /^[\w\d !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{10,500}$/, "Invalid service description. Service description should contain alphanumeric characters, spaces, and special characters, and be between 10 and 500 characters."),
    servicePrice: z.preprocess(
        (val) => {
            if (typeof val === "string" && val.trim() !== "") return Number(val);
            return val;
        },
        z.number({
            required_error: "Service price is required",
            invalid_type_error: "Service price must be a number",
        })
            .min(1, "Service price must be at least 1")
            .max(1000000, "Service price must be at most 1000000")
    ),
    providerAdhaar: stringField("Service provider adhaar number", 6, 6, /^\d{6}$/, "Invalid adhaar number. Please enter exactly 6 digits."),
    providerExperience: stringField("Service provider experience", 1, 500, /^[\w\d !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{1,500}$/, "Invalid experience. Provider experience should contain alphanumeric characters, spaces, and special characters, and be between 1 and 500 characters."),
    serviceCategory: stringField("Service Category ID"),
});