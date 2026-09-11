import { useEffect } from 'react';
import MainLayout from './MainLayout';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/appStore';
import { PlanName, Role } from '@/shared/types/enums';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import PaymentSelection from '@/components/payment/PaymentSelection';
import { planAccessMap } from '@/shared/utils/constants/planConstants';
import { getRoutesByRole } from '@/shared/utils/helper/getRouteByRole';
import ProviderFreeSubscription from '@/components/provider/ProviderFreeSubscription';
import NotificationsContainer from '@/components/notification/NotificationsContainer';

const ProviderLayout = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const authUser = useSelector((store: RootState) => store.auth.authUser);
  const { isOpen, subscriptionData } = useSelector((store: RootState) => store.payment);

  const planName = authUser?.providerSubscription;
  const allowedRouteNames = planName
    ? planAccessMap[planName]
    : planAccessMap[PlanName.NO_SUBSCRIPTION];
  const providerRoutes = getRoutesByRole(Role.PROVIDER);
  const accessibleRoutes = providerRoutes.filter((route) => allowedRouteNames.includes(route.name));

  useEffect(() => {
    if (!authUser) return;

    if (!authUser.isAddressAdded && !authUser.isAddressVerified) {
      navigate('/provider/onboarding/address');
      return;
    }

    if (!authUser.isServiceDetailsAdded && !authUser.isServiceDetailsVerified) {
      navigate('/provider/onboarding/service');
      return;
    }

    if (!authUser.isServiceAvailabilityAdded && !authUser.isAvailabilityVerified) {
      navigate('/provider/onboarding/availability');
      return;
    }

    if (!authUser.isProofSubmitted && !authUser.isProofsVerified) {
      navigate('/provider/onboarding/proofs');
      return;
    }

    if (!authUser.isAdminVerified) {
      navigate('/provider/onboarding/pending');
      return;
    }

    if (authUser.isAdminVerified && (pathname === '/provider' || pathname === '/provider/')) {
      navigate('/provider/dashboard');
      return;
    }
  }, [authUser, navigate, pathname]);

  return (
    <MainLayout routes={providerRoutes} filteredRoutes={accessibleRoutes}>
      <Outlet />
      {isOpen && !subscriptionData?.isTrialPlan && authUser?.role === Role.PROVIDER && (
        <PaymentSelection />
      )}
      {subscriptionData?.isTrialPlan && <ProviderFreeSubscription />}
      <NotificationsContainer />
    </MainLayout>
  );
};

export default ProviderLayout;
