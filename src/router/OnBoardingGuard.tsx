import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Role } from "@/shared/interface/enums";
import { RootState } from "@/shared/redux/appStore";
import { OnbooardingGuardProps } from "@/shared/interface/componentInterface";

const OnBoardingGuard: React.FC<OnbooardingGuardProps> = ({ 
    children 
}) => {
    const location = useLocation();
    console.log("onboarding guard rendered");
    const user = useSelector((store: RootState) => store.auth.authUser);

    if (!user) {
        console.log("user not found in onboarding guard");
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
    
    if (user.role === Role.ADMIN) {
        console.log("user is admin in onboarding guard");
        return <Navigate to="/admin" replace />;
    }

    if (!user.hasSelectedRole) {
        if (location.pathname !== "/onboarding/setup") {
            return <Navigate to="/onboarding/setup" replace />;
        }
        return <React.Fragment>{children}</React.Fragment>;
    }

    if (!user.isOnboardingCompleted) {
        if (!user.isAddressAdded && !user.isAddressVerified) {
            if (location.pathname !== "/onboarding/address") {
                return <Navigate to="/onboarding/address" replace />;
            }
        } else if (!user.isServiceDetailsAdded && !user.isServiceDetailsVerified) {
            if (location.pathname !== "/onboarding/service") {
                return <Navigate to="/onboarding/service" replace />;
            }
        } else if (!user.isServiceAvailabilityAdded && !user.isAvailabilityVerified) {
            if (location.pathname !== "/onboarding/availability") {
                return <Navigate to="/onboarding/availability" replace />;
            }
        } else if ((!user.isProofSubmitted?.identityProof || !user.isProofSubmitted.serviceProof) && !user.isProofsVerified) {
            if (location.pathname !== "/onboarding/proofs") {
                return <Navigate to="/onboarding/proofs" replace />;
            }
        } else if (!user.isAdminVerified) {
            if (location.pathname !== "/onboarding/pending") {
                return <Navigate to="/onboarding/pending" replace />;
            }
        }
    }

    return <React.Fragment>{children}</React.Fragment>;
};

export default OnBoardingGuard;