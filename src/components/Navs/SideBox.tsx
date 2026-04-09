import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import choose from '../../assets/svgs/choose.svg';
import address from '../../assets/svgs/address.svg';
import working from '../../assets/svgs/working.svg';
import { RootState } from '@/shared/redux/appStore';
import fileUpload from '../../assets/svgs/fileUpload.svg';
import service from '../../assets/svgs/serviceDetails.svg';
import { useSignout } from '@/hooks/systemHooks/useSignout';
import availability from '../../assets/svgs/availability.svg';
import { SideBoxProps } from '@/shared/interface/entityInterface/providerInterface';
import { pageLabels, pageDescriptions, redirectPaths } from '@/shared/utils/constants';
import { Role } from '@/shared/interface/enums';

const SideBox: React.FC<SideBoxProps> = ({ pageNumber }) => {

  const navigate = useNavigate();
  const { signoutHandler } = useSignout();
  const user = useSelector((store: RootState) => store.auth.authUser);

  const handleSignout = async () => {
    const res = await signoutHandler();
    if (res.success) {
      toast.success(res.message);
      navigate(redirectPaths.LOGIN);
    } else {
      toast.error(res.message);
    }
  }

  const allLabels = pageLabels[pageNumber];
  const labels = user?.role === Role.USER ? [allLabels[0]] : allLabels;
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
    <div className="bg-[var(--mainColorTwo)] md:h-screen w-full md:w-4/12 p-6 md:p-10 rounded-r-lg shadow-lg flex flex-col justify-between h-full md:sticky md:top-0">

      <div>
        <div className="flex justify-between mb-4">
          <h3 className="text-3xl font-bold italic text-[var(--mainColor)]">Slotflow</h3>
          {user && (
            <Button
              title="Logout"
              variant="default"
              onClick={handleSignout}
              className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
            >
              Logout
            </Button>
          )}
        </div>

        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
          {description}
        </p>

        <div className="flex flex-col gap-6 w-full mt-8">
          {labels.map((label, index) => {
    
            const step = index + 1;
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
                      isCompleted || isActive ? 'border-[var(--mainColor)]' : 'border-transparent'
                    )}
                    initial={{ rotate: '-90deg', strokeDasharray: 100, strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: isCompleted || isActive ? 0 : 100 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />

                  <span
                    className={cn(
                      'absolute xs:text-xs text-sm font-semibold',
                      isCompleted || isActive ? 'text-[var(--mainColor)]' : 'text-gray-600'
                    )}
                  >
                    {step}
                  </span>
                </motion.div>

                <p
                  className={cn(
                    'text-sm',
                    isActive ? 'font-semibold text-[var(--mainColor)]' : 'text-gray-700'
                  )}
                >
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center my-6">
        <img
          src={images[pageNumber as keyof typeof images]}
          className="h-40 md:h-72 w-full object-contain"
          alt="Illustration"
        />
      </div>

      <div className="mt-6 border-t pt-6">
        {/* <h4 className="text-lg font-semibold text-gray-800">Midhun Kalarikkal</h4> */}
        <p className="text-sm text-gray-600">We Offer</p>

        <blockquote className="text-gray-700 italic text-sm leading-relaxed mt-2">
          "At Slotflow, we're dedicated to simplifying service bookings.
          Our platform empowers providers to manage their schedules efficiently."
        </blockquote>
      </div>
    </div>
  );
};

export default SideBox;
