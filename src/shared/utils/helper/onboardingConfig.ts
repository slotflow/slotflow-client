import { ONBOARDING_CONFIG } from '../constants';
import { OnboardingStep } from '../../types/common';

export const getOnboardingMetadata = (pathname: string): OnboardingStep | undefined => {
  if (ONBOARDING_CONFIG[pathname]) return ONBOARDING_CONFIG[pathname];
  const baseKey = Object.keys(ONBOARDING_CONFIG).find((key) => pathname.startsWith(key));
  return baseKey ? ONBOARDING_CONFIG[baseKey] : undefined;
};
