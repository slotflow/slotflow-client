import { toast } from "react-toastify";
import GoogleButton from "../GoogleButton";
import { signin } from "@/utils/apis/auth.api";
import { useNavigate } from "react-router-dom";
import InputField from "../InputFieldWithLable";
import { useDispatch, useSelector } from "react-redux";
import { FormButton, FormHeading } from "../FormSplits";
import { FormEvent, useCallback, useState } from "react";
import { handleGoogleLogin } from "@/utils/helper/googleLogin";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { HandleChangeFunction, LoginFormData, LoginFormProps } from "@/utils/interface/commonInterface";
import { setResetPasswordForm, setsignInForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm } from "@/utils/redux/slices/signFormSlice";


const LoginForm: React.FC<LoginFormProps> = ({ isAdmin, role }) => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const loading: boolean = useSelector((store: RootState) => store.signform.loading);
    const [hasErrors, setHasErrors] = useState<boolean>(false);

    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    const handleChange = useCallback<HandleChangeFunction>((e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        setHasErrors(false);
    }, []);

    const handleNavigation = (role: string) => {
        console.log("navigating");
        if (role === "ADMIN") navigate("/admin/overview", { replace: true });
        else if (role === "USER") navigate("/user", { replace: true });
        else if (role === "PROVIDER") navigate("/provider/dashboard", { replace: true });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (hasErrors) {
            toast.error("Please fix the form errors.");
            return;
        }
        if (role) {
            dispatch(signin({
                email: formData.email,
                password: formData.password,
                role
            }))
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        if (res.authUser.isBlocked) {
                            toast.error("Your account is blocked, please contact us");
                            return;
                        }
                        toast.success(res.message);
                        handleNavigation(res.authUser.role);
                    } else {
                        toast.error(res.message);
                    }
                })
                .catch((error) => toast.error(error || "An error occurred."));
            return;
        } else {
            toast.info("select your account type");
        }
    };

    const changeToSingUpForm = (): void => {
        dispatch(setSignUpForm(true));
        dispatch(setsignInForm(false));
        dispatch(setVerifyEmailForm(false));
        dispatch(setVerifyOtpForm(false));
        dispatch(setResetPasswordForm(false));
    };

    const handleErrorChange = (hasError: boolean) => {
        setHasErrors(hasError);
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="p-8">
                    <FormHeading title="Sign In" description="Sign In with your credentials" />
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <InputField
                                label="Email address"
                                id="email"
                                placeholder="example@gmail.com"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required={true}
                                onHasError={handleErrorChange}
                            />

                            <InputField
                                label="Password"
                                id="password"
                                placeholder="Enter your password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required={true}
                                isPassword={true}
                                forgotPassword={true}
                                onHasError={handleErrorChange}
                            />

                            <FormButton text={"Sign In"} loading={loading} />
                        </form>
                        <div className="flex items-center my-4">
                            <div className="flex-grow border-t"></div>
                            <span className="mx-3 text-sm text-[var(--textTwo)]">OR CONTINUE WITH</span>
                            <div className="flex-grow border-t"></div>
                        </div>
                        <GoogleButton onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleGoogleLogin({ e, role })} text={"Sign up with Google"} />
                        {!isAdmin && (
                            <p className="mt-10 text-center text-sm/6 text-[var(--textOne)] hover:text-[var(--textOneHover)]">
                                New to Slotflow?
                                <span className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={changeToSingUpForm}>
                                    {" "}Sign Up
                                </span>
                            </p>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm