import FormField from '../FormField';
import { toast } from 'react-toastify';
import { appConfig } from '@/config/env';
import FormHeading from '../FormHeading';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import GoogleButton from '../GoogleButton';
import { FormButton } from '../FormButton';
import { signin } from '@/services/apis/auth';
import { Button } from '@/components/ui/button';
import { AppDispatch } from '@/app/store/appStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { setForgotPassword } from '@/app/store/slices/appSlice';
import { LoginFormType, LoginZodSchema } from '@/shared/validators/zod/authZod';

const LoginForm = () => {

  const { goTo } = useAppNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { handleAuthLoginNavigation } = useAppNavigation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginZodSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
      const res = await dispatch(signin({ ...data })).unwrap();
      if (res.success && res.data) {
        handleAuthLoginNavigation(res.data.user);
        toast.success(res.message);
      } else toast.error(res.message);
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log('An error occurred during login ', error);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-zinc-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-2xl p-6 sm:p-8">
          <FormHeading
            title="Sign in to Slotflow"
            description="Welcome back! Please enter your details to continue."
          />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <fieldset disabled={isSubmitting} className="space-y-3">
              <FormField<LoginFormType>
                label="Email"
                id="email"
                placeholder="Enter email"
                type="email"
                register={register}
                error={errors.email?.message}
                required={true}
              />

              <FormField<LoginFormType>
                label="Password"
                id="password"
                placeholder="Enter password"
                type="password"
                showTogglePassword
                register={register}
                error={errors.password?.message}
                required={true}
              />

              <Button
                title="Forgot Password"
                variant="link"
                className="px-0 block text-xs md:text-sm font-medium text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
                onClick={() => {
                  dispatch(setForgotPassword(true));
                  goTo(redirectPaths.VERIFY_EMAIL);
                }}
              >
                Forgot Password ?
              </Button>

              <FormButton
                text={isSubmitting ? 'Signing In' : 'Sign In'}
                loading={isSubmitting}
                disabled={isSubmitting || !isValid}
                title="Sign In"
                className='w-full'
              />
            </fieldset>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t"></div>
            <span className="mx-3 text-sm text-neutral-600">OR CONTINUE WITH</span>
            <div className="flex-grow border-t"></div>
          </div>

          <GoogleButton
            text="Sign up with Google"
          />

          <p className="mt-10 text-center text-sm text-neutral-700">
            New to Slotflow ?
            <span
              className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
              onClick={() => goTo(redirectPaths.REGISTER)}
            >
              {' '}
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
