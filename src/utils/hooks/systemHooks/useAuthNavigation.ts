import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "@/utils/interface/enums";
import { RedirectTo } from "@/utils/interface/commonInterface";

export const useAuthNavigation = () => {
  const navigate = useNavigate();

  const goToAuthPage = useCallback((role: Role, redirectPage: RedirectTo) => {
    let basePath = "";

    if (role === Role.Admin) basePath = "/admin";
    else if (role === Role.User) basePath = "/user";
    else if (role === Role.Provider) basePath = "/provider";

    let path = "";

    switch (redirectPage) {
      case RedirectTo.LOGIN:
        path = "/login";
        break;
      case RedirectTo.REGISTER:
        path = "/register";
        break;
      case RedirectTo.VERIFY_EMAIL:
        path = "/verify/email";
        break;
      case RedirectTo.RESET_PASSWORD:
        path = "/reset/password";
        break;
      case RedirectTo.VERIFY_OTP:
        path = "/verify/otp";
        break;
      case RedirectTo.PROVIDER_ADDRESS:
        path = "/onboarding/address";
        break;
      case RedirectTo.PROVIDER_SERVICE_DETAILS:
        path = "/onboarding/service";
        break;
      case RedirectTo.PROVIDER_AVAILABILITY:
        path = "/onboarding/availability";
        break;
      case RedirectTo.PROVIDER_PROOFS:
        path = "/onboarding/proofs";
        break;
      case RedirectTo.PROVIDER_APPROVAL_PENDING:
        path = "/onboarding/pending";
        break;
      default:
        path = "/login";
    }

    navigate(`${basePath}${path}`);
  }, [navigate]);

  return { goToAuthPage };
};
