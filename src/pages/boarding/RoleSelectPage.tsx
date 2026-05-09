import { toast } from "react-toastify";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Role } from "@/shared/interface/enums";
import service from '@/assets/svgs/service.svg';
import booking from '@/assets/svgs/booking.svg';
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/shared/redux/appStore";
import { setBoardingData } from "@/shared/redux/slices/authSlice";
import RoleSelectCard from "../../components/cards/RoleSelectCard";
import { defaultButtonClassName, redirectPaths } from "@/shared/utils/constants";

const RoleSelectPage: React.FC = () => {

    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleOnClick = (role: Role | null) => {
        if (role) {
            dispatch(setBoardingData({ selectedRole: role }));
            navigate(redirectPaths.PRE_BOARDING_HEAR_ABOUT_US);
        } else {
            toast.error("Please select a role to proceed.");
            return;
        }
    }

    return (
        <>
            <div className="py-6 rounded-3xl text-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <RoleSelectCard
                        role={Role.USER}
                        icon={booking}
                        title="Book an Appointment"
                        description="Find and book appointments with ease"
                        selectedRole={selectedRole}
                        onSelect={setSelectedRole}
                    />

                    <RoleSelectCard
                        role={Role.PROVIDER}
                        icon={service}
                        title="Provide Service"
                        description="Offer your services to customers"
                        selectedRole={selectedRole}
                        onSelect={setSelectedRole}
                    />
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <Button
                    variant="default"
                    className={defaultButtonClassName}
                    onClick={() => handleOnClick(selectedRole)}
                    disabled={!selectedRole}
                >
                    Next
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </>
    )
}

export default RoleSelectPage;