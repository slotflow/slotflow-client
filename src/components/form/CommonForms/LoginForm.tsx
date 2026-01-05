import FormField from "../FormField";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import GoogleButton from "../GoogleButton";
import { useDispatch, } from "react-redux";
import { signin } from "@/utils/apis/auth.api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/utils/redux/appStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormButton, FormHeading } from "../FormSplits";
import { handleGoogleLogin } from "@/utils/helper/googleLogin";
import { setForgotPassword } from "@/utils/redux/slices/appSlice";
import { LoginFormType, LoginZodSchema } from '@/utils/zod/authZod';
import { useAuthNavigation } from "@/utils/hooks/systemHooks/useAuthNavigation";
import { RedirectTo, LoginFormProps } from "@/utils/interface/commonInterface";
import { Role } from "@/utils/interface/enums";

const LoginForm: React.FC<LoginFormProps> = ({ isAdmin, role }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { goToAuthPage } = useAuthNavigation();

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

    const handleNavigation = (userRole: Role) => {
        console.log("navigating role : ",userRole);
        if (userRole === Role.Admin) navigate("/admin/overview", { replace: true });
        else if (userRole === Role.User) navigate("/user", { replace: true });
        else if (userRole === Role.Provider) navigate("/provider", { replace: true });
    };

    const onSubmit = async (data: LoginFormType) => {
        try {
            const res = await dispatch(signin({ ...data, role })).unwrap();
            if (res.success) {
                toast.success(res.message);
                handleNavigation(res.data.role);
            } else toast.error(res.message);
        } catch (error) {
            if (import.meta.env.DEV) console.log("An error occurred during login ", error);
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
                                    variant="link"
                                    className="px-0 block text-xs md:text-sm font-medium text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
                                    onClick={() => {
                                        dispatch(setForgotPassword(true));
                                        goToAuthPage(role, RedirectTo.VERIFY_EMAIL)
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
                            onClick={(e) => handleGoogleLogin({ e, role })}
                            text="Sign up with Google"
                        />

                        {!isAdmin && (
                            <p className="mt-10 text-center text-sm text-[var(--textOne)] hover:text-[var(--textOneHover)]">
                                New to Slotflow ?
                                <span
                                    className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
                                    onClick={() => goToAuthPage(role, RedirectTo.REGISTER)}
                                >
                                    {" "} Sign Up
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;