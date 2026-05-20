import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/appStore";
import { Navigate, useLocation } from "react-router-dom";
import { OnboardingStatus, Role } from "@/shared/interface/enums";
import { OnbooardingGuardProps } from "@/shared/interface/componentInterface";

const OnBoardingGuard: React.FC<OnbooardingGuardProps> = ({ children }) => {
    
    const location = useLocation();
    const { authUser: user, boardingData } = useSelector((store: RootState) => store.auth);

    if (!user) {
        return (
            <Navigate
                to="/auth/login"
                state={{ from: location }}
                replace
            />
        );
    }

    if (user.role === Role.ADMIN) {
        return <Navigate to="/admin" replace />;
    }

    if (user.onboardingStatus === OnboardingStatus.NOT_STARTED) {
        if (!boardingData.selectedRole) {
            if (location.pathname !== "/preboarding/role") {
                return <Navigate to="/preboarding/role" replace />;
            }
        } else {
            if (
                location.pathname !== "/preboarding/role" &&
                location.pathname !== "/preboarding/hear-about-us"
            ) {
                return <Navigate to="/preboarding/hear-about-us" replace />;
            }
        }

        return <>{children}</>;
    }

    if (user.onboardingStatus === OnboardingStatus.IN_PROGRESS && user.onboardingType === Role.PROVIDER) {

        if (!user.isAddressAdded && !user.isAddressVerified) {
            if (location.pathname !== "/onboarding/address") {
                return <Navigate to="/onboarding/address" replace />;
            }
        }

        else if (!user.isServiceDetailsAdded && !user.isServiceDetailsVerified) {
            if (location.pathname !== "/onboarding/service") {
                return <Navigate to="/onboarding/service" replace />;
            }
        }

        else if (!user.isServiceAvailabilityAdded && !user.isAvailabilityVerified) {
            if (location.pathname !== "/onboarding/availability") {
                return <Navigate to="/onboarding/availability" replace />;
            }
        }

        else if (
            (!user.isProofSubmitted?.identityProof ||
             !user.isProofSubmitted?.serviceProof) &&
            !user.isProofsVerified
        ) {
            if (location.pathname !== "/onboarding/proofs") {
                return <Navigate to="/onboarding/proofs" replace />;
            }
        }

        else if (!user.isAdminVerified) {
            if (location.pathname !== "/onboarding/pending") {
                return <Navigate to="/onboarding/pending" replace />;
            }
        }
    }

    return <>{children}</>;
};

export default OnBoardingGuard;