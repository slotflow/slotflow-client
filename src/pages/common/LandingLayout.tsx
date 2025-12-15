import { useEffect } from "react";
import Header from "@/components/Navs/Header";
import { pathNames } from "@/utils/constants";
import FooterBar from "@/components/Navs/FooterBar";
import { RootState } from "../../utils/redux/appStore";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";
import { AuthUser } from "@/utils/interface/sliceInterface";
import { setAuthUser } from "@/utils/redux/slices/authSlice";
import { setAuthModal } from "@/utils/redux/slices/appSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthSelectionModal from "@/components/common/landing/AuthSelectionModal";

const LandingLayout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = useSelector((state: RootState) => state.app);
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
        isAddressAdded: rawUser.addressId ? true : false,
        isServiceDetailsAdded: rawUser.serviceId ? true : false,
        isServiceAvailabilityAdded: rawUser.serviceAvailabilityId ? true : false,
        isAdminVerified: rawUser.isAdminVerified,
        googleId: rawUser.googleId,
        googleConnected: rawUser.googleConnected,
        updatedAt: rawUser.updatedAt,
      };
      dispatch(setAuthUser(authUser));
      window.history.replaceState({}, document.title, window.location.pathname);
      if (authUser.role === "USER") navigate('/user');
      else if (authUser.role === "PROVIDER") navigate('/provider/dashboard');
    }
  }, []);

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