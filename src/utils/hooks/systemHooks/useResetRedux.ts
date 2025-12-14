import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/appStore";
import { pushService } from "@/utils/redux/slices/userSlice";
import { setAuthUser } from "@/utils/redux/slices/authSlice";
import { RoleType } from "@/utils/interface/commonInterface";
import { setMessages, setOnlineUsers, setSelectedUser } from "@/utils/redux/slices/chatSlice";
import { addAvailability, setPaymentSelectionPage, setSubscriptionIsTrailPlan, setSubscriptionPlanDuration, setSubscriptionPlanId } from "@/utils/redux/slices/providerSlice";

export const useResetRedux = () => {
    
    const dispatch = useDispatch<AppDispatch>();

    const resetCommon = () => {
    dispatch(setAuthUser(null));
    dispatch(setMessages(null));
    dispatch(setSelectedUser(null));
    dispatch(setOnlineUsers(null));
    dispatch(setPaymentSelectionPage(false));
  };

  const resetUser = () => {
    dispatch(pushService(null));
  };

  const resetProvider = () => {
    dispatch(setSubscriptionPlanId(null));
    dispatch(setSubscriptionPlanDuration(null));
    dispatch(setSubscriptionIsTrailPlan(false));
    dispatch(addAvailability(null));
  };

  const resetAdmin = () => {
    // Add admin-specific dispatches here if needed
  };

  return (role: RoleType) => {

    resetCommon();

    if (role === "USER") {
      resetUser();
    } else if (role === "PROVIDER") {
      resetProvider();
    } else if (role === "ADMIN") {
      resetAdmin();
    }
  };
}