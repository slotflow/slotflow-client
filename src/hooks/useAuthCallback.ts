import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { AuthUser } from "@/shared/types/slice";
import { AppDispatch } from "@/app/store/appStore";
import { useAppNavigation } from "./useAppNavigation";
import { setAuthUser } from "@/app/store/slices/authSlice";
import { UseAuthCallbackReturn } from "@/shared/types/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authCallbackLoadingSteps } from "@/shared/utils/constants/landingConstants";

export const useAuthCallback = (): UseAuthCallbackReturn => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    const [stepIndex, setStepIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const { handleAuthLoginNavigation } = useAppNavigation();

    useEffect(() => {
        const handleAuthCallback = () => {
            try {
                const rawResponse = searchParams.get('response');

                if (!rawResponse) {
                    throw new Error('No authentication payload found in URL.');
                }

                const payload = JSON.parse(decodeURIComponent(rawResponse));

                console.log("payload : ",payload);

                if (!payload.success) {
                    throw new Error(payload.error || 'Authentication was cancelled or failed.');
                }

                const rawUser = payload.user;
                console.log("rawUser : ",rawUser);

                if (!rawUser) {
                    throw new Error('User data missing from authentication response.');
                }

                const authUser: AuthUser = {
                    uid: rawUser._id,
                    username: rawUser.username,
                    email: rawUser.email,
                    role: rawUser.role,
                    onboardingStatus: rawUser.onboardingStatus,
                    onboardingType: rawUser.onboardingType,
                    isBlocked: rawUser.isBlocked,
                    isLoggedIn: true,
                    phone: rawUser.phone,
                    profileImage: rawUser.profileImage,
                    isAddressAdded: rawUser.isAddressAdded,
                    isServiceDetailsAdded: rawUser.isServiceDetailsAdded,
                    isServiceAvailabilityAdded: rawUser.isServiceAvailabilityAdded,
                    isProofSubmitted: rawUser.isProofSubmitted,
                    isAddressVerified: rawUser.isAddressVerified,
                    isServiceDetailsVerified: rawUser.isServiceDetailsVerified,
                    isAvailabilityVerified: rawUser.isAvailabilityVerified,
                    isProofsVerified: rawUser.isProofsVerified,
                    isAdminVerified: rawUser.isAdminVerified,
                    providerSubscription: rawUser.providerSubscription,
                    verificationRejectionReason: rawUser.verificationRejectionReason,
                    adminVerificationStatus: rawUser.adminVerificationStatus,
                    allowPushNotification: rawUser.allowPushNotification,
                    hasUsedTrial: rawUser.hasUsedTrial
                };
                dispatch(setAuthUser(authUser));
                window.history.replaceState({}, document.title, window.location.pathname);
                handleAuthLoginNavigation(rawUser);

            } catch (err: any) {
                setError(err.message || 'An unexpected authentication error occurred.');
            }
        };

        handleAuthCallback();
    }, [searchParams, navigate]);

    useEffect(() => {
        if (error) return;

        const interval = setInterval(() => {
            setStepIndex((prev) => (prev + 1) % authCallbackLoadingSteps.length);
        }, 2200);

        return () => clearInterval(interval);
    }, [error]);

    return { stepIndex, error };
}