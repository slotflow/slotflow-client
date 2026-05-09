import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { appConfig } from "@/shared/config/env";
import { Button } from "@/components/ui/button";
import { RootState } from "@/shared/redux/appStore";
import { postPreBoarding } from "@/shared/apis/user";
import { ChevronLeft, Loader, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "recharts/types/state/store";
import { setAuthUser, setBoardingData } from "@/shared/redux/slices/authSlice";
import { AdminVerificationStatus, HearAboutUsOptionValue, Role } from "@/shared/interface/enums";
import { defaultButtonClassName, hearAboutUsOptions, redirectPaths } from "@/shared/utils/constants";

const HearAboutUsPage: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [referralCode, setReferralCode] = useState<string | null>(null);
    const { authUser, boardingData } = useSelector((state: RootState) => state.auth);
    const [selectedOption, setSelectedOption] = useState<HearAboutUsOptionValue | null>(null)

    const handleSubmit = async () => {
        setIsSubmitting(true);
        if (!selectedOption || !boardingData.selectedRole) {
            toast.error("Please select the required fields before submitting.");
            return;
        }

        try {
            dispatch(setBoardingData({ 
                hearAboutUsOption: selectedOption, 
                referralCode 
            }));
            const res = await postPreBoarding({
                role: boardingData.selectedRole,
                whereDidHearAboutUs: selectedOption,
                referralCode: selectedOption === HearAboutUsOptionValue.REFERRAL && referralCode ? referralCode : undefined,
            });
            if (res.success && res.data) {
                if (authUser) {
                    dispatch(setAuthUser({
                        ...authUser,
                        onboardingStatus: res.data.onboardingStatus,
                        onboardingType: res.data.onboardingType,
                        adminVerificationStatus: res.data.adminVerificationStatus || AdminVerificationStatus.NOT_REQUESTED
                    }));
                    dispatch
                }
                if (boardingData.selectedRole === Role.PROVIDER) {
                    console.log("navigate to address page");
                    navigate("/onboarding/address");
                } else {
                    console.log("navigate to user dashboard");
                    navigate("/user");
                }
                toast.success(res.message);
                dispatch(setBoardingData({ 
                    selectedRole: null, 
                    hearAboutUsOption: null, 
                    referralCode: null 
                })); 
            } else {
                toast.error(res.message || "An error occurred while submitting the form.");
            }
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.log("Something went wrong while submitting preboarding data : ", error);
            }
        }
        finally {
            setIsSubmitting(false);
        }
    }
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {hearAboutUsOptions.map((option) => {
                    const Icon = option.icon
                    return (
                        <Card
                            key={option.value}
                            onClick={() => setSelectedOption(option.value)}
                            className={cn(
                                "cursor-pointer p-3 border transition-all rounded-md flex items-center gap-3",
                                "hover:border-[var(--mainColor)] hover:shadow-sm",
                                selectedOption === option.value
                                    ? "border-[var(--mainColor)] bg-primary/5"
                                    : "border-muted"
                            )}
                        >
                            <Icon className="w-4 h-4 text-muted-foreground" />
                            <p className="text-sm font-medium">{option.label}</p>
                        </Card>
                    )
                })}
            </div>

            {selectedOption === HearAboutUsOptionValue.REFERRAL && (
                <Card className="mt-6 p-4 border rounded-md">
                    <div className="flex justify-between">
                        <p className="text-sm font-medium mb-2">
                            Enter referral code
                        </p>
                        <Button
                            className="shrink-0 cursor-pointer hover:bg-red-100 border-red-300 hover:text-red-700 size-6"
                            onClick={() => setSelectedOption(null)}
                        >
                            <X />
                        </Button>
                    </div>
                    <input
                        type="text"
                        value={referralCode ?? ""}
                        onChange={(e) => setReferralCode(e.target.value)}
                        placeholder="e.g. SF_REF_876876"
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:ring-1 focus:ring-[var(--mainColor)]"
                    />
                </Card>
            )}

            <div className="mt-8 flex justify-end space-x-2">
                <Button
                    variant="secondary"
                    className={defaultButtonClassName}
                    onClick={() => navigate(redirectPaths.PRE_BOARDING_ROLE)}
                    disabled={isSubmitting}
                >
                    <ChevronLeft className="size-4 mr-2" /> Previous
                </Button>
                <Button
                    variant="default"
                    className={defaultButtonClassName}
                    onClick={handleSubmit}
                    disabled={!boardingData.selectedRole || isSubmitting || !selectedOption}
                >
                    {isSubmitting ? (
                        <>
                            <Loader className="animate-spin size-4 mr-2" /> Submitting
                        </>
                    ) : (
                        "Submit"
                    )}
                </Button>
            </div>
        </>
    )
}

export default HearAboutUsPage;