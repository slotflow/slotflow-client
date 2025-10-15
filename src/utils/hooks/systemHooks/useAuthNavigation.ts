import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthFormType, Role } from "@/utils/interface/commonInterface";

export const useAuthNavigation = () => {
  const navigate = useNavigate();

  const goToAuthPage = useCallback((role: Role, formType: AuthFormType) => {
    let basePath = "";

    if (role === "ADMIN") basePath = "/admin";
    else if (role === "USER") basePath = "/user";
    else if (role === "PROVIDER") basePath = "/provider";

    let path = "";

    switch (formType) {
      case AuthFormType.LOGIN:
        path = "/login";
        break;
      case AuthFormType.REGISTER:
        path = "/register";
        break;
      case AuthFormType.VERIFY_EMAIL:
        path = "/verify/email";
        break;
      case AuthFormType.RESET_PASSWORD:
        path = "/reset/password";
        break;
      case AuthFormType.VERIFY_OTP:
        path = "/verify/otp";
        break;
      default:
        path = "/login";
    }

    navigate(`${basePath}${path}`);
  }, [navigate]);

  return { goToAuthPage };
};
