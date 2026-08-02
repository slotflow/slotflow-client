import { useLocation } from "react-router-dom";
import { OnboardingStep } from "@/shared/interface/commonInterface";
import { getOnboardingMetadata } from "@/shared/helper/onboardingConfig";

export const useOnboardingMetadata = (): OnboardingStep | undefined => {
    const { pathname } = useLocation();
    return getOnboardingMetadata(pathname);
};
