import { toast } from "react-toastify";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/shared/config/env";
import { ArrowLeft, Loader } from "lucide-react";
import { postPreBoarding } from "@/shared/apis/user";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/shared/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import RoleSelect from "@/pages/boarding/preBoarding/RoleSelect";
import HearAboutUs from "@/pages/boarding/preBoarding/HearAboutUs";
import { AdminVerificationStatus, HearAboutUsOptionValue, Role } from "@/shared/interface/enums";

const PreBoardingPage: React.FC = () => {
    const [tab, setTab] = useState<number>(0);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [referralCode, setReferralCode] = useState<string | null>(null)
    const authUser = useSelector((state: RootState) => state.auth.authUser);
    const [selectedOption, setSelectedOption] = useState<HearAboutUsOptionValue | null>(null)

    const handleSubmit = async () => {
        setIsSubmitting(true);
        if (!selectedOption || !selectedRole) {
            toast.error("Please select the required fields before submitting.");
            return;
        }

        try {
            const res = await postPreBoarding({
                role: selectedRole,
                whereDidHearAboutUs: selectedOption,
                referralCode: selectedOption === HearAboutUsOptionValue.REFERRAL && referralCode ? referralCode : undefined,
            });
            if (res.success && res.data) {
                toast.success(res.message);
                if (authUser) {
                    dispatch(setAuthUser({
                        ...authUser,
                        role: res.data.role,
                        hasSelectedRole: res.data.hasSelectedRole,
                        isOnboardingCompleted: res.data.isOnboardingCompleted,
                        adminVerificationStatus: res.data.adminVerificationStatus || AdminVerificationStatus.NOT_REQUESTED
                    }));
                }
                if (selectedRole === Role.PROVIDER) {
                    console.log("navigate to address page");
                    navigate("/onboarding/address");
                } else {
                    console.log("navigate to user dashboard");
                    navigate("/user");
                }
            } else {
                toast.error(res.message);
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
        <React.Fragment>

            {tab === 0 && (
                <RoleSelect
                    selectedRole={selectedRole}
                    setSelectedRole={setSelectedRole}
                />
            )}

            {tab === 1 && (
                <HearAboutUs
                    referralCode={referralCode}
                    selectedOption={selectedOption}
                    setReferralCode={setReferralCode}
                    setSelectedOption={setSelectedOption}
                />
            )}

            <div className="mt-8 flex justify-end">
                {tab === 0 ? (
                    <Button
                        variant="default"
                        className="px-8 py-2 text-base font-medium rounded-lg transition-all duration-300 hover:bg-[var(--mainColor)] text-white disabled:opacity-50 cursor-pointer"
                        onClick={() => setTab(1)}
                        disabled={!selectedRole || isSubmitting}
                    >
                        Next
                    </Button>
                ) : tab === 1 ? (
                    <>
                        <Button
                            variant="default"
                            className="px-8 py-2 text-base font-medium rounded-lg transition-all duration-300 hover:bg-[var(--mainColor)] text-white disabled:opacity-50 cursor-pointer mr-2"
                            onClick={() => setTab(0)}
                            disabled={!selectedRole || isSubmitting}
                        >
                            <ArrowLeft className="size-4 mr-2" /> Previous
                        </Button>
                        <Button
                            variant="default"
                            className="px-8 py-2 text-base font-medium rounded-lg transition-all duration-300 hover:bg-[var(--mainColor)] text-white disabled:opacity-50 cursor-pointer"
                            onClick={handleSubmit}
                            disabled={!selectedRole || isSubmitting || !selectedOption}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader className="animate-spin size-4 mr-2" /> Submitting
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </>
                ) : null}
            </div>
        </React.Fragment>
    )
}

export default PreBoardingPage