import { OnboardingStep } from '../../types/common';
import { onboardingConfig } from '../constants/boardingConstants';

export const getOnboardingMetadata = (pathname: string): OnboardingStep | undefined => {
  if (onboardingConfig[pathname]) return onboardingConfig[pathname];
  const baseKey = Object.keys(onboardingConfig).find((key) => pathname.startsWith(key));
  return baseKey ? onboardingConfig[baseKey] : undefined;
};
