import React, { useEffect } from "react";
import Header from "@/components/navs/Header";
import { Role } from "@/shared/interface/enums";
import FooterBar from "@/components/navs/FooterBar";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthUser } from "@/shared/interface/sliceInterface";
import { setAuthUser } from "@/shared/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { connectEventSocket } from "@/shared/socket/eventSocketThunk";
import { useNotificationPermissionGate } from "@/hooks/systemHooks/useNotificationPermissionGate";

const LandingLayout = () => {

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
    if (authUser) {
      console.log("Connecting event Socket");
      dispatch(connectEventSocket());
    }
  }, [authUser, dispatch]);

  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <FooterBar />
    </React.Fragment>
  )
}

export default LandingLayout