import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/utils/redux/appStore";

export const useAuthCheckInLogin = () => {
    
  const navigate = useNavigate();
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  useEffect(() => {
    if (authUser?.isLoggedIn) {
      if (authUser.role === "ADMIN") {
        navigate("/admin/overview");
      } else if (authUser.role === "USER") {
        navigate("/user/dashboard");
      } else if (authUser.role === "PROVIDER") {
        navigate("/provider/dashboard");
      }
    }
  }, [authUser, navigate]);
};
