import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfileSetup } from '@/hooks/useProfileSetup';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { HearAboutUsOptionValue } from '@/shared/types/enums';
import { Check, ChevronLeft, LoaderCircle } from 'lucide-react';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';
import ReferralCodeCard from '@/components/boarding/hearAboutUs/ReferralCodeCard';
import HearAboutUsOptions from '@/components/boarding/hearAboutUs/HearAboutUsOptionCard';

const HearAboutUsPage = () => {
  const { goTo } = useAppNavigation();
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const { submitPrfoleSetup, isProfileSetupSubmitting } = useProfileSetup();
  const [selectedOption, setSelectedOption] = useState<HearAboutUsOptionValue | null>(null);

  const handlePrevious = () => {
    goTo(redirectPaths.PROFILE_SETUP_USERNAME);
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center py-4 sm:py-8 px-4 sm:px-6">
      <div className="w-full mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col items-center text-center space-y-4 sm:space-y-6"
        >
          <div className="space-y-1 sm:space-y-1.5 px-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Source of Discovery
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Tell us how you found our platform to help us improve.
            </p>
          </div>

          <div className="w-full pt-1 sm:pt-2">
            <HearAboutUsOptions
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedOption === HearAboutUsOptionValue.REFERRAL && (
            <motion.div
              key="referral-card"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full mt-4 sm:mt-6"
            >
              <ReferralCodeCard
                value={referralCode}
                onChange={setReferralCode}
                onClose={() => {
                  setSelectedOption(null);
                  setReferralCode(null);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="w-full pt-6 sm:pt-8"
        >
          <div className="flex flex-col-reverse sm:flex-row w-full items-center justify-center md:justify-end gap-2.5 sm:gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={handlePrevious}
              disabled={isProfileSetupSubmitting}
              className="w-full sm:w-auto min-w-[120px]"
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>

            <Button
              type="button"
              variant="default"
              onClick={() => {
                submitPrfoleSetup({
                  selectedOption,
                  referralCode,
                });
              }}
              disabled={isProfileSetupSubmitting || !selectedOption}
              className="w-full sm:w-auto min-w-[120px]"
            >
              {isProfileSetupSubmitting ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Submitting
                </>
              ) : (
                <>
                  <Check className="size-4" />
                  Complete
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HearAboutUsPage;