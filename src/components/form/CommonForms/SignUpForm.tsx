import FormField from "../FormField";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import GoogleButton from "../GoogleButton";
import { signup } from "@/utils/apis/auth.api";
import { AppDispatch } from "@/utils/redux/appStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormButton, FormHeading } from "../FormSplits";
import { handleGoogleLogin } from "@/utils/helper/googleLogin";
import { SignupFormType, signupZodSchema } from "@/utils/zod/authZod";
import { useAuthNavigation } from "@/utils/hooks/systemHooks/useAuthNavigation";
import { AuthFormType, signUpFormProps } from "@/utils/interface/commonInterface";

const SignUpForm: React.FC<signUpFormProps> = ({ role }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { goToAuthPage } = useAuthNavigation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        watch,
    } = useForm<SignupFormType>({
        resolver: zodResolver(signupZodSchema),
        mode: "onChange",
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: SignupFormType) => {
        try {
            const res = await dispatch(signup({ ...data, role })).unwrap();
            if(res.success) {
                toast.success(res.message);
                goToAuthPage(role, AuthFormType.VERIFY_OTP);
            }
        } catch (error) {
            if(import.meta.env.DEV)console.log("An error occurred while sign up ",error);
        }
    };

    const passwordValue = watch("password");

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="p-8">
                    <FormHeading title={"Sign Up"} description="Sign Up with your credentials" />
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            <fieldset disabled={isSubmitting} className="space-y-3">
                                <FormField<SignupFormType>
                                    label="Username"
                                    id="username"
                                    placeholder="Enter username"
                                    type="text"
                                    required={true}
                                    register={register}
                                    error={errors.username?.message}
                                />

                                <FormField<SignupFormType>
                                    label="Email Address"
                                    id="email"
                                    placeholder="Enter email"
                                    type="email"
                                    required={true}
                                    register={register}
                                    error={errors.email?.message}
                                />

                                <FormField<SignupFormType>
                                    label="Password"
                                    id="password"
                                    placeholder="Enter password"
                                    type="password"
                                    showTogglePassword
                                    register={register}
                                    error={errors.password?.message}
                                    required={true}
                                />

                                <FormField<SignupFormType>
                                    label="Confirm Password"
                                    id="confirmPassword"
                                    placeholder="Confirm password"
                                    type="password"
                                    showTogglePassword
                                    register={register}
                                    error={
                                        errors.confirmPassword?.message ??
                                        (watch("confirmPassword") !== passwordValue ? "Passwords do not match" : undefined)
                                    }
                                    required={true}
                                />
                                <FormButton text={"Sign Up"} loading={isSubmitting} disabled={isSubmitting || !isValid} />
                            </fieldset>
                        </form>

                        <div className="flex items-center my-4">
                            <div className="flex-grow border-t"></div>
                            <span className="mx-3 text-sm text-[var(--textTwo)]">OR CONTINUE WITH</span>
                            <div className="flex-grow border-t"></div>
                        </div>

                        <GoogleButton
                            onClick={(e) => handleGoogleLogin({ e, role })}
                            text={"Sign in with Google"}
                        />

                        <p className="mt-10 text-center text-sm/6 text-[var(--textOne)] hover:text-[var(--textOneHover)]">
                            Already a Slotflow member?
                            <span
                                className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
                                onClick={() => goToAuthPage(role, AuthFormType.LOGIN)}
                            >
                                {" "}Sign In
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
