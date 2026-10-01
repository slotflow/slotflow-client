import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthUser } from '@/shared/types/slice';
import { User } from '@/shared/types/entity/user';
import { AppDispatch } from '@/app/store/appStore';
import { Booking } from '@/shared/types/entity/booking';
import { Payment } from '@/shared/types/entity/payment';
import { Plan } from '@/shared/types/entity/planInterface';
import { OnboardingStatus, Role } from '@/shared/types/enums';
import { useAppNavigationReturn } from '@/shared/types/hooks';
import { updateBoardingStep } from '@/app/store/slices/appSlice';
import { Subscription } from '@/shared/types/entity/subscription';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';

export const useAppNavigation = (): useAppNavigationReturn => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleAuthLoginNavigation = useCallback((user: AuthUser) => {
    if (!user) return;

    // 1. Admin direct redirect
    if (user.role === Role.ADMIN) {
      navigate('/dashboard', { replace: true });
      return;
    }

    if (user.onboardingStatus === OnboardingStatus.NOT_STARTED) {
      navigate(redirectPaths.PROFILE_SETUP_ROLE, { replace: true });
      return;
    }

    // 3. Provider Onboarding flow step resolution
    if (
      user.onboardingStatus === OnboardingStatus.IN_PROGRESS &&
      user.onboardingType === Role.PROVIDER
    ) {
      dispatch(updateBoardingStep(8));
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
      navigate(redirectPaths.SERVICES, { replace: true });
    } else if (user.role === Role.PROVIDER) {
      navigate(redirectPaths.DASHBOARD, { replace: true });
    }
  }, [navigate, dispatch]
  );
  
  const goTo = useCallback((path: string, replace = false) => {
    navigate(path, { replace });
  }, [navigate]);

  const toSubscriptionDetailsPage = useCallback(
    (subscriptionId: Subscription['_id'], replace = false) => {
      navigate(`${redirectPaths.SUBSCRIPTIONS}/${subscriptionId}`, { replace });
    },
    [navigate]
  );

  const toPaymentDetailsPage = useCallback(
    (paymentId: Payment['_id'], replace = false) => {
      navigate(`${redirectPaths.PAYMENTS}/${paymentId}`, { replace });
    },
    [navigate]
  );

  const toBookingsDetailsPage = useCallback(
    (appointmentId: Booking['_id'], replace = false) => {
      navigate(`${redirectPaths.BOOKINGS}/${appointmentId}`, { replace });
    }, [navigate]
  )

  const toPlanDetailsPage = useCallback(
    (planId: Plan['_id'], replace = false) => {
      navigate(`${redirectPaths.PLANS}/${planId}`, { replace });
    }, [navigate]
  )

  const toProviderDetailsPage = useCallback(
    (providerId: User["_id"], replace = false) => {
      navigate(`${redirectPaths.SERVICE_PROVIDERS}/${providerId}`, { replace });
    }, [navigate]
  )

  const toUserDetailsPage = useCallback(
    (userId: User['_id'], replace = false) => {
      navigate(`${redirectPaths.USERS}/${userId}`, { replace });
    }, [navigate]
  )

  return {
    goTo,
    toSubscriptionDetailsPage,
    toPaymentDetailsPage,
    toBookingsDetailsPage,
    toPlanDetailsPage,
    toProviderDetailsPage,
    toUserDetailsPage,
    handleAuthLoginNavigation
  };
};
