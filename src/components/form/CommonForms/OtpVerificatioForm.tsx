import { toast } from "react-toastify";
import { formatTime } from "@/utils/helper";
import InputField from "../InputFieldWithLable";
import { useDispatch, useSelector } from "react-redux";
import { FormButton, FormHeading } from "../FormSplits";
import { UserData } from "@/utils/interface/sliceInterface";
import { resendOtp, verifyOtp } from "@/utils/apis/auth.api";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { ApiBaseResponse, HandleChangeFunction, OtpVerificationFormData, OtpVerificationUseSelector } from "@/utils/interface/commonInterface";
import { setResetPasswordForm, setsignInForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm, stopTimer, updateTimer } from "@/utils/redux/slices/signFormSlice";

const OtpVerificatioForm: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { otpRemainingTime, otpTimerIsRunning, loading, forgotPassword }: OtpVerificationUseSelector = useSelector((store: RootState) => store.signform);
    const authUser: UserData | null = useSelector((store: RootState) => store.auth.authUser);
    const [hasErrors, setHasErrors] = useState<boolean>(false);
    const [resentLoading, setResendLoading] = useState<boolean>(false);

    const role: string | null = authUser?.role || null;
    const verificationToken: string | undefined = authUser?.verificationToken;

    const [formData, setFormData] = useState<OtpVerificationFormData>({
        otp: ""
    });

    useEffect(() => {
        if (otpTimerIsRunning) {
            const interval = setInterval(() => {
                dispatch(updateTimer());
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [otpTimerIsRunning, dispatch]);

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
        if (verificationToken && role) {
            dispatch(verifyOtp({ otp: formData.otp, verificationToken, role }))
                .unwrap()
                .then((res: ApiBaseResponse) => {
                    if (res.success) {
                        toast.success(res.message);
                        dispatch(stopTimer());
                        if (forgotPassword) {
                            dispatch(setVerifyOtpForm(false));
                            dispatch(setResetPasswordForm(true));
                            dispatch(setSignUpForm(false));
                            dispatch(setsignInForm(false));
                            dispatch(setVerifyEmailForm(false));
                        } else {
                            dispatch(setVerifyOtpForm(false));
                            dispatch(setSignUpForm(false));
                            dispatch(setsignInForm(true));
                            dispatch(setVerifyEmailForm(false));
                            dispatch(setResetPasswordForm(false));
                        }
                    } else {
                        toast.error(res.message);
                    }
                })
                .catch((error) => toast.error(error || "An error occurred."));
        }
    }

    const handleCancel = (): void => {
        dispatch(setVerifyOtpForm(false));
        dispatch(setSignUpForm(false));
        dispatch(setsignInForm(true));
        dispatch(setVerifyEmailForm(false));
        dispatch(setResetPasswordForm(false));
    }

    const handleResendOtp = (): void => {
        if (verificationToken && role) {
            setResendLoading(true);
            dispatch(resendOtp({ verificationToken, role }))
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        setResendLoading(false);
                        toast.success(res.message);
                    } else {
                        toast.error(res.message);
                    }
                })
        }
    };

    const handleErrorChange = (hasError: boolean) => {
        setHasErrors(hasError);
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="p-8">
                    <FormHeading title={"Verify OTP"} description="Enter the otp you have recieved" />

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="space-y-3">

                            <InputField
                                label="Enter OTP"
                                id="otp"
                                placeholder="000000"
                                type="text"
                                value={formData.otp}
                                onChange={handleChange}
                                required={true}
                                onHasError={handleErrorChange}
                            />
                            <FormButton text={"Verify"} loading={loading} />

                        </form>

                        <p className="mt-6 flex justify-between text-xs md:text-sm/6 text-[var(--textTwo)] px-2">
                            <span className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={handleCancel}>Cencel</span>
                            {resentLoading ?
                                <span className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer">Sending</span>
                                :
                                otpTimerIsRunning ?
                                    <span className="text-center text-xs md:text-sm/6 text-[var(--textTwo)]">{formatTime(otpRemainingTime)}</span>
                                    :
                                    <span className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={handleResendOtp}>Resend OTP</span>
                            }
                        </p>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default OtpVerificatioForm