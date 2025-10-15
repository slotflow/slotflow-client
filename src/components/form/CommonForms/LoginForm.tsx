import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import GoogleButton from "../GoogleButton";
import { useDispatch, } from "react-redux";
import { signin } from "@/utils/apis/auth.api";
import { useNavigate } from "react-router-dom";
import InputField from "../InputFieldWithLable";
import { Button } from "@/components/ui/button";
import { LoginZodSchema } from '@/utils/zod/authZod';
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch } from "@/utils/redux/appStore";
import { FormButton, FormHeading } from "../FormSplits";
import { handleGoogleLogin } from "@/utils/helper/googleLogin";
import { useAuthNavigation } from "@/utils/hooks/systemHooks/useAuthNavigation";
import { AuthFormType, LoginFormData, LoginFormProps } from "@/utils/interface/commonInterface";

const LoginForm: React.FC<LoginFormProps> = ({ isAdmin, role }) => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { goToAuthPage } = useAuthNavigation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(LoginZodSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const handleNavigation = (userRole: string) => {
        if (userRole === "ADMIN") navigate("/admin/overview", { replace: true });
        else if (userRole === "USER") navigate("/user", { replace: true });
        else if (userRole === "PROVIDER") navigate("/provider/dashboard", { replace: true });
    };

    const onSubmit = async (data: LoginFormData) => {
        try {
            const res = await dispatch(signin({ ...data, role })).unwrap();
            if (res.success) {
                if (res.authUser.isBlocked) {
                    toast.error("Your account is blocked, please contact us");
                    return;
                }
                toast.success(res.message);
                handleNavigation(res.authUser.role);
            } else toast.error(res.message);
        } catch {
            toast.error("An error occurred during login");
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
                                <InputField<LoginFormData>
                                    label="Email address"
                                    id="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    type="email"
                                    required
                                    register={register}
                                    error={errors.email?.message}
                                />

                                <InputField<LoginFormData>
                                    label="Password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    required
                                    isPassword
                                    register={register}
                                    error={errors.password?.message}
                                />


                                <Button
                                    variant="link"
                                    className="px-0 block text-xs md:text-sm font-medium text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
                                    onClick={() => goToAuthPage(role, AuthFormType.VERIFY_EMAIL)}
                                >
                                    Forgot Password ?
                                </Button>

                                <FormButton text="Sign In" loading={isSubmitting} />
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
                                    onClick={() => goToAuthPage(role, AuthFormType.REGISTER)}
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