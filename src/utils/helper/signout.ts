import { toast } from "react-toastify";
import { Role } from "../interface/enums";
import { signout } from "../apis/auth.api";
import { queryClient } from "@/lib/queryClient";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "@/utils/redux/appStore";
import { clearUserSlice } from "../redux/slices/userSlice";
import { clearChatSlice } from "../redux/slices/chatSlice";
import { clearAdminSlice } from "../redux/slices/adminSlice";
import { clearProviderSlice } from "../redux/slices/providerSlice";

export const handleSignoutHelper = async ({
  role,
  dispatch,
  navigate,
}: {
  role: Role;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
}) => {
  try {
    const res = await dispatch(signout()).unwrap();
    if (res.success) {
      toast.success(res.message);
      dispatch(clearChatSlice());
      dispatch(clearProviderSlice());
      dispatch(clearAdminSlice());
      dispatch(clearUserSlice());
      queryClient.clear();
      queryClient.cancelQueries();
      if (role === "USER") navigate("/user/login");
      else if (role === "PROVIDER") navigate("/provider/login");
      else if (role === "ADMIN") navigate("/admin/login");
    }
  } catch {
    toast.error("Signout failed");
  }
};
