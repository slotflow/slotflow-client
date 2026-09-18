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

    // 1. Admin direct redirect
    if (user.role === Role.ADMIN) {
      navigate('/admin/dashboard', { replace: true });
      return;
    }

    // 2. Pre boarding redirect
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
      navigate('/user', { replace: true });
    } else if (user.role === Role.PROVIDER) {
      navigate('/provider', { replace: true });
    }
  };

  const handleAdminGetProviderDetailPage = (subscriptionId: Subscription['_id']) => {
    if (authUser?.role === Role.ADMIN) {
      navigate(`/admin/subscriptions/${subscriptionId}`);
    } else if (authUser?.role === Role.PROVIDER) {
      navigate(`/provider/subscriptions/${subscriptionId}`);
    }
  };

  const handleGetPaymentDetailsPage = (paymentId: Payment['_id']) => {
    if (authUser?.role === Role.ADMIN) {
      navigate(`/admin/payments/${paymentId}`);
    } else if (authUser?.role === Role.PROVIDER) {
      navigate(`/provider/payments/${paymentId}`);
    } else if (authUser?.role === Role.USER) {
      navigate(`/user/payments/${paymentId}`);
    }
  };

  const handleNavigateToBookingsDetailPage = (appointmentId: Booking['_id']) => {
    if (authUser?.role === Role.PROVIDER) {
      navigate(`/provider/bookings/${appointmentId}`);
    } else if (authUser?.role === Role.USER) {
      navigate(`/user/bookings/${appointmentId}`);
    }
  };

  const handleNavigateToPlanDetailPage = (planId: Plan['_id']) => {
    navigate(`/admin/plans/${planId}`);
  };

  const handleGetProviderDetailPage = (providerId: string) => {
    navigate(`/admin/service-providers/${providerId}`);
  };

  const handleGetUserDetailPage = (userId: User['_id']) => {
    navigate(`/admin/users/${userId}`);
  };
  
  const toLogin = () => {
    navigate(redirectPaths.LOGIN, { replace: true });
  }

  return {
    handleAdminGetProviderDetailPage,
    handleGetPaymentDetailsPage,
    handleNavigateToBookingsDetailPage,
    handleNavigateToPlanDetailPage,
    handleGetProviderDetailPage,
    handleGetUserDetailPage,
    toLogin,
    handleAuthLoginNavigation
  };
};
