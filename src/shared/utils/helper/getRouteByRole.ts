import { Role } from '../interface/enums';
import { sidebarRoutes } from '../utils/constants';
import { Route } from '../interface/commonInterface';

export const getRoutesByRole = (role: Role): Route[] => {
  return sidebarRoutes.filter((route) => {
    return (
      route.roles?.includes(role) ||
      route.subroutes?.some((subroute) => subroute.roles?.includes(role))
    );
  });
};
