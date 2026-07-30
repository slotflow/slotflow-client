import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/shared/redux/appStore";
import { AnimatePresence, motion } from "framer-motion";
import { usePreBoarding } from "@/hooks/usePreboarding";
import { redirectPaths } from "@/shared/utils/constants";
import { HearAboutUsOptionValue, Role } from "@/shared/interface/enums";
import ReferralCodeCard from "@/components/boarding/hearAboutUs/ReferralCodeCard";
import HearAboutUsButtons from "@/components/boarding/hearAboutUs/HearAboutUsButtons";
import HearAboutUsOptions from "@/components/boarding/hearAboutUs/HearAboutUsOptionCard";

const HearAboutUsPage = () => {

    const navigate = useNavigate();
    const { submitPreBoardingHandler } = usePreBoarding();
    const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
    const [ referralCode, setReferralCode ] = useState<string | null>(null);
    const { authUser, preboardingData } = useSelector((state: RootState) => state.auth);
    const [ selectedOption, setSelectedOption ] = useState<HearAboutUsOptionValue | null>(null)

    const handleSubmit = async () => {
        console.log("submitting")
        if (!selectedOption || !preboardingData.selectedRole) {
            toast.error("Please select the required fields before submitting.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await submitPreBoardingHandler({
                authUser,
                selectedRole: preboardingData.selectedRole,
                selectedOption,
                referralCode,
            });
            console.log("res : ",res);

            if (!res.success || !res.data) {
                toast.error(
                    res.message || "An error occurred while submitting the form."
                );
                return;
            }

            toast.success(res.message);

            navigate(
                preboardingData.selectedRole === Role.PROVIDER
                    ? redirectPaths.ONBOARDING_ADDRESS
                    : redirectPaths.USER_HOME
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <HearAboutUsOptions
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
            <AnimatePresence mode="wait">
                {selectedOption === HearAboutUsOptionValue.REFERRAL && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.98 }}
                        transition={{
                            duration: 0.25,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <ReferralCodeCard
                            value={referralCode}
                            onChange={setReferralCode}
                            onClose={() => {
                                setSelectedOption(null);
                                setReferralCode(null);
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <HearAboutUsButtons
                isSubmitting={isSubmitting}
                disabled={isSubmitting || !selectedOption}
                onPrevious={() => navigate(redirectPaths.PRE_BOARDING_ROLE)}
                onSubmit={handleSubmit}
            />
        </>
    )
}

export default HearAboutUsPage;