import { toast } from "react-toastify";
import InputField from "../InputFieldWithLable";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "@/utils/apis/auth.api";
import { FormButton, FormHeading } from "../FormSplits";
import { UserData } from "@/utils/interface/sliceInterface";
import React, { FormEvent, useCallback, useState } from "react";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { ApiBaseResponse, HandleChangeFunction, PasswordResetFormDataProps } from "@/utils/interface/commonInterface";
import { setForgotPassword, setResetPasswordForm, setsignInForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm } from "@/utils/redux/slices/signFormSlice";

const ResetPasswordForm: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    const loading: boolean = useSelector((store: RootState) => store.signform.loading);
    const authUser: UserData | null = useSelector((store: RootState) => store.auth.authUser);

    const role: string | null = authUser?.role || null;
    const verificationToken: string | undefined = authUser?.verificationToken;

    const [hasErrors, setHasErrors] = useState<boolean>(false);
    const [formData, setFormData] = useState<PasswordResetFormDataProps>({
        password: "",
        confirmPassword: "",
    });

    const handleChange = useCallback<HandleChangeFunction>((e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        setHasErrors(false);
    }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (hasErrors) {
            toast.error("Please fix the form errors.");
            return;
        }
        if (role && verificationToken) {
            dispatch(updatePassword({
                role,
                verificationToken,
                password: formData.password,
            }))
                .unwrap()
                .then((res: ApiBaseResponse) => {
                    if (res.success) {
                        toast.success(res.message);
                        dispatch(setForgotPassword(false));
                        dispatch(setResetPasswordForm(false));
                        dispatch(setsignInForm(true));
                        dispatch(setVerifyEmailForm(false));
                        dispatch(setVerifyOtpForm(false));
                        dispatch(setSignUpForm(false));
                    } else {
                        toast.error(res.message);
                    }
                })
                .catch((error) => {
                    toast.error(error || "An error occurred.");
                });
        }
    };

    const handleCancel = (): void => {
        dispatch(setResetPasswordForm(false));
        dispatch(setsignInForm(true));
        dispatch(setVerifyEmailForm(false));
        dispatch(setVerifyOtpForm(false));
        dispatch(setSignUpForm(false));
    }

    const handleErrorChange = (hasError: boolean) => {
        setHasErrors(hasError);
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="p-8">
                    <FormHeading title={"Reset Password"} description="Enter new credentials carefully" />

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="space-y-3">


                            <InputField
                                label="Password"
                                id="password"
                                placeholder="Enter your password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required={true}
                                isPassword={true}
                                onHasError={handleErrorChange}
                            />
                            <InputField
                                label="Confirm Password"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required={true}
                                isPassword={true}
                                onHasError={handleErrorChange}
                            />

                            <FormButton text={"Update"} loading={loading} />
                        </form>

                        <p className="mt-6 flex justify-between text-xs md:text-sm/6 text-[var(--textTwo)] px-2">
                            <span className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={handleCancel}>Cencel</span>
                        </p>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default ResetPasswordForm;