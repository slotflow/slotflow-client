import { useCallback } from "react";
import { roleArray } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { RedirectTo, RoleType } from "@/utils/interface/commonInterface";

export const useAuthNavigation = () => {
  const navigate = useNavigate();

  const goToAuthPage = useCallback((role: RoleType, redirectPage: RedirectTo) => {
    let basePath = "";

    if (role === roleArray[0]) basePath = "/admin";
    else if (role === roleArray[1]) basePath = "/user";
    else if (role === roleArray[2]) basePath = "/provider";

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
