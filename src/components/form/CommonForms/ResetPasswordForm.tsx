import FormField from "../FormField";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appConfig } from "@/shared/config/env";
import { updatePassword } from "@/shared/apis/auth";
import { AppDispatch } from "@/shared/redux/appStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormButton, FormHeading } from "../FormSplits";
import { redirectPaths } from "@/shared/utils/constants";
import { setForgotPassword } from "@/shared/redux/slices/appSlice";
import { ResetPasswordFormType, resetPasswordZodSchema } from "@/shared/zod/authZod";

const ResetPasswordForm: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm<ResetPasswordFormType>({
        resolver: zodResolver(resetPasswordZodSchema),
        mode: "onChange",
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: ResetPasswordFormType) => {

        try {
            const res = await dispatch(updatePassword({
                password: data.password,
            })).unwrap();

            if (res.success) {
                toast.success(res.message);
                navigate(redirectPaths.LOGIN);
                dispatch(setForgotPassword(false));
            }
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.log("An error occurred while updating password.", error);
            } 
        }
    };

    const passwordValue = watch("password");

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="p-8">
                    <FormHeading title="Reset Password" description="Enter new credentials carefully" />

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            <FormField<ResetPasswordFormType>
                                label="Password"
                                id="password"
                                placeholder="Enter new password"
                                type="password"
                                required={true}
                                showTogglePassword
                                register={register}
                                error={errors.password?.message}
                            />
                            <FormField<ResetPasswordFormType>
                                label="Confirm Password"
                                id="confirmPassword"
                                placeholder="Confirm new password"
                                type="password"
                                required={true}
                                showTogglePassword
                                register={register}
                                error={
                                    errors.confirmPassword?.message ??
                                    (watch("confirmPassword") !== passwordValue ? "Passwords do not match" : undefined)
                                }
                            />

                            <FormButton text="Update" loading={isSubmitting} disabled={isSubmitting || !isValid} />
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

export default ResetPasswordForm;
