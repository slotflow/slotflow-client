import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { setRole } from '@/shared/apis/user';
import { useNavigate } from 'react-router-dom';
import service from '@/assets/svgs/service.svg';
import booking from '@/assets/svgs/booking.svg';
import { Role } from '@/shared/interface/enums';
import { appConfig } from '@/shared/config/env';
import { Button } from '@/components/ui/button';
import { RootState } from '@/shared/redux/appStore';
import SideBox from "@/components/onboarding/SideBox";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/shared/redux/slices/authSlice';
import RoleSelectCard from '@/components/cards/RoleSelectCard';

const RoleSelectPage: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authUser = useSelector((state: RootState) => state.auth.authUser);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    const handleRoleSelect = async () => {
        if (!selectedRole) return;
        try {
            const res = await setRole({ role: selectedRole });
            if (res.success) {
                toast.success(res.message);
                if (authUser) {
                    dispatch(setAuthUser({
                        ...authUser,
                        ...res.data,
                    }));
                }
                if (selectedRole === Role.PROVIDER) {
                    navigate("/onboarding/address");
                } else {
                    navigate("/user");
                }
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.log("Error in handleRoleSelect ", error);
            }
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="md:h-screen md:flex justify-center w-full bg-[var(--background)]">
            <SideBox pageNumber={0} />
            <div className="w-full md:w-8/12 p-6 md:p-10 overflow-y-scroll no-scrollbar">
                <h4 className="text-lg md:text-2xl font-semibold text-start mb-6 text-gray-800">
                    How do you want to get started on <span className="text-[var(--mainColor)]">SlotFlow</span>?
                </h4>
                <div className="backdrop-blur-xl p-6 md:p-10 rounded-3xl w-[95%] max-w-4xl text-center">
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

                    <div className="mt-8 flex justify-end">
                        <Button
                            variant="default"
                            className="px-8 py-2 text-base font-medium rounded-lg transition-all duration-300 hover:bg-[var(--mainColor)] text-white disabled:opacity-50 cursor-pointer"
                            onClick={handleRoleSelect}
                            disabled={!selectedRole}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleSelectPage;
