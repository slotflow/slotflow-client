import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Role } from "@/shared/interface/enums";
import { RootState } from "@/shared/redux/appStore";

export const useAuthCheckInLogin = (): void => {

  const navigate = useNavigate();
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  useEffect(() => {
    if (authUser?.isLoggedIn) {
      if (authUser.role === Role.ADMIN) {
        navigate("/admin/dashboard");
      } else if (authUser.role === Role.USER) {
        navigate("/user/dashboard");
      } else if (authUser.role === Role.PROVIDER) {
        navigate("/provider/dashboard");
      }
    }
  }, [authUser, navigate]);

};
