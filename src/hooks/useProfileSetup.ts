import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useAppNavigation } from './useAppNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { postProfileSetup } from '@/services/apis/user';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { handleError } from '@/shared/utils/helper/handleError';
import { ApiBaseResponse, ApiError } from '@/shared/types/common';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';
import { setAuthUser, setBoardingData } from '@/app/store/slices/authSlice';
import { updateBoardingStep } from '@/app/store/slices/appSlice';
import { ProfileSetupRequest, PreBoardingResponse } from '@/shared/types/api/user';
import { UseProfileSetupReturn, SubmitProfileSetupHandlerProps } from '@/shared/types/hooks';
import { AdminVerificationStatus, HearAboutUsOptionValue, Role } from '@/shared/types/enums';

export const useProfileSetup = (): UseProfileSetupReturn => {
  const { goTo } = useAppNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { authUser, profileSetupData } = useSelector((state: RootState) => state.auth);

  const submitPreBoardingMutation = useMutation<
    ApiBaseResponse<PreBoardingResponse>,
    ApiError,
    SubmitProfileSetupHandlerProps
  >({
    mutationFn: async ({ selectedOption, referralCode }) => {
      if (
        !authUser ||
        !selectedOption ||
        !profileSetupData.selectedRole ||
        !profileSetupData.username
      ) {
        throw new Error('Details are missing. Please refresh the page.');
      }
      const payload: ProfileSetupRequest = {
        role: profileSetupData.selectedRole,
        username: profileSetupData.username,
        whereDidHearAboutUs: selectedOption,
        referralCode:
          selectedOption === HearAboutUsOptionValue.REFERRAL && referralCode
            ? referralCode
            : undefined,
      };

      return await postProfileSetup(payload);
    },
    onSuccess: (res) => {
      if (res.success && res.data) {
        if (authUser) {
          dispatch(
            setAuthUser({
              ...authUser,
              onboardingStatus: res.data.onboardingStatus,
              onboardingType: res.data.onboardingType,
              adminVerificationStatus:
                res.data.adminVerificationStatus ?? AdminVerificationStatus.NOT_REQUESTED,
            }),
          );

          toast.success(res.message);

          if (profileSetupData.selectedRole === Role.PROVIDER) {
            dispatch(updateBoardingStep(8));
          }

          goTo(
            profileSetupData.selectedRole === Role.PROVIDER
              ? redirectPaths.ONBOARDING_ADDRESS
              : redirectPaths.SERVICES,
          );
        }
        dispatch(
          setBoardingData({
            selectedRole: null,
          }),
        );
      } else {
        toast.error(res.message || 'Failed to preboard, please try again');
      }
    },

    onError: (error: ApiError) => {
      handleError(error, 'Something went wrong. Please try again.');
    },
  });

  return {
    submitPrfoleSetup: submitPreBoardingMutation.mutate,
    isProfileSetupSubmitting: submitPreBoardingMutation.isPending,
  };
};
