import { onboardingContent } from "@/shared/utils/constants";

export interface OnboardingStep {
    pageNumber: number;
    heading: string;
    description: string;
    path: string;
}

export const ONBOARDING_CONFIG: Record<string, OnboardingStep> = {
    "/preboarding/role": {
        pageNumber: 0,
        heading: onboardingContent.setupRole.title,
        description: onboardingContent.setupRole.description,
        path: "/preboarding/role"
    },
    "/preboarding/hear-about-us": {
        pageNumber: 0,
        heading: onboardingContent.hearAboutUs.title,
        description: onboardingContent.hearAboutUs.description,
        path: "/preboarding/hear-about-us"
    },
    "/onboarding/address": {
        pageNumber: 1,
        heading: onboardingContent.address.title,
        description: onboardingContent.address.description,
        path: "/onboarding/address"
    },
    "/onboarding/service": {
        pageNumber: 2,
        heading: onboardingContent.serviceDetails.title,
        description: onboardingContent.serviceDetails.description,
        path: "/onboarding/service"
    },
    "/onboarding/availability": {
        pageNumber: 3,
        heading: onboardingContent.availability.title,
        description: onboardingContent.availability.description,
        path: "/onboarding/availability"
    },
    "/onboarding/proofs": {
        pageNumber: 4,
        heading: onboardingContent.proofs.title,
        description: onboardingContent.proofs.description,
        path: "/onboarding/proofs"
    },
    "/onboarding/pending": {
        pageNumber: 5,
        heading: onboardingContent.profileApproval.title,
        description: onboardingContent.profileApproval.description,
        path: "/onboarding/pending"
    }
};

export const getOnboardingMetadata = (pathname: string): OnboardingStep | undefined => {
    // Exact match
    if (ONBOARDING_CONFIG[pathname]) return ONBOARDING_CONFIG[pathname];
    
    // Fallback for paths with trailing slashes or sub-paths if needed
    const baseKey = Object.keys(ONBOARDING_CONFIG).find(key => pathname.startsWith(key));
    return baseKey ? ONBOARDING_CONFIG[baseKey] : undefined;
};
