import { useDispatch } from 'react-redux';
import { Eye, EyeOff } from 'lucide-react';
import React, { memo, useState } from 'react';
import { AppDispatch } from '@/utils/redux/appStore';
import { CustomValidator, Validator } from '@/utils/validator';
import { InputFieldProps } from '@/utils/interface/commonInterface';
import { setForgotPassword, setResetPasswordForm, setsignInForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm } from '@/utils/redux/slices/signFormSlice';

const InputField: React.FC<InputFieldProps> = memo(({
    label, id, placeholder, type, value, onChange, required, isPassword = false, forgotPassword, onHasError
}) => {

    const dispatch = useDispatch<AppDispatch>();

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [passwordStrength, setPasswordStrength] = useState<number | null>(null);

    const togglePasswordVisibility = (): void => {
        setPasswordVisible(!passwordVisible);
    };

    const validateInput = (inputValue: string) => {
        if (!inputValue) {
            setErrorMessage(null);
            onHasError?.(false);
            return;
        }

        try {

            if (["username", "email", "password", "confirmPassword", "otp"].includes(id)) {
                const result = CustomValidator.validator(id, inputValue);

                if (result) {
                    setErrorMessage(result.message ?? null);
                    onHasError?.(!result.status);
                    if (result.point) setPasswordStrength(result.point);
                } else {
                    setErrorMessage(null);
                    onHasError?.(false);
                    setPasswordStrength(null);
                }
                return;
            }

            
            if (id === 'appServiceName') {
                Validator.validateAppServiceName(inputValue);
            } else if (id === "planName") {
                Validator.validatePlanName(inputValue);
            } else if (id === "description") {
                Validator.validatePlanDescription(inputValue);
            } else if (id === "price") {
                Validator.validatePlanPrice(Number(inputValue));
            } else if (id === "maxBookingPerMonth") {
                Validator.validatePlanMaxBookingPerMonth(Number(inputValue));
            } else if (id === "addressLine") {
                Validator.validateAddressLine(inputValue);
            } else if (id === "place") {
                Validator.validatePlace(inputValue);
            } else if (id === "city") {
                Validator.validateCity(inputValue);
            } else if (id === "state") {
                Validator.validateState(inputValue);
            } else if (id === "pincode") {
                Validator.validatePincode(inputValue)
            } else if (id === "district") {
                Validator.validateDistrict(inputValue);
            } else if (id === "country") {
                Validator.validateCountry(inputValue);
            } else if (id === "googleMapLink") {
                Validator.validateGoogleMapLink(inputValue);
            } else if (id === "serviceName") {
                Validator.validateServiceName(inputValue);
            } else if (id === "serviceDescription") {
                Validator.validateServiceDescription(inputValue);
            } else if (id === "servicePrice") {
                Validator.validateServicePrice(Number(inputValue));
            } else if (id === "providerExperience") {
                Validator.validateProviderExperience(inputValue);
            } else if (id === "providerAdhaar") {
                Validator.validateProviderAdhaar(inputValue);
            }
            setErrorMessage(null);
            onHasError?.(false);
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        validateInput(e.target.value);
    };

    const handleForgotPassword = (): void => {
        dispatch(setsignInForm(false));
        dispatch(setForgotPassword(true));
        dispatch(setVerifyEmailForm(true));
        dispatch(setSignUpForm(false));
        dispatch(setVerifyOtpForm(false));
        dispatch(setResetPasswordForm(false));
    }

    return (
        <div>
            <div className='flex justify-between'>
                <label htmlFor={id} className="block text-xs md:text-sm/6 font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                    {label}
                </label>
                {forgotPassword && (
                    <label htmlFor={id} className="block text-xs md:text-sm/6 font-medium text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={handleForgotPassword}>
                        Forgot Password ?
                    </label>
                )}
            </div>
            <div className="mt-2">
                <div className={`relative ${isPassword ? '' : ''}`}>
                    <input
                        id={id}
                        placeholder={placeholder}
                        name={id}
                        type={isPassword ? (passwordVisible ? 'text' : 'password') : type}
                        value={value}
                        onChange={handleInputChange}
                        required={required}
                        className={`block w-full rounded-md bg-[var(--inputBg)] px-2 py-2 md:px-3 md:py-2.5 text-[var(--textOne)] outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 text-sm md:text-[16px]
${(id === "password" || id === "confirmPassword") && passwordStrength !== null ?
                                passwordStrength <= 25 ? "focus:outline-red-500" :
                                    passwordStrength <= 50 ? "focus:outline-orange-500" :
                                        passwordStrength <= 75 ? "focus:outline-yellow-500" :
                                            passwordStrength === 100 ? "focus:outline-green-500" :
                                                ""
                                : "focus:outline-[var(--mainColor)]"}
`}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? <Eye /> : <EyeOff />}
                        </button>
                    )}
                </div>
                {errorMessage && (
                    <span className="text-[var(--error-color)] text-xs px-2 line-clamp-4">{errorMessage}</span>
                )}
            </div>
        </div>
    );
});

export default InputField;