import { useNavigate } from 'react-router-dom';
import { AuthUser } from '@/shared/types/slice';
import { User } from '@/shared/types/entity/user';
import { useDispatch, useSelector } from 'react-redux';
import { Booking } from '@/shared/types/entity/booking';
import { Payment } from '@/shared/types/entity/payment';
import { redirectPaths } from '@/shared/utils/constants';
import { Plan } from '@/shared/types/entity/planInterface';
import { OnboardingStatus, Role } from '@/shared/types/enums';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { useAppNavigationReturn } from '@/shared/types/hooks';
import { updateBoardingStep } from '@/app/store/slices/appSlice';
import { Subscription } from '@/shared/types/entity/subscription';

export const useAppNavigation = (): useAppNavigationReturn => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { authUser } = useSelector((state: RootState) => state.auth);

  const handleAuthLoginNavigation = (user: AuthUser) => {
    if (!user) return;
    console.log("handleAuthLoginNavigation");
    console.log("user exist");

    // 1. Admin direct redirect
    if (user.role === Role.ADMIN) {
      navigate('/dashboard', { replace: true });
      return;
    }
  
    if (user.onboardingStatus === OnboardingStatus.NOT_STARTED) {
      navigate(redirectPaths.PRE_BOARDING_ROLE, { replace: true });
      return;
    }

    // 3. Provider Onboarding flow step resolution
    if (
      user.onboardingStatus === OnboardingStatus.IN_PROGRESS &&
      user.onboardingType === Role.PROVIDER
    ) {
      dispatch(updateBoardingStep(6));
      if (!user.isAddressAdded && !user.isAddressVerified) {
        navigate(redirectPaths.ONBOARDING_ADDRESS, { replace: true });
      } else if (!user.isServiceDetailsAdded && !user.isServiceDetailsVerified) {
        navigate(redirectPaths.ONBOARDING_SERVICE, { replace: true });
      } else if (!user.isServiceAvailabilityAdded && !user.isAvailabilityVerified) {
        navigate(redirectPaths.ONBOARDING_AVAILABILITY, { replace: true });
      } else if (!user.isProofSubmitted && !user.isProofsVerified) {
        navigate(redirectPaths.ONBOARDING_PROOFS, { replace: true });
      } else if (!user.isAdminVerified) {
        navigate(redirectPaths.ONBOARDING_PENDING, { replace: true });
      } else {
        navigate(redirectPaths.ONBOARDING_ADDRESS, { replace: true }); // Fallback
      }
      return;
    }

    // 4. Default role-based landing pages
    if (user.role === Role.USER) {
      navigate('/services', { replace: true });
    } else if (user.role === Role.PROVIDER) {
      navigate('/dashboard', { replace: true });
    }
  };

  const handleAdminGetProviderDetailPage = (subscriptionId: Subscription['_id']) => {
    if (authUser?.role === Role.ADMIN) {
      navigate(`/subscriptions/${subscriptionId}`);
    } else if (authUser?.role === Role.PROVIDER) {
      navigate(`/subscriptions/${subscriptionId}`);
    }
  };

  const handleGetPaymentDetailsPage = (paymentId: Payment['_id']) => {
    if (authUser?.role === Role.ADMIN) {
      navigate(`/payments/${paymentId}`);
    } else if (authUser?.role === Role.PROVIDER) {
      navigate(`/payments/${paymentId}`);
    } else if (authUser?.role === Role.USER) {
      navigate(`/payments/${paymentId}`);
    }
  };

  const handleNavigateToBookingsDetailPage = (appointmentId: Booking['_id']) => {
    if (authUser?.role === Role.PROVIDER) {
      navigate(`/bookings/${appointmentId}`);
    } else if (authUser?.role === Role.USER) {
      navigate(`/bookings/${appointmentId}`);
    }
  };

  const handleNavigateToPlanDetailPage = (planId: Plan['_id']) => {
    navigate(`/plans/${planId}`);
  };

  const handleGetProviderDetailPage = (providerId: string) => {
    navigate(`/service-providers/${providerId}`);
  };

  const handleGetUserDetailPage = (userId: User['_id']) => {
    navigate(`/users/${userId}`);
  };

  const toLogin = () => {
    navigate(redirectPaths.LOGIN, { replace: true });
  }

  const toSettings = () => {
    if (authUser?.role === Role.PROVIDER) {
      navigate(redirectPaths.SETTINGS, { replace: true });
    } else if (authUser?.role === Role.USER) {
      navigate(redirectPaths.SETTINGS, { replace: true });
    }
  }

  const toDashboard = (replace: boolean) => {
    if (authUser?.role === Role.PROVIDER) {
      navigate(redirectPaths.DASHBOARD, { replace });
    } else if (authUser?.role === Role.USER) {
      navigate(redirectPaths.DASHBOARD, { replace });
    } else if (authUser?.role === Role.ADMIN) {
      navigate(redirectPaths.DASHBOARD, { replace })
    }
  }

  const toBookings = (replace: boolean) => {
    if (authUser?.role === Role.PROVIDER) {
      navigate(redirectPaths.BOOKINGS, { replace });
    } else if (authUser?.role === Role.USER) {
      navigate(redirectPaths.BOOKINGS, { replace });
    }
  }

  const toIntegrations = (replace: boolean) => {
    if (authUser?.role === Role.PROVIDER) {
      navigate(redirectPaths.INTEGRATIONS, { replace });
    } else if (authUser?.role === Role.USER) {
      navigate(redirectPaths.INTEGRATIONS, { replace });
    }
  }

  const toUpgrade = (replace: boolean) => {
    navigate(redirectPaths.UPGRADE,{ replace });
  }

  return {
    handleAdminGetProviderDetailPage,
    handleGetPaymentDetailsPage,
    handleNavigateToBookingsDetailPage,
    handleNavigateToPlanDetailPage,
    handleGetProviderDetailPage,
    handleGetUserDetailPage,
    toLogin,
    toSettings,
    toDashboard,
    toBookings,
    toIntegrations,
    toUpgrade,
    handleAuthLoginNavigation
  };
};
