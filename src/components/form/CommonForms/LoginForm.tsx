import FormField from "../FormField";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import GoogleButton from "../GoogleButton";
import { useDispatch, } from "react-redux";
import { signin } from "@/shared/apis/auth";
import { useNavigate } from "react-router-dom";
import { Role } from "@/shared/interface/enums";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/shared/redux/appStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormButton, FormHeading } from "../FormSplits";
import { appConfig, serviceConfig } from "@/shared/config/env";
import { setForgotPassword } from "@/shared/redux/slices/appSlice";
import { LoginFormType, LoginZodSchema } from '@/shared/zod/authZod';
import { redirectPaths } from "../../../shared/utils/constants";
import { SigninResponse } from "@/shared/interface/api/auth";

const LoginForm: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<LoginFormType>({
        resolver: zodResolver(LoginZodSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const handleNavigation = (data: SigninResponse["data"]) => {
        if (data.role === Role.ADMIN) {
            navigate("/admin/dashboard", { replace: true });
            return;
        }

        if (!data.hasSelectedRole) {
            navigate("/onboarding/role-select", { replace: true });
            return;
        }

        if (!data.isOnboardingCompleted) {
            // Granular redirect to the correct onboarding step
            if (!data.isAddressAdded && !data.isAddressVerified) {
                navigate("/onboarding/address", { replace: true });
            } else if (!data.isServiceDetailsAdded && !data.isServiceDetailsVerified) {
                navigate("/onboarding/service", { replace: true });
            } else if (!data.isServiceAvailabilityAdded && !data.isAvailabilityVerified) {
                navigate("/onboarding/availability", { replace: true });
            } else if (!data.isProofSubmitted && !data.isProofsVerified) {
                navigate("/onboarding/proofs", { replace: true });
            } else if (!data.isAdminVerified) {
                navigate("/onboarding/pending", { replace: true });
            } else {
                navigate("/onboarding/address", { replace: true }); // fallback
            }
            return;
        }

        if (data.role === Role.USER) {
            navigate("/user", { replace: true });
        } else if (data.role === Role.PROVIDER) {
            navigate("/provider", { replace: true });
        }
    };

    const handleGoogleLogin = ({ e }: { e: React.MouseEvent<HTMLButtonElement, MouseEvent> }) => {
        try {
            e.preventDefault();;
            window.location.href = `${serviceConfig.apiGatewayUrl + appConfig.version}/auth/google`;
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.error("Google login error:", error);
            }
            toast.error("Failed to initiate Google login");
        }
    }

    const onSubmit = async (data: LoginFormType) => {
        try {
            const res = await dispatch(signin({ ...data })).unwrap();
            if (res.success) {
                toast.success(res.message);
                handleNavigation(res.data);
            } else toast.error(res.message);
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.log("An error occurred during login ", error);
            }
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="p-8">
                    <FormHeading title="Sign In" description="Sign In with your credentials" />
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            <fieldset disabled={isSubmitting} className="space-y-3">
                                <FormField<LoginFormType>
                                    label="Email Address"
                                    id="email"
                                    placeholder="Enter email address"
                                    type="email"
                                    register={register}
                                    error={errors.email?.message}
                                    required={true}
                                />

                                <FormField<LoginFormType>
                                    label="Password"
                                    id="password"
                                    placeholder="Enter password"
                                    type="password"
                                    showTogglePassword
                                    register={register}
                                    error={errors.password?.message}
                                    required={true}
                                />

                                <Button
                                    title="Forgot Password"
                                    variant="link"
                                    className="px-0 block text-xs md:text-sm font-medium text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
                                    onClick={() => {
                                        dispatch(setForgotPassword(true));
                                        navigate(redirectPaths.VERIFY_EMAIL);
                                    }}
                                >
                                    Forgot Password ?
                                </Button>

                                <FormButton text="Sign In" loading={isSubmitting} disabled={isSubmitting || !isValid} />
                            </fieldset>
                        </form>

                        <div className="flex items-center my-4">
                            <div className="flex-grow border-t"></div>
                            <span className="mx-3 text-sm text-[var(--textTwo)]">OR CONTINUE WITH</span>
                            <div className="flex-grow border-t"></div>
                        </div>

                        <GoogleButton
                            onClick={(e) => handleGoogleLogin({ e })}
                            text="Sign up with Google"
                        />

                        <p className="mt-10 text-center text-sm text-[var(--textOne)] hover:text-[var(--textOneHover)]">
                            New to Slotflow ?
                            <span
                                className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
                                onClick={() => navigate(redirectPaths.REGISTER)}
                            >
                                {" "} Sign Up
                            </span>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;