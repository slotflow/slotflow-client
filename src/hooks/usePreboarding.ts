import { useDispatch } from "react-redux";
import { appConfig } from "@/shared/config/env";
import { postPreBoarding } from "@/shared/apis/user";
import { AppDispatch } from "@/shared/redux/appStore";
import { setAuthUser, setBoardingData } from "@/shared/redux/slices/authSlice";
import { AdminVerificationStatus, HearAboutUsOptionValue } from "@/shared/interface/enums";
import { SubmitPreBoardingHandlerProps, UsePreBoardingReturn } from "@/shared/interface/hooksInterface";

export const usePreBoarding = (): UsePreBoardingReturn => {

    const dispatch = useDispatch<AppDispatch>();

    const submitPreBoardingHandler = async ({
        authUser,
        selectedRole,
        selectedOption,
        referralCode,
    }: SubmitPreBoardingHandlerProps) => {
        try {
            dispatch(
                setBoardingData({
                    hearAboutUsOption: selectedOption,
                    referralCode,
                })
            );

            const res = await postPreBoarding({
                role: selectedRole,
                whereDidHearAboutUs: selectedOption,
                referralCode:
                    selectedOption === HearAboutUsOptionValue.REFERRAL &&
                    referralCode
                        ? referralCode
                        : undefined,
            });

            if (!res.success || !res.data) {
                return res;
            }

            if (authUser) {
                dispatch(
                    setAuthUser({
                        ...authUser,
                        onboardingStatus: res.data.onboardingStatus,
                        onboardingType: res.data.onboardingType,
                        adminVerificationStatus:
                            res.data.adminVerificationStatus ??
                            AdminVerificationStatus.NOT_REQUESTED,
                    })
                );
            }

            dispatch(
                setBoardingData({
                    selectedRole: null,
                    hearAboutUsOption: null,
                    referralCode: null,
                })
            );

            return res;
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.log(
                    "Something went wrong while submitting preboarding data:",
                    error
                );
            }

            return {
                success: false,
                message: "Something went wrong. Please try again.",
            };
        }
    };

    return {
        submitPreBoardingHandler,
    };
};