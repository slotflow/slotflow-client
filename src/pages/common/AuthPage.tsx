import React from 'react';
import { RoleType } from '@/utils/interface/commonInterface';
import LoginForm from '@/components/form/CommonForms/LoginForm';
import SignUpForm from '@/components/form/CommonForms/SignUpForm';
import { useAuthCheckInLogin } from '@/utils/hooks/useAuthCheckInLogin';
import ResetPasswordForm from '@/components/form/CommonForms/ResetPasswordForm';
import OtpVerificatioForm from '@/components/form/CommonForms/OtpVerificatioForm';
import EmailVerificationForm from '@/components/form/CommonForms/EmailVerificationForm';

interface AuthPageProp {
    role: RoleType,
    formType: number,
}

const AuthPage: React.FC<AuthPageProp> = ({
    role,
    formType
}) => {

    useAuthCheckInLogin();

    const formMap: Record<number, React.ReactNode> = {
        0: <LoginForm role={role} />,
        1: <SignUpForm role={role} />,
        2: <EmailVerificationForm role={role} />,
        3: <ResetPasswordForm role={role} />,
        4: <OtpVerificatioForm role={role} />,
    };

    return (
        <div className='h-[100vh] flex bg-[var(--background)]'>
            <div className="w-full md:w-6/12 lg:w-4/12 flex justify-center items-center bg-[#f5f5f5] dark:bg-[#171717]">
                {role === "ADMIN" ? formMap[0] : formMap[formType]}
            </div>
            <div className='w-0 md:w-6/12 lg:w-8/12'></div>
        </div>
    );
}

export default AuthPage