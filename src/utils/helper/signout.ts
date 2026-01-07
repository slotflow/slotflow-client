import { toast } from "react-toastify";
import { Role } from "../interface/enums";
import { roleRoutes } from "../constants";
import { signout } from "../apis/auth.api";
import { queryClient } from "@/lib/queryClient";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch, persistAppStore } from "@/utils/redux/appStore";

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
      dispatch({ type: 'RESET_STATE' });
      await persistAppStore.purge();
      queryClient.clear();
      queryClient.cancelQueries();
      if (role === Role.User) navigate(roleRoutes.user);
      else if (role === Role.Provider) navigate(roleRoutes.provider);
      else if (role === Role.Admin) navigate(roleRoutes.admin);
    }
  } catch {
    toast.error("Signout failed");
  }
};
