import { Role } from '../../types/enums';
import { sidebarRoutes } from '../constants';
import { Route } from '../../types/common';

export const getRoutesByRole = (role: Role): Route[] => {
  return sidebarRoutes.filter((route) => {
    return (
      route.roles?.includes(role) ||
      route.subroutes?.some((subroute) => subroute.roles?.includes(role))
    );
  });
};
