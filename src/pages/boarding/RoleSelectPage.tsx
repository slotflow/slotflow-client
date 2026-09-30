import { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { ChevronRight } from 'lucide-react';
import { Role } from '@/shared/types/enums';
import service from '@/assets/svgs/service.svg';
import booking from '@/assets/svgs/booking.svg';
import { Button } from '@/components/ui/button';
import { AppDispatch } from '@/app/store/appStore';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { setBoardingData } from '@/app/store/slices/authSlice';
import RoleSelectCard from '../../components/boarding/roleSelect/RoleSelectCard';

const RoleSelectPage = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  const { goTo } = useAppNavigation();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleContinue = () => {
    if (!selectedRole) {
      toast.error('Please select a role to continue.');
      return;
    }
    dispatch(
      setBoardingData({
        selectedRole,
      }),
    );
    goTo(redirectPaths.PRE_BOARDING_HEAR_ABOUT_US);
  };

  return (
    <div className="relative ">
      <div className="mx-auto sm:px-6 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
          className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          <RoleSelectCard
            role={Role.USER}
            icon={booking}
            title="Book Appointments"
            description="Discover trusted professionals and schedule appointments effortlessly."
            selectedRole={selectedRole}
            onSelect={setSelectedRole}
          />
          <RoleSelectCard
            role={Role.PROVIDER}
            icon={service}
            title="Provide Services"
            description="Manage bookings, accept payments, and grow your business with SlotFlow."
            selectedRole={selectedRole}
            onSelect={setSelectedRole}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.35,
          }}
          className="mt-14 flex flex-col items-center md:items-end gap-5"
        >
          <p className="text-sm text-gray-500">
            Your selection helps us personalize your onboarding experience.
          </p>
          <Button
            variant='default'
            onClick={handleContinue}
            disabled={!selectedRole}
            className='w-full md:w-auto'
          >
            Continue
            <ChevronRight className="ml-1 size-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelectPage;
