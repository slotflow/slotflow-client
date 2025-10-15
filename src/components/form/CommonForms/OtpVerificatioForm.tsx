import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { formatTime } from "@/utils/helper";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { FormButton, FormHeading } from "../FormSplits";
import { verifyOtpZodSchema } from "@/utils/zod/authZod";
import { resendOtp, verifyOtp } from "@/utils/apis/auth.api";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { stopTimer, updateTimer } from "@/utils/redux/slices/signFormSlice";
import { useAuthNavigation } from "@/utils/hooks/systemHooks/useAuthNavigation";
import { AuthFormType, OtpVerificatioFormProps, OtpVerificationFormData, OtpVerificationUseSelector } from "@/utils/interface/commonInterface";

const OtpVerificatioForm: React.FC<OtpVerificatioFormProps> = ({ role }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { goToAuthPage } = useAuthNavigation();
    const authUser = useSelector((store: RootState) => store.auth.authUser);
    const { otpRemainingTime, otpTimerIsRunning, loading, forgotPassword }: OtpVerificationUseSelector = useSelector((store: RootState) => store.signform);

    const verificationToken: string | undefined = authUser?.verificationToken;
    const [resentLoading, setResendLoading] = useState(false);

    const {
        handleSubmit,
        watch,
        setValue, formState: { errors }
    } =
        useForm<OtpVerificationFormData>({
            resolver: zodResolver(verifyOtpZodSchema),
            defaultValues: {
                otp: "",
            },
            mode: "onChange",
        });

    const otpValue = watch("otp");

    useEffect(() => {
        if (otpTimerIsRunning) {
            const interval = setInterval(() => dispatch(updateTimer()), 1000);
            return () => clearInterval(interval);
        }
    }, [otpTimerIsRunning, dispatch]);

    const onSubmit = async (data: OtpVerificationFormData) => {
        if (!verificationToken || !role) {
            toast.error("Something went wrong. Try again.");
            return;
        }

        try {
            const res = await dispatch(verifyOtp({ otp: data.otp, verificationToken, role })).unwrap();
            if (res.success) {
                toast.success(res.message);
                dispatch(stopTimer());
                if (forgotPassword) goToAuthPage(role, AuthFormType.RESET_PASSWORD);
                else goToAuthPage(role, AuthFormType.LOGIN);
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("An error occurred during OTP verification.");
        }
    };

    const handleResendOtp = async () => {
        if (!verificationToken || !role) return;
        console.log("verificationToken : ", verificationToken);
        console.log("role : ", role);
        setResendLoading(true);
        try {
            const res = await dispatch(resendOtp({ verificationToken, role })).unwrap();
            console.log("res : ", res);
            if (res.success) toast.success(res.message);
            else toast.error(res.message);
        } catch {
            toast.error("An error occurred while resending OTP.");
        } finally {
            setResendLoading(false);
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
                                    <Input
                                        key={i}
                                        type="text"
                                        maxLength={1}
                                        className="w-12 h-12 text-center text-lg font-medium"
                                        value={otpValue[i] || ""}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/, "");
                                            const otpArray = otpValue.split("");
                                            otpArray[i] = val;
                                            setValue("otp", otpArray.join(""));
                                            if (val && i < 5) {
                                                const nextInput = document.getElementById(`otp-${i + 1}`);
                                                nextInput?.focus();
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
                                ))}
                            </div>
                            {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}

                            <FormButton text="Verify" loading={loading} />
                        </form>

                        <p className="mt-6 flex justify-between text-xs md:text-sm/6 text-[var(--textTwo)] px-2">
                            <span
                                className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
                                onClick={() => goToAuthPage(role, AuthFormType.LOGIN)}
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerificatioForm;
