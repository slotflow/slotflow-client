import { useEffect } from 'react';
import MainLayout from './MainLayout';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/appStore';
import { PlanName, Role } from '@/shared/types/enums';
import { Outlet, useLocation } from 'react-router-dom';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import PaymentSelection from '@/components/payment/PaymentSelection';
import { planAccessMap } from '@/shared/utils/constants/planConstants';
import { getRoutesByRole } from '@/shared/utils/helper/getRouteByRole';
import NotificationsContainer from '@/components/notification/NotificationsContainer';

const ProviderLayout = () => {
  
  const { goTo } = useAppNavigation(); 
  const pathname = useLocation().pathname;
  const authUser = useSelector((store: RootState) => store.auth.authUser);
  const { isPaymentModalOpen, subscriptionData } = useSelector((store: RootState) => store.payment);

  const planName = authUser?.providerSubscription;
  const allowedRouteNames = planName
    ? planAccessMap[planName]
    : planAccessMap[PlanName.NO_SUBSCRIPTION];
  const providerRoutes = getRoutesByRole(Role.PROVIDER);
  const accessibleRoutes = providerRoutes.filter((route) => allowedRouteNames.includes(route.name));

  useEffect(() => {
    if (!authUser) return;

    if (!authUser.isAddressAdded && !authUser.isAddressVerified) {
      goTo(redirectPaths.ONBOARDING_ADDRESS);
      return;
    }
    
    if (!authUser.isServiceDetailsAdded && !authUser.isServiceDetailsVerified) {
      goTo(redirectPaths.ONBOARDING_SERVICE);
      return;
    }
    
    if (!authUser.isServiceAvailabilityAdded && !authUser.isAvailabilityVerified) {
      goTo(redirectPaths.ONBOARDING_AVAILABILITY);
      return;
    }
    
    if (!authUser.isProofSubmitted && !authUser.isProofsVerified) {
      goTo(redirectPaths.ONBOARDING_PROOFS);
      return;
    }
    
    if (!authUser.isAdminVerified) {
      goTo(redirectPaths.ONBOARDING_PENDING);
      return;
    }

    if (authUser.isAdminVerified && (pathname === '/provider' || pathname === '/provider/')) {
      goTo(redirectPaths.DASHBOARD);
      return;
    }
  }, [authUser, goTo, pathname]);

  return (
    <MainLayout routes={providerRoutes} filteredRoutes={accessibleRoutes}>
      <Outlet />
      {isPaymentModalOpen && subscriptionData && authUser?.role === Role.PROVIDER && (
        <PaymentSelection />
      )}
      <NotificationsContainer />
    </MainLayout>
  );
};

export default ProviderLayout;
