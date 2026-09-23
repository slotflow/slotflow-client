import FormField from '../FormField';
import { toast } from 'react-toastify';
import FormHeading from '../FormHeading';
import { appConfig } from '@/config/env';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FormButton } from '../FormButton';
import { useNavigate } from 'react-router-dom';
import { verifyEmail } from '@/services/apis/auth';
import { AppDispatch } from '@/app/store/appStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirectPaths } from '@/shared/utils/constants';
import { VerifyEmailFormType, verifyEmailZodSchema } from '@/shared/validators/zod/authZod';

const EmailVerificationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<VerifyEmailFormType>({
    resolver: zodResolver(verifyEmailZodSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: VerifyEmailFormType) => {
    try {
      const res = await dispatch(verifyEmail({ email: data.email })).unwrap();
      if (res.success) {
        // Navigate immediately for instant UX
        navigate('verify/otp');
        // Show toast after navigation (toast uses portal so still visible)
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log('An error occurred during email verification ', error);
      }
      toast.error('An error occurred during email verification');
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-zinc-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-2xl p-6 sm:p-8">
          <FormHeading
            title="Verify your email"
            description="We'll sent an otp to your registered email.."
          />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <FormField<VerifyEmailFormType>
              label="Email"
              id="email"
              placeholder="Enter your registered email"
              type="email"
              register={register}
              error={errors.email?.message}
              required={true}
            />
            <FormButton
              text={isSubmitting ? 'Verifying' : 'Verify'}
              loading={isSubmitting}
              disabled={isSubmitting || !isValid}
              title="Verify Email"
              className='w-full'
            />
          </form>

          <p className="mt-6 flex justify-between text-xs md:text-sm/6 text-[var(--textTwo)] px-2">
            <span
              className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
              onClick={() => navigate(redirectPaths.LOGIN)}
            >
              Cancel
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationForm;
