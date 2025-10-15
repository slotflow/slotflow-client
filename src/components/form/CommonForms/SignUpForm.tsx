import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import GoogleButton from "../GoogleButton";
import { signup } from "@/utils/apis/auth.api";
import InputField from "../InputFieldWithLable";
import { AppDispatch } from "@/utils/redux/appStore";
import { signupZodSchema } from "@/utils/zod/authZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormButton, FormHeading } from "../FormSplits";
import { handleGoogleLogin } from "@/utils/helper/googleLogin";
import { startTimer } from "@/utils/redux/slices/signFormSlice";
import { useAuthNavigation } from "@/utils/hooks/systemHooks/useAuthNavigation";
import { AuthFormType, SignUpFormData, signUpFormProps } from "@/utils/interface/commonInterface";

const SignUpForm: React.FC<signUpFormProps> = ({ role }) => {
    
    const dispatch = useDispatch<AppDispatch>();
    const { goToAuthPage } = useAuthNavigation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signupZodSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data: SignUpFormData) => {
        if (!role) {
            toast.error("Select your account type.");
            return;
        }

        if (data.password !== data.confirmPassword) {
            toast.error("Password mismatch");
            return;
        }

        try {
            const res = await dispatch(signup({ ...data, role })).unwrap();
            if (res.success) {
                toast.success(res.message);
                dispatch(startTimer(300));
                goToAuthPage(role, AuthFormType.VERIFY_OTP);
            } else toast.error(res.message);
        } catch(error) {
            console.log("error : ",error);
            toast.error("An error occurred during signup.");
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
                                <InputField<SignUpFormData>
                                    label="Username"
                                    id="username"
                                    name="username"
                                    placeholder="Midhun K Paniker"
                                    type="text"
                                    required
                                    register={register}
                                    error={errors.username?.message}
                                />

                                <InputField<SignUpFormData>
                                    label="Email address"
                                    id="email"
                                    name="email"
                                    placeholder="midhun@gmail.com"
                                    type="email"
                                    required
                                    register={register}
                                    error={errors.email?.message}
                                />

                                <InputField<SignUpFormData>
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

                                <InputField<SignUpFormData>
                                    label="Confirm Password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    type="password"
                                    required
                                    isPassword
                                    register={register}
                                    error={
                                        errors.confirmPassword?.message ??
                                        (watch("confirmPassword") !== passwordValue ? "Passwords do not match" : undefined)
                                    }
                                />
                                <FormButton text={"Sign Up"} loading={isSubmitting} />
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
