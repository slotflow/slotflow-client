import { Role } from '../../types/enums';
import { Route } from '../../types/common';
import { sidebarRoutes } from '../constants/routeConstants';

export const getRoutesByRole = (role: Role): Route[] => {
  if (!role) return [];

  return sidebarRoutes
    .filter((route) => {
      const hasParentRole = route.roles?.includes(role);
      const hasSubrouteRole = route.subroutes?.some((sub) => sub.roles?.includes(role));
      return hasParentRole || hasSubrouteRole;
    })
    .map((route) => {
      if (route.subroutes) {
        return {
          ...route,
          subroutes: route.subroutes.filter((sub) => sub.roles?.includes(role)),
        };
      }
      return route;
    });
};
