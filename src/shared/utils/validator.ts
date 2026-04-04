import { validateEmail, validateOtp, validatePassword, validateUsername } from '@codebymk/validator';

type ValidationResult =
    | null
    | { status: boolean, message?: string, point?: number };

export class CustomValidator {
    static validator(id: string, value: string | number): ValidationResult {
        switch (id) {
            case "username": {
                const { status, message } = validateUsername(
                    value as string,
                    {
                        minLength: 4,
                        maxLength: 30,
                        uppercase: true,
                        digits: false,
                        specialCharacters: false,
                        allowSpace: true,
                    }
                );
                return status ? null : { status, message };
            }

            case "email": {
                const { status, message } = validateEmail(value as string);
                return status ? null : { status, message };
            }

            case "password":
            case "confirmPassword": {
                const { status, message, point } = validatePassword(value as string, {
                    returnPoint: true,
                    minLength: 8,
                    maxLength: 50,
                    minDigits: 1,
                    minLowercase: 1,
                    minSpecialCharacter: 1,
                    minUppercase: 1,
                    pointsForLowercase: 25,
                    pointsForUppercase: 25,
                    pointsForDigits: 25,
                    pointsForSpecialCharacter: 25,
                });
                return status ? { status, point } : { status, message, point };
            }

            case "otp": {
                const { status, message } = validateOtp(value as string, {
                    length: 6
                });
                return status ? null : { status, message };
            }

            default:
                return { status: false, message: "No validation found" };
        }
    }
}