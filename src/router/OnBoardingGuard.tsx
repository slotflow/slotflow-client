import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Role } from "@/shared/interface/enums";
import { RootState } from "@/shared/redux/appStore";

const OnBoardingGuard = ({ children }: { children: React.ReactNode }) => {

    const user = useSelector((store: RootState) => store.auth.authUser);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!user.hasSelectedRole) {
        return user.role === Role.USER ? (
            <Navigate to="/user/onboarding/role-select" replace />
        ) : (
            <Navigate to="/provider/onboarding/role-select" replace />
        );
    }

    if (user.role === Role.PROVIDER) {
        if (!user.isAddressAdded) return <Navigate to="/provider/onboarding/address" replace />;
        if (!user.isServiceDetailsAdded) return <Navigate to="/provider/onboarding/service" replace />;
        if (!user.isServiceAvailabilityAdded) return <Navigate to="/provider/onboarding/availability" replace />;
        if (!user.isProofSubmitted) return <Navigate to="/provider/onboarding/proofs" replace />;
        if (!user.isAdminVerified) return <Navigate to="/provider/onboarding/pending" replace />;
    }

    return <React.Fragment>{children}</React.Fragment>;
};

export default OnBoardingGuard;