import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Role } from "@/shared/interface/enums";
import { RootState } from "@/shared/redux/appStore";

const OnBoardingGuard = ({ children }: { children: React.ReactNode }) => {

    const user = useSelector((store: RootState) => store.auth.authUser);

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    if (user.role === Role.ADMIN) {
        return <Navigate to="/admin" replace />;
    }

    if (!user.hasSelectedRole) {
        return <Navigate to="/onboarding/role-select" replace />;
    }

    if (!user.isOnboardingCompleted) {
        if (!user.isAddressAdded && !user.isAddressVerified)
            return <Navigate to="/onboarding/address" replace />;

        if (!user.isServiceDetailsAdded && !user.isServiceDetailsVerified)
            return <Navigate to="/onboarding/service" replace />;

        if (!user.isServiceAvailabilityAdded && !user.isAvailabilityVerified)
            return <Navigate to="/onboarding/availability" replace />;

        if (!user.isProofSubmitted && !user.isProofsVerified)
            return <Navigate to="/onboarding/proofs" replace />;

        if (!user.isAdminVerified)
            return <Navigate to="/onboarding/pending" replace />;
    }

    return <React.Fragment>{children}</React.Fragment>;
};

export default OnBoardingGuard;