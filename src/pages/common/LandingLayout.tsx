import { useEffect } from "react";
import Header from "@/components/navs/Header";
import { pathNames } from "@/shared/utils/constants";
import { Role } from "@/shared/interface/enums";
import FooterBar from "@/components/navs/FooterBar";
import { AppDispatch, RootState } from "../../shared/redux/appStore";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";
import { AuthUser } from "@/shared/interface/sliceInterface";
import { setAuthUser } from "@/shared/redux/slices/authSlice";
import { setAuthModal } from "@/shared/redux/slices/appSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthSelectionModal from "@/components/landing/AuthSelectionModal";
import { useNotificationPermissionGate } from "@/hooks/systemHooks/useNotificationPermissionGate";
import { connectEventSocket } from "@/shared/socket/eventSocketThunk";

const LandingLayout = () => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = useSelector((state: RootState) => state.app);
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const themeMode = useSelector((store: RootState) => store.app?.lightTheme);
  const shouldHideFooter = pathNames.some((path) => location.pathname.startsWith(path));

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
        profileImage: rawUser.profileImage,
        isBlocked: rawUser.isBlocked,
        role: rawUser.role,
        isLoggedIn: true,
        isAddressAdded: rawUser.isAddressAdded,
        isServiceDetailsAdded: rawUser.isServiceDetailsAdded,
        isServiceAvailabilityAdded: rawUser.isServiceAvailabilityAdded,
        isProofSubmitted: rawUser.isProofSubmitted,
        isAdminVerified: rawUser.isAdminVerified,
        googleId: rawUser.googleId,
        googleConnected: rawUser.googleConnected,
        providerSubscription: rawUser.providerSubscription,
        isAddressVerified: rawUser.isAddressVerified,
        isAvailabilityVerified: rawUser.isAvailabilityVerified,
        isProofsVerified: rawUser.isProofsVerified,
        isServiceDetailsVerified: rawUser.isServiceDetailsVerified,
        verificationRejectionReason: rawUser.verificationRejectionReason,
        adminVerificationStatus: rawUser.adminVerificationStatus,
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
    // Connect when user logs in, but only if not already connected
    if (authUser) {
      console.log("Connecting event Socket");
      dispatch(connectEventSocket());
    }

    // We remove the auto-disconnect on cleanup to prevent navigation-based disconnects.
    // Disconnection is now handled explicitly in the signout process.
  }, [authUser, dispatch]);

  const handleCloseModal = () => {
    dispatch(setAuthModal(false));
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        theme={themeMode ? "light" : "dark"}
        transition={Bounce}
      />
      {!shouldHideFooter && <Header />}
      {state.authModal && <AuthSelectionModal onClose={handleCloseModal} />}
      <Outlet />
      {!shouldHideFooter && <FooterBar />}
    </>
  )
}

export default LandingLayout