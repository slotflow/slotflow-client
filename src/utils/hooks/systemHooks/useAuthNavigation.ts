import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "@/utils/interface/enums";
import { basePaths, redirectPaths } from "@/utils/constants";
import { RedirectTo } from "@/utils/interface/commonInterface";

export const useAuthNavigation = () => {
  const navigate = useNavigate();

  const goToAuthPage = useCallback((role: Role, redirectPage: RedirectTo) => {
    let basePath: string = "";

    if (role === Role.Admin) basePath = basePaths.admin;
    else if (role === Role.User) basePath = basePaths.user;
    else if (role === Role.Provider) basePath = basePaths.provider;

    let path = redirectPaths[redirectPage] ?? basePaths.login;

    navigate(`${basePath}${path}`);
  }, [navigate]);

  return { goToAuthPage };
};
