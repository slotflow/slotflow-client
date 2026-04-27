import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { appConfig } from "@/shared/config/env";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatTime } from "@/shared/helper/formatter";
import { useDispatch, useSelector } from "react-redux";
import { FormButton, FormHeading } from "../FormSplits";
import { redirectPaths } from "@/shared/utils/constants";
import { resendOtp, verifyOtp } from "@/shared/apis/auth";
import { updateTimer } from "@/shared/redux/slices/appSlice";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { VerifyOtpFormType, verifyOtpZodSchema } from "@/shared/zod/authZod";

const OtpVerificatioForm: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { otpRemainingTime, otpTimerIsRunning, forgotPassword } = useSelector((store: RootState) => store.app);

    const [resentLoading, setResendLoading] = useState(false);

    const {
        handleSubmit,
        watch,
        register,
        setValue, formState: { errors, isSubmitting, isValid }
    } =
        useForm<VerifyOtpFormType>({
            resolver: zodResolver(verifyOtpZodSchema),
            mode: "onChange",
            defaultValues: {
                otp: "",
            },
        });

    const otpValue = watch("otp");

    useEffect(() => {
        if (otpTimerIsRunning) {
            const interval = setInterval(() => dispatch(updateTimer()), 1000);
            return () => clearInterval(interval);
        }
    }, [otpTimerIsRunning, dispatch]);

    const onSubmit = async (data: VerifyOtpFormType) => {
        try {
            const res = await dispatch(verifyOtp({ otp: data.otp })).unwrap();
            if (res.success) {
                toast.success(res.message);
                if (forgotPassword) {
                    navigate(redirectPaths.RESET_PASSWORD)
                } else {
                    navigate(redirectPaths.LOGIN)
                }
            }
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.log("An error occurred during OTP verification ", error);
            }
        }
    };

    const handleResendOtp = async () => {
        setResendLoading(true);
        try {
            const res = await dispatch(resendOtp()).unwrap();
            if (res.success) toast.success(res.message);
        } catch {
            if (appConfig.isDevelopment) {
                console.log("An error occurred while resending OTP.");
            }
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="p-8">
                    <FormHeading title="Verify OTP" description="Enter the OTP you have received" />
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="flex justify-between gap-2">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <React.Fragment key={i}>
                                        <input type="hidden" {...register("otp")} />
                                        <Input
                                            type="text"
                                            maxLength={1}
                                            className="w-12 h-12 text-center text-lg font-medium"
                                            value={otpValue[i] || ""}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/, "");

                                                const otpArray = otpValue.padEnd(6, " ").split("");
                                                otpArray[i] = val;

                                                const newOtp = otpArray.join("").replace(/ /g, "");
                                                setValue("otp", newOtp, { shouldValidate: true });

                                                if (val && i < 5) {
                                                    document.getElementById(`otp-${i + 1}`)?.focus();
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Backspace") {
                                                    if (!otpValue[i] && i > 0) {
                                                        const prevInput = document.getElementById(`otp-${i - 1}`);
                                                        prevInput?.focus();
                                                    }
                                                }
                                            }}
                                            onPaste={(e) => {
                                                e.preventDefault();
                                                const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
                                                const otpArray = otpValue.split("");
                                                for (let j = 0; j < paste.length; j++) {
                                                    otpArray[j] = paste[j];
                                                    const input = document.getElementById(`otp-${j}`);
                                                    if (input && input instanceof HTMLInputElement) {
                                                        input.value = paste[j];
                                                    }
                                                }
                                                setValue("otp", otpArray.join(""));
                                                const nextEmptyIndex = paste.length < 6 ? paste.length : 5;
                                                const nextInput = document.getElementById(`otp-${nextEmptyIndex}`);
                                                nextInput?.focus();
                                            }}
                                            id={`otp-${i}`}
                                        />
                                    </React.Fragment>
                                ))}
                            </div>
                            {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}

                            <FormButton text="Verify" loading={isSubmitting} disabled={isSubmitting || !isValid} />
                        </form>

                        <p className="mt-6 flex justify-between text-xs md:text-sm/6 text-[var(--textTwo)] px-2">
                            <span
                                className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
                                onClick={() => navigate(redirectPaths.LOGIN)}
                            >
                                Cancel
                            </span>

                            {resentLoading ? (
                                <span className="font-semibold text-[var(--mainColor)]">Sending...</span>
                            ) : otpTimerIsRunning ? (
                                <span className="text-center text-xs md:text-sm/6 text-[var(--textTwo)]">
                                    {formatTime(otpRemainingTime)}
                                </span>
                            ) : (
                                <span
                                    className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
                                    onClick={handleResendOtp}
                                >
                                    Resend OTP
                                </span>
                            )}
                        </p>
                        <Button
                            title="otp not recieved"
                            variant="link"
                            className="block text-xs md:text-sm font-medium text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer px-2"
                            onClick={() => {
                                navigate('/contact')
                            }}
                        >
                            Didn’t receive OTP?
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerificatioForm;
