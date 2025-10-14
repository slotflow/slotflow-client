import { toast } from "react-toastify";
import GoogleButton from "../GoogleButton";
import InputField from "../InputFieldWithLable";
import { signup, } from "@/utils/apis/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { FormButton, FormHeading } from "../FormSplits";
import { handleGoogleLogin } from "@/utils/helper/googleLogin";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import React, { FormEvent, useCallback, useState } from "react";
import { ApiBaseResponse, SignUpFormData, signUpFormProps } from "@/utils/interface/commonInterface";
import { setResetPasswordForm, setsignInForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm, startTimer } from "@/utils/redux/slices/signFormSlice";


const SignUpForm: React.FC<signUpFormProps> = ({ role }) => {

    const dispatch = useDispatch<AppDispatch>();

    const loading: boolean = useSelector((store: RootState) => store.signform.loading);
    const [hasErrors, setHasErrors] = useState<boolean>(false);

    const [formData, setFormData] = useState<SignUpFormData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        setHasErrors(false);
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (hasErrors) {
            console.log("hasErrors : ", hasErrors);
            toast.error("Please fix the form errors.");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error("Mismatching password");
            return;
        }
        if (role) {
            dispatch(signup({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: role
            }))
                .unwrap()
                .then((res: ApiBaseResponse) => {
                    if (res.success) {
                        toast.success(res.message);
                        dispatch(setSignUpForm(false));
                        dispatch(setVerifyOtpForm(true));
                        dispatch(setsignInForm(false));
                        dispatch(setVerifyEmailForm(false));
                        dispatch(setResetPasswordForm(false));
                        dispatch(startTimer(300));
                    } else {
                        toast.error(res.message);
                    }
                })
                .catch((error) => {
                    toast.error(error || "An error occurred during signup.");
                });
        } else {
            toast.error("Select your account type.");
        }
    };

    const changeToSignIn = () => {
        dispatch(setsignInForm(true));
        dispatch(setSignUpForm(false));
        dispatch(setVerifyEmailForm(false));
        dispatch(setVerifyOtpForm(false));
        dispatch(setResetPasswordForm(false));
    }

    const handleErrorChange = (hasError: boolean) => {
        setHasErrors(hasError);
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="p-8">
                    <FormHeading title={"Sign Up"} description="Sign Up with your credentials" />
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <InputField
                                label="Username"
                                id="username"
                                placeholder="Midhun K Paniker"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                required={true}
                                onHasError={handleErrorChange}
                            />
                            <InputField
                                label="Email address"
                                id="email"
                                placeholder="midhun@gmail.com"
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
                                onHasError={handleErrorChange}
                            />
                            <InputField
                                label="Confirm Password"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required={true}
                                isPassword={true}
                                onHasError={handleErrorChange}
                            />
                            <FormButton text={"Sign Up"} loading={loading} />
                        </form>
                        <div className="flex items-center my-4">
                            <div className="flex-grow border-t"></div>
                            <span className="mx-3 text-sm text-[var(--textTwo)]">OR CONTINUE WITH</span>
                            <div className="flex-grow border-t"></div>
                        </div>
                        <GoogleButton onClick={(e) => handleGoogleLogin({ e, role })} text={"Sign in with Google"} />
                        <p className="mt-10 text-center text-sm/6 text-[var(--textOne)] hover:text-[var(--textOneHover)]">
                            Already a Slotflow member?
                            <span className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={changeToSignIn}>
                                {" "}Sign In
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SignUpForm