import FormField from '../FormField';
import { toast } from 'react-toastify';
import FormHeading from '../FormHeading';
import { appConfig } from '@/config/env';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FormButton } from '../FormButton';
import { AppDispatch } from '@/app/store/appStore';
import { resetPassword } from '@/services/apis/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { setForgotPassword } from '@/app/store/slices/appSlice';
import { ResetPasswordFormType, resetPasswordZodSchema } from '@/shared/validators/zod/authZod';

const ResetPasswordForm = () => {
  const { goTo } = useAppNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordZodSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormType) => {
    try {
      const res = await dispatch(
        resetPassword({
          password: data.password,
        }),
      ).unwrap();

      if (res.success) {
        toast.success(res.message);
        goTo(redirectPaths.LOGIN);
        dispatch(setForgotPassword(false));
      }
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log('An error occurred while updating password.', error);
      }
    }
  };

  const passwordValue = watch('password');

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-zinc-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-2xl p-6 sm:p-8">
          <FormHeading title="Reset your password" description="Enter new password." />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <FormField<ResetPasswordFormType>
              label="Password"
              id="password"
              placeholder="Enter new password"
              type="password"
              required={true}
              showTogglePassword
              register={register}
              error={errors.password?.message}
            />
            <FormField<ResetPasswordFormType>
              label="Confirm Password"
              id="confirmPassword"
              placeholder="Confirm new password"
              type="password"
              required={true}
              showTogglePassword
              register={register}
              error={
                errors.confirmPassword?.message ??
                (watch('confirmPassword') !== passwordValue ? 'Passwords do not match' : undefined)
              }
            />

            <FormButton
              text={isSubmitting ? 'Updating' : 'Update'}
              loading={isSubmitting}
              disabled={isSubmitting || !isValid}
              title="Update"
              className="w-full"
            />
          </form>

          <p className="mt-6 flex justify-between text-xs md:text-sm/6 text-neutral-600 px-2">
            <span
              className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
              onClick={() => goTo(redirectPaths.LOGIN)}
            >
              Cancel
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
