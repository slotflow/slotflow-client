import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { AppDispatch } from '@/app/store/appStore';
import { zodResolver } from '@hookform/resolvers/zod';
import usernameSvg from '../../assets/svgs/username.svg';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { setBoardingData } from '@/app/store/slices/authSlice';
import { updateBoardingStep } from '@/app/store/slices/appSlice';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';
import { Check, ChevronLeft, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { UsernameFormData, usernameSchema } from '@/shared/validators/zod/authZod';

export const UserNamePage = () => {
  const { goTo } = useAppNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UsernameFormData>({
    resolver: zodResolver(usernameSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
    },
  });

  const onSubmit = (data: UsernameFormData) => {
    dispatch(
      setBoardingData({
        username: data.username,
      }),
    );
    goTo(redirectPaths.PROFILE_SETUP_HEAR_ABOUT_US);
  };

  const onError = () => {
    toast.error(errors.username?.message || 'Invalid username');
  };

  const handlePrevious = () => {
    dispatch(updateBoardingStep(3));
    goTo(redirectPaths.PROFILE_SETUP_ROLE);
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center py-4 sm:py-8 px-4 sm:px-6">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="w-full max-w-md sm:max-w-lg mx-auto flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col items-center text-center space-y-4 sm:space-y-6"
        >
          <div className="flex items-center justify-center">
            <img src={usernameSvg} alt="svg" className="size-52" />
          </div>

          <div className="space-y-1 sm:space-y-1.5 px-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              How should we address you?
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Set your preferred username for your account profile.
            </p>
          </div>

          <div className="w-full space-y-2 text-left pt-1 sm:pt-2">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                <User className="size-4 sm:size-5" />
              </div>

              <input
                type="text"
                {...register('username')}
                placeholder="e.g. john_doe"
                className={`w-full rounded-xl border bg-background pl-10 sm:pl-11 pr-10 sm:pr-11 py-3 sm:py-3.5 text-sm font-medium transition-all focus:outline-none ${
                  errors.username
                    ? 'border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive'
                    : isValid
                      ? 'border-emerald-500/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                      : 'border-input focus:border-primary focus:ring-1 focus:ring-primary'
                }`}
              />

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                {isValid ? (
                  <CheckCircle2 className="size-4 sm:size-5 text-emerald-500" />
                ) : errors.username ? (
                  <AlertCircle className="size-4 sm:size-5 text-destructive" />
                ) : null}
              </div>
            </div>

            {errors.username && (
              <p className="text-xs text-destructive mt-1 font-medium text-left">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row w-full items-center justify-between gap-2.5 sm:gap-3 pt-2 sm:pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handlePrevious}
              className="w-full sm:w-1/2 min-w-[110px]"
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>

            <Button
              type="submit"
              variant="default"
              disabled={!isValid}
              className="w-full sm:w-1/2 min-w-[110px]"
            >
              <Check className="size-4" />
              Continue
            </Button>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default UserNamePage;
