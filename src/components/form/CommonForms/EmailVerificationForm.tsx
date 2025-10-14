import { toast } from 'react-toastify';
import InputField from '../InputFieldWithLable'
import { resendOtp } from '@/utils/apis/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { FormButton, FormHeading } from '../FormSplits';
import { FormEvent, useCallback, useState } from 'react';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import { setResetPasswordForm, setsignInForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm } from '@/utils/redux/slices/signFormSlice';
import { ApiBaseResponse, EmailVerificationFormData, EmailVerificationFormProps, HandleChangeFunction } from '@/utils/interface/commonInterface';

const EmailVerificationForm: React.FC<EmailVerificationFormProps> = ({ role }) => {

    const dispatch = useDispatch<AppDispatch>();
    const loading: boolean = useSelector((store: RootState) => store.signform.loading);
    const [hasErrors, setHasErrors] = useState<boolean>(false);

    const [formData, setFormData] = useState<EmailVerificationFormData>({
        email: ""
    });

    const handleChange = useCallback<HandleChangeFunction>((e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        setHasErrors(false);
    }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (hasErrors) {
            toast.error("Please fix the form errors.");
            return;
        }
        if (role) {
            dispatch(resendOtp({ role, email: formData.email }))
                .unwrap()
                .then((res: ApiBaseResponse) => {
                    if (res.success) {
                        toast.success(res.message);
                        dispatch(setVerifyOtpForm(true));
                        dispatch(setVerifyEmailForm(false));
                        dispatch(setSignUpForm(false));
                        dispatch(setsignInForm(false));
                        dispatch(setResetPasswordForm(false));
                    } else {
                        toast.error(res.message);
                    }
                })
                .catch((error) => {
                    toast.error(error || "An error occurred.");
                });
        } else {
            toast.info("Select your account type.");
        }
    };

    const handleCancel = (): void => {
        dispatch(setVerifyEmailForm(false));
        dispatch(setsignInForm(true));
        dispatch(setVerifyOtpForm(false));
        dispatch(setSignUpForm(false));
        dispatch(setResetPasswordForm(false));
    }

    const handleErrorChange = (hasError: boolean) => {
        setHasErrors(hasError);
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="p-8">            
                    <FormHeading title={"Verify Email"} description='An Otp will send to this email id' />
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="space-y-3">
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

                            <FormButton text={"Submit"} loading={loading} />
                        </form>

                        <p className="mt-6 flex justify-between text-xs md:text-sm/6 text-[var(--textTwo)] px-2">
                            <span className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={handleCancel}>Cencel</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailVerificationForm