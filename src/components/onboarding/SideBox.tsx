import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { appConfig } from '@/shared/config/env';
import choose from '../../assets/svgs/choose.svg';
import address from '../../assets/svgs/address.svg';
import working from '../../assets/svgs/working.svg';
import { useDispatch, useSelector } from 'react-redux';
import { LoaderCircle, LogOut, Moon, Sun } from 'lucide-react';
import fileUpload from '../../assets/svgs/fileUpload.svg';
import service from '../../assets/svgs/serviceDetails.svg';
import { useSignout } from '@/hooks/systemHooks/useSignout';
import availability from '../../assets/svgs/availability.svg';
import { toggleTheme } from '@/shared/redux/slices/appSlice';
import { AppDispatch, RootState } from '@/shared/redux/appStore';
import { SideBoxProps } from '@/shared/interface/componentInterface';
import { pageLabels, pageDescriptions, redirectPaths, defaultButtonClassName } from '@/shared/utils/constants';

const SideBox: React.FC<SideBoxProps> = ({ pageNumber }) => {

  const navigate = useNavigate();
  const { signoutHandler } = useSignout();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((store: RootState) => store.auth.authUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const themeMode: boolean = useSelector((store: RootState) => store.app.lightTheme);

  const changeTheme = (): void => {
    dispatch(toggleTheme());
  }

  const handleSignout = async () => {
    setIsLoading(true);
    try {
      const res = await signoutHandler();
      if (res.success) {
        toast.success(res.message);
        navigate(redirectPaths.LOGIN);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.error("Error during signout:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const allLabels = pageLabels[pageNumber];
  const labels = pageNumber === 0 ? [allLabels[0]] : allLabels;
  const description = pageDescriptions[pageNumber] || '';
  const activeStep = pageNumber;

  const images = {
    0: choose,
    1: address,
    2: service,
    3: availability,
    4: fileUpload,
    5: working,
  };

  return (
    <div className="bg-[var(--mainColorTwo)] md:h-screen w-full md:w-4/12 p-6 md:p-10 rounded-r-lg shadow-lg flex flex-col h-full md:sticky md:top-0">

      <div className="flex flex-col gap-6 h-full">

        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-bold italic text-[var(--mainColor)]">
            Slotflow
          </h3>

          <div className="flex items-center gap-2">
            {themeMode ?
              <div className="relative flex rounded-full cursor-pointer mx-3" onClick={changeTheme}>
                <Moon />
              </div>
              :
              <div className="relative flex rounded-full cursor-pointer mx-3" onClick={changeTheme}>
                <Sun />
              </div>
            }

            {user && (
              <Button
                title="Logout"
                variant="default"
                onClick={handleSignout}
                className={defaultButtonClassName}
                disabled={isLoading}
              >{isLoading ?
                <LoaderCircle className="animate-spin w-4 h-4" />
                :
                <LogOut className="w-4 h-4" />
                }
                Logout
              </Button>
            )}
          </div>
        </div>

        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col gap-6">
          {labels.map((label, index) => {
            const step = index;
            const isActive = step === activeStep;
            const isCompleted = step < activeStep;

            return (
              <div key={index} className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: isActive ? 1.15 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex items-center justify-center"
                >
                  <div className="w-5 h-5 rounded-full border-[2px] border-gray-300 flex items-center justify-center" />

                  <motion.div
                    className={cn(
                      'absolute inset-0 rounded-full border-[2px]',
                      isCompleted || isActive
                        ? 'border-[var(--mainColor)]'
                        : 'border-transparent'
                    )}
                    initial={{
                      rotate: '-90deg',
                      strokeDasharray: 100,
                      strokeDashoffset: 100,
                    }}
                    animate={{
                      strokeDashoffset:
                        isCompleted || isActive ? 0 : 100,
                    }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />

                  <span
                    className={cn(
                      'absolute xs:text-xs text-sm font-semibold',
                      (isCompleted || isActive)
                        ? 'text-[var(--mainColor)]'
                        : 'text-gray-600'
                    )}
                  >
                    {step + 1}
                  </span>
                </motion.div>

                <p
                  className={cn(
                    'text-sm',
                    (isCompleted || isActive)
                      ? 'font-semibold text-[var(--mainColor)]'
                      : 'text-gray-700'
                  )}
                >
                  {label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center flex-1 items-center">
          <img
            src={images[pageNumber as keyof typeof images]}
            className="h-40 md:h-72 w-full object-contain"
            alt="Illustration"
          />
        </div>

        <div className="border-t pt-6">
          <p className="text-sm text-gray-600">We Offer</p>

          <blockquote className="text-gray-700 italic text-sm leading-relaxed mt-2">
            "At Slotflow, we're dedicated to simplifying service bookings.
            Our platform empowers providers to manage their schedules efficiently."
          </blockquote>
        </div>

      </div>
    </div>
  );
};

export default SideBox;
