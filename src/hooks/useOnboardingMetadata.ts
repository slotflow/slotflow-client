import { useLocation } from 'react-router-dom';
import { OnboardingStep } from '@/shared/types/common';
import { getOnboardingMetadata } from '@/shared/utils/helper/onboardingConfig';

export const useOnboardingMetadata = (): OnboardingStep | undefined => {
  const { pathname } = useLocation();
  return getOnboardingMetadata(pathname);
};
