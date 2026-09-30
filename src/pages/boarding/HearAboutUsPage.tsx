import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePreBoarding } from '@/hooks/usePreboarding';
import { HearAboutUsOptionValue } from '@/shared/types/enums';
import ReferralCodeCard from '@/components/boarding/hearAboutUs/ReferralCodeCard';
import HearAboutUsButtons from '@/components/boarding/hearAboutUs/HearAboutUsButtons';
import HearAboutUsOptions from '@/components/boarding/hearAboutUs/HearAboutUsOptionCard';

const HearAboutUsPage = () => {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<HearAboutUsOptionValue | null>(null);
  const { submitPreBoarding, hearAboutUsHandler, isPreboardingSubmitting } = usePreBoarding();

  return (
    <div className="relative">
      <div className="mx-auto sm:px-6 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
        >
          <HearAboutUsOptions
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedOption === HearAboutUsOptionValue.REFERRAL && (
            <motion.div
              key="referral-card"
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6"
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
          transition={{
            delay: 0.35,
          }}
          className="mt-14"
        >
          <HearAboutUsButtons
            isSubmitting={isPreboardingSubmitting}
            disabled={isPreboardingSubmitting || !selectedOption}
            onPrevious={hearAboutUsHandler}
            onSubmit={() => {
              submitPreBoarding({
                selectedOption,
                referralCode,
              });
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HearAboutUsPage;