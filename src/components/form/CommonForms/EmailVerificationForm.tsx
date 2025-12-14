import FormField from "../FormField";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { resendOtp } from "@/utils/apis/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch } from "@/utils/redux/appStore";
import { FormButton, FormHeading } from "../FormSplits";
import { useAuthNavigation } from "@/utils/hooks/systemHooks/useAuthNavigation";
import { VerifyEmailForm, verifyEmailZodSchema } from "@/utils/zod/authZod";
import { AuthFormType, EmailVerificationFormProps } from "@/utils/interface/commonInterface";

const EmailVerificationForm: React.FC<EmailVerificationFormProps> = ({ role }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { goToAuthPage } = useAuthNavigation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<VerifyEmailForm>({
        resolver: zodResolver(verifyEmailZodSchema),
        mode: "onChange",
        defaultValues: {
            email: ""
        },
    });

    const onSubmit = async (data: VerifyEmailForm) => {
        if (!role) {
            toast.info("Select your account type.");
            return;
        }

        try {
            const res = await dispatch(resendOtp({ role, email: data.email })).unwrap();
            if (res.success) {
                toast.success(res.message);
                goToAuthPage(role, AuthFormType.VERIFY_OTP);
            }
        } catch (error) {
            if(import.meta.env.DEV)console.log("An error occurred during email verification ",error);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="p-8">
                    <FormHeading title="Verify Email" description="An OTP will be sent to this email ID" />
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            <FormField<VerifyEmailForm>
                                label="Email Address"
                                id="email"
                                placeholder="Enter your registered email"
                                type="email"
                                register={register}
                                error={errors.email?.message}
                                required={true}
                            />
                            <FormButton text="Submit" loading={isSubmitting} disabled={isSubmitting || !isValid} />
                        </form>

                        <p className="mt-6 flex justify-between text-xs md:text-sm/6 text-[var(--textTwo)] px-2">
                            <span
                                className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
                                onClick={() => goToAuthPage(role, AuthFormType.LOGIN)}
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
