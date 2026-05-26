import { useLocation } from "react-router-dom";
import { getOnboardingMetadata, OnboardingStep } from "@/shared/config/onboardingConfig";

export const useOnboardingMetadata = (): OnboardingStep | undefined => {
    const { pathname } = useLocation();
    return getOnboardingMetadata(pathname);
};
