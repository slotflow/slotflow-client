import React from "react";
import { Role } from "@/shared/interface/enums";
import service from '@/assets/svgs/service.svg';
import booking from '@/assets/svgs/booking.svg';
import BoardingLayout from "@/layouts/BoardingLayout";
import RoleSelectCard from "../../../components/cards/RoleSelectCard";
import { onboardingContent } from "@/shared/utils/constants";

interface RoleSelectProps {
    selectedRole: Role | null;
    setSelectedRole: (role: Role) => void;
}

const RoleSelect: React.FC<RoleSelectProps> = ({
    selectedRole,
    setSelectedRole
}) => {

    return (
        <BoardingLayout
            pageNumber={0}
            heading={onboardingContent.setupRole.title}
            description={onboardingContent.setupRole.description}
        >
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
        </BoardingLayout>
    )
}

export default RoleSelect;