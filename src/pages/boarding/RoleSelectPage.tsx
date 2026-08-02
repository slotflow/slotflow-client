import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Role } from "@/shared/interface/enums";
import service from "@/assets/svgs/service.svg";
import booking from "@/assets/svgs/booking.svg";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/shared/redux/appStore";
import { setBoardingData } from "@/shared/redux/slices/authSlice";
import RoleSelectCard from "../../components/boarding/roleSelect/RoleSelectCard";
import { defaultButtonClassName, redirectPaths } from "@/shared/utils/constants";

const RoleSelectPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    const handleContinue = () => {
        if (!selectedRole) {
            toast.error("Please select a role to continue.");
            return;
        }
        dispatch(
            setBoardingData({
                selectedRole,
            })
        );
        navigate(redirectPaths.PRE_BOARDING_HEAR_ABOUT_US);
    };

    return (
        <div className="relative">
            <div className="mx-auto sm:px-6 lg:px-0">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.15,
                    }}
                    className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2"
                >
                    <RoleSelectCard
                        role={Role.USER}
                        icon={booking}
                        title="Book Appointments"
                        description="Discover trusted professionals and schedule appointments effortlessly."
                        selectedRole={selectedRole}
                        onSelect={setSelectedRole}
                    />
                    <RoleSelectCard
                        role={Role.PROVIDER}
                        icon={service}
                        title="Provide Services"
                        description="Manage bookings, accept payments, and grow your business with SlotFlow."
                        selectedRole={selectedRole}
                        onSelect={setSelectedRole}
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: 0.35,
                    }}
                    className="mt-14 flex flex-col items-end gap-5"
                >
                    <p className="text-sm text-gray-500">
                        Your selection helps us personalize your onboarding
                        experience.
                    </p>
                    <Button
                        onClick={handleContinue}
                        disabled={!selectedRole}
                        className={defaultButtonClassName}
                    >
                        Continue
                        <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                </motion.div>
            </div>
        </div>
    );
};

export default RoleSelectPage;