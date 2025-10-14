import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/redux/appStore';
import { Role } from '@/utils/interface/commonInterface';
import LoginForm from '@/components/form/CommonForms/LoginForm';
import SignUpForm from '@/components/form/CommonForms/SignUpForm';
import { useAuthCheckInLogin } from '@/utils/hooks/useAuthCheckInLogin';
import ResetPasswordForm from '@/components/form/CommonForms/ResetPasswordForm';
import OtpVerificatioForm from '@/components/form/CommonForms/OtpVerificatioForm';
import EmailVerificationForm from '@/components/form/CommonForms/EmailVerificationForm';

interface AuthPageProp {
    role: Role
}

const AuthPage: React.FC<AuthPageProp> = ({
    role
}) => {

    const { resetPasswordForm, signInForm, verifyEmailForm, verifyOtpForm, signUpForm } = useSelector((store: RootState) => store.signform);
    useAuthCheckInLogin();

    return (
        <div className='h-[100vh] flex bg-[var(--background)]'>
            <div className="w-full md:6/12 lg:w-4/12 flex justify-center items-center bg-[#f5f5f5] dark:bg-[#171717]">
                {signInForm && <LoginForm role={role} />}
                {role !== "ADMIN" && (
                    <>
                        {signUpForm && <SignUpForm role={role} />}
                        {verifyEmailForm && <EmailVerificationForm role={role} />}
                        {resetPasswordForm && <ResetPasswordForm />}
                        {verifyOtpForm && <OtpVerificatioForm />}
                    </>
                )}
            </div>
            <div className='w-0 md:w6/12 lg:w-8/12'>

            </div>
        </div>
    )
}

export default AuthPage