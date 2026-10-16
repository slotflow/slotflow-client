import FormField from '../FormField';
import { toast } from 'react-toastify';
import FormHeading from '../FormHeading';
import { appConfig } from '@/config/env';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import GoogleButton from '../GoogleButton';
import { FormButton } from '../FormButton';
import { signup } from '@/services/apis/auth';
import { useTimezone } from '@/hooks/useTimezone';
import { AppDispatch } from '@/app/store/appStore';
import TimezoneSelect from 'react-timezone-select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';
import { SignupFormType, signupZodSchema } from '@/shared/validators/zod/authZod';

const SignUpForm = () => {
  const { goTo } = useAppNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const { parsed, selectedTimezone, setSelectedTimezone } = useTimezone();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupZodSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      timeZone: parsed,
    },
  });

  const onSubmit = async (data: SignupFormType) => {
    try {
      const res = await dispatch(
        signup({
          ...data,
        }),
      ).unwrap();
      if (res.success) {
        goTo(redirectPaths.VERIFY_OTP);
        toast.success(res.message);
      }
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log('An error occurred while sign up ', error);
      }
    }
  };

  const passwordValue = watch('password');

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-zinc-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-2xl p-6 sm:p-8">
          <FormHeading
            title="Create your account"
            description="Get started with Slotflow today. Free 14-day trial, no credit card required."
          />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <fieldset disabled={isSubmitting} className="space-y-3">
              <FormField<SignupFormType>
                label="Email"
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
                  (watch('confirmPassword') !== passwordValue
                    ? 'Passwords do not match'
                    : undefined)
                }
                required={true}
              />
              <FormButton
                text={isSubmitting ? 'Signing up' : 'Sign up'}
                loading={isSubmitting}
                disabled={isSubmitting || !isValid}
                title="Sign up"
                className="w-full"
              />
              <TimezoneSelect
                value={selectedTimezone}
                onChange={setSelectedTimezone}
                className="hidden"
              />
            </fieldset>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t"></div>
            <span className="mx-3 text-sm text-neutral-600">OR CONTINUE WITH</span>
            <div className="flex-grow border-t"></div>
          </div>

          <GoogleButton text="Sign in with Google" />

          <p className="mt-10 text-center text-sm/6 text-neutral-700">
            Already a Slotflow member?
            <span
              className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
              onClick={() => goTo(redirectPaths.LOGIN)}
            >
              {' '}
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
