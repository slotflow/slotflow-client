import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "@/shared/interface/enums";
import { basePaths, redirectPaths } from "@/shared/utils/constants";
import { RedirectTo } from "@/shared/interface/commonInterface";

interface useAuthNavigationReturnInterface {
  goToAuthPage: (role: Role, redirectPage: RedirectTo) => void;
}

export const useAuthNavigation = (): useAuthNavigationReturnInterface => {

  const navigate = useNavigate();

  const goToAuthPage = useCallback((role: Role, redirectPage: RedirectTo) => {
    let basePath: string = "";

    if (role === Role.ADMIN) basePath = basePaths.admin;
    else if (role === Role.USER) basePath = basePaths.user;
    else if (role === Role.PROVIDER) basePath = basePaths.provider;

    let path = redirectPaths[redirectPage] ?? basePaths.login;

    navigate(`${basePath}${path}`);
  }, [navigate]);

  return { goToAuthPage };

};
