import FormField from "../FormField";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appConfig } from "@/shared/config/env";
import { verifyEmail } from "@/shared/apis/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch } from "@/shared/redux/appStore";
import { FormButton, FormHeading } from "../FormSplits";
import { redirectPaths } from "@/shared/utils/constants";
import { VerifyEmailFormType, verifyEmailZodSchema } from "@/shared/zod/authZod";

const EmailVerificationForm: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<VerifyEmailFormType>({
        resolver: zodResolver(verifyEmailZodSchema),
        mode: "onChange",
        defaultValues: {
            email: ""
        },
    });

    const onSubmit = async (data: VerifyEmailFormType) => {
        try {
            const res = await dispatch(verifyEmail({ email: data.email })).unwrap();
            if (res.success) {
                // Navigate immediately for instant UX
                navigate("verify/otp");
                // Show toast after navigation (toast uses portal so still visible)
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.log("An error occurred during email verification ", error);
            }
            toast.error("An error occurred during email verification");
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="p-8">
                    <FormHeading title="Verify Email" description="An OTP will be sent to this email ID" />
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            <FormField<VerifyEmailFormType>
                                label="Email Address"
                                id="email"
                                placeholder="Enter your registered email"
                                type="email"
                                register={register}
                                error={errors.email?.message}
                                required={true}
                            />
                            <FormButton
                                text={isSubmitting ? "Verifying" : "Verify"}
                                loading={isSubmitting}
                                disabled={isSubmitting || !isValid}
                                title="Verify Email"
                            />
                        </form>

                        <p className="mt-6 flex justify-between text-xs md:text-sm/6 text-[var(--textTwo)] px-2">
                            <span
                                className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
                                onClick={() => navigate(redirectPaths.LOGIN)}
                            >
                                Cancel
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationForm;
