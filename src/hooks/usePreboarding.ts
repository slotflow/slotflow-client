import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useAppNavigation } from './useAppNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { postPreBoarding } from '@/services/apis/user';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { handleError } from '@/shared/utils/helper/handleError';
import { updateBoardingStep } from '@/app/store/slices/appSlice';
import { ApiBaseResponse, ApiError } from '@/shared/types/common';
import { setAuthUser, setBoardingData } from '@/app/store/slices/authSlice';
import { PreBoardingRequest, PreBoardingResponse } from '@/shared/types/api/user';
import { UsePreBoardingReturn, SubmitPreBoardingHandlerProps } from '@/shared/types/hooks';
import { AdminVerificationStatus, HearAboutUsOptionValue, Role } from '@/shared/types/enums';

export const usePreBoarding = (): UsePreBoardingReturn => {

  const { goTo } = useAppNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { authUser, preboardingData } = useSelector((state: RootState) => state.auth);

  const submitPreBoardingMutation = useMutation<
    ApiBaseResponse<PreBoardingResponse>,
    ApiError,
    SubmitPreBoardingHandlerProps
  >({
    mutationFn: async ({ selectedOption, referralCode }) => {
      if (!authUser || !selectedOption || !preboardingData.selectedRole) {
        throw new Error('Details are missing. Please refresh the page.');
      }
      const payload: PreBoardingRequest = {
        role: preboardingData.selectedRole,
        whereDidHearAboutUs: selectedOption,
        referralCode:
          selectedOption === HearAboutUsOptionValue.REFERRAL && referralCode
            ? referralCode
            : undefined,
      };

      return await postPreBoarding(payload);
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

          goTo(
            preboardingData.selectedRole === Role.PROVIDER
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
  })

  const hearAboutUsHandler = () => {
    dispatch(updateBoardingStep(2));
    goTo(redirectPaths.PRE_BOARDING_ROLE);
  }

  return {
    submitPreBoarding: submitPreBoardingMutation.mutate,
    isPreboardingSubmitting: submitPreBoardingMutation.isPending,
    hearAboutUsHandler
  };
};
