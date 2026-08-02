import { ONBOARDING_CONFIG } from "../utils/constants";
import { OnboardingStep } from "../interface/commonInterface";

export const getOnboardingMetadata = (pathname: string): OnboardingStep | undefined => {
    if (ONBOARDING_CONFIG[pathname]) return ONBOARDING_CONFIG[pathname];
    const baseKey = Object.keys(ONBOARDING_CONFIG).find(key => pathname.startsWith(key));
    return baseKey ? ONBOARDING_CONFIG[baseKey] : undefined;
};
