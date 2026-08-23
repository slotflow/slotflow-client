import { Suspense, useEffect } from 'react';
import { Role } from '@/shared/types/enums';
import Sidebar from '@/components/navs/Sidebar';
import { AuthUser } from '@/shared/types/slice';
import InfoHeader from '@/components/navs/InfoHeader';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/app/store/slices/authSlice';
import { MainLayoutProps } from '@/shared/types/component';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingFallback from '../pages/common/LoadingFallback';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { connectEventSocket } from '@/services/socket/eventSocketThunk';
import { useNotificationPermissionGate } from '@/hooks/systemHooks/useNotificationPermissionGate';

const MainLayout = ({ routes, filteredRoutes, children, rightSidebar }: MainLayoutProps) => {
  const location = useLocation();
  const { isSidebarOpen } = useSelector((store: RootState) => store.app);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authUserStr = params.get('authUser');
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
        googleConnected: rawUser.googleConnected,

        stripeAccountStatus: rawUser.stripeAccountStatus,
        stripeCustomerId: rawUser.stripeCustomerId,

        allowPushNotification: rawUser.allowPushNotification,
      };
      dispatch(setAuthUser(authUser));
      window.history.replaceState({}, document.title, window.location.pathname);
      if (authUser.role === Role.USER) navigate('/user');
      else if (authUser.role === Role.PROVIDER) navigate('/provider');
    }
  }, [dispatch, navigate]);

  useNotificationPermissionGate();

  useEffect(() => {
    if (authUser) {
      dispatch(connectEventSocket());
    }
  }, [authUser, dispatch]);

  return (
    <div className="flex h-screen bg-background transition-all duration-300">
      {location.pathname !== '/provider/upgrade' && (
        <Sidebar routes={routes} filteredRoutes={filteredRoutes} />
      )}
      <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'w-[82%]' : 'w-[95%]'}`}>
        {location.pathname !== '/provider/upgrade' && <InfoHeader />}
        <div className="flex-1 overflow-y-auto no-scrollbar px-2 relative">
          <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
        </div>
      </div>
      {rightSidebar}
    </div>
  );
};

export default MainLayout;
