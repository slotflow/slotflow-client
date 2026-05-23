import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/navs/Sidebar";
import { Role } from "@/shared/interface/enums";
import React, { Suspense, useEffect } from "react";
import InfoHeader from "@/components/navs/InfoHeader";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "@/shared/interface/commonInterface";
import { AuthUser } from "@/shared/interface/sliceInterface";
import { setAuthUser } from "@/shared/redux/slices/authSlice";
import LoadingFallback from "../pages/common/LoadingFallback";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { connectEventSocket } from "@/shared/socket/eventSocketThunk";
import { useNotificationPermissionGate } from "@/hooks/systemHooks/useNotificationPermissionGate";

export interface MainLayoutProps {
    routes: Route[];
    filteredRoutes?: Route[];
    profileImage?: string;
    username?: string;
    children: React.ReactNode;
    rightSidebar?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    routes,
    filteredRoutes,
    profileImage,
    username,
    children,
    rightSidebar,
}) => {

    console.log("Main Layout")
    const { sidebarOpen } = useSelector((store: RootState) => store.app);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const authUser = useSelector((state: RootState) => state.auth.authUser);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const authUserStr = params.get("authUser");
        if (!authUserStr) return;
        if (authUserStr) {
            const rawUser = JSON.parse(decodeURIComponent(authUserStr));
            if (!rawUser || !rawUser.googleId) return;
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

                googleId: rawUser.googleId,
                googleConnected: rawUser.googleConnected,

                stripeConnected: rawUser.stripeConnected,
                stripeAccountId: rawUser.stripeAccountId,
                stripeCustomerId: rawUser.stripeCustomerId,

                allowPushNotification: rawUser.allowPushNotification,
            };
            dispatch(setAuthUser(authUser));
            window.history.replaceState({}, document.title, window.location.pathname);
            if (authUser.role === Role.USER) navigate('/user');
            else if (authUser.role === Role.PROVIDER) navigate('/provider');
        }
    }, []);

    useNotificationPermissionGate();

    useEffect(() => {
        console.log("authUser : ", authUser);
        if (authUser) {
            console.log("Connecting event Socket");
            dispatch(connectEventSocket());
        }
    }, [authUser, dispatch]);

    return (
        <div className="flex h-screen bg-[var(--background)] transition-all duration-300">
            <Sidebar routes={routes} filteredRoutes={filteredRoutes} />
            <div className={`flex-1 flex flex-col ${sidebarOpen ? 'w-[82%]' : 'w-[95%]'}`}>
                <InfoHeader profileImage={profileImage} username={username ?? ""} />
                <div className="flex-1 overflow-y-auto no-scrollbar px-2 relative">
                    <Suspense fallback={<LoadingFallback />}>
                        {children}
                    </Suspense>
                </div>
            </div>
            {rightSidebar}
        </div>
    )
}

export default MainLayout;