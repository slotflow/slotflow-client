import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/appStore';
import { Navigate, useLocation } from 'react-router-dom';
import { OnboardingStatus, Role } from '@/shared/types/enums';
import { OnbooardingGuardProps } from '@/shared/types/component';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';

const OnBoardingGuard = ({ children }: OnbooardingGuardProps) => {
  const location = useLocation();
  const { authUser: user, profileSetupData } = useSelector((store: RootState) => store.auth);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role !== Role.ADMIN && user.onboardingStatus === OnboardingStatus.NOT_STARTED) {
    if (!profileSetupData || !profileSetupData.selectedRole) {
      if (location.pathname !== redirectPaths.PROFILE_SETUP_ROLE) {
        return <Navigate to={redirectPaths.PROFILE_SETUP_ROLE} replace />;
      }
    } else {
      if (
        location.pathname !== redirectPaths.PROFILE_SETUP_ROLE &&
        location.pathname !== redirectPaths.PROFILE_SETUP_USERNAME &&
        location.pathname !== redirectPaths.PROFILE_SETUP_HEAR_ABOUT_US
      ) {
        return <Navigate to={redirectPaths.PROFILE_SETUP_USERNAME} replace />;
      }
    }

    return <>{children}</>;
  }

  if (
    user.onboardingStatus === OnboardingStatus.IN_PROGRESS &&
    user.onboardingType === Role.PROVIDER
  ) {
    if (!user.isAddressAdded && !user.isAddressVerified) {
      if (location.pathname !== '/onboarding/address') {
        return <Navigate to="/onboarding/address" replace />;
      }
    } else if (!user.isServiceDetailsAdded && !user.isServiceDetailsVerified) {
      if (location.pathname !== '/onboarding/service') {
        return <Navigate to="/onboarding/service" replace />;
      }
    } else if (!user.isServiceAvailabilityAdded && !user.isAvailabilityVerified) {
      if (location.pathname !== '/onboarding/availability') {
        return <Navigate to="/onboarding/availability" replace />;
      }
    } else if (
      (!user.isProofSubmitted?.identityProof || !user.isProofSubmitted?.serviceProof) &&
      !user.isProofsVerified
    ) {
      if (location.pathname !== '/onboarding/proofs') {
        return <Navigate to="/onboarding/proofs" replace />;
      }
    } else if (!user.isAdminVerified) {
      if (location.pathname !== '/onboarding/pending') {
        return <Navigate to="/onboarding/pending" replace />;
      }
    }
  }

  return <>{children}</>;
};

export default OnBoardingGuard;
