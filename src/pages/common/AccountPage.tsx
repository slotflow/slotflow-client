import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { profileTabs } from '@/utils/constants';
import { RootState } from '@/utils/redux/appStore';
import Address from '@/components/profile/Address';
import Profile from '@/components/profile/Profile';
import { userUpdateProfileImage } from '@/utils/apis/user';
import ProfileHead from '@/components/profile/ProfileHead';
import ProviderService from '@/components/provider/ProviderService';
import DataFetchingError from '@/components/error/DataFetchingError';
import { providerUpdateProfileImage } from '@/utils/apis/provider';
import ProviderAvailability from '@/components/provider/ProviderAvailability';

const AccountPage: React.FC = () => {

    const { authUser } = useSelector((state: RootState) => state.auth);
    const [selectedTab, setSelectedTab] = useState("tab1");

    const isProvider = authUser?.role === "PROVIDER";

    const updateProfileImageApiFunction = isProvider
        ? providerUpdateProfileImage
        : userUpdateProfileImage;

    if (!authUser) return <DataFetchingError message="User not found" />;

    return (
        <div className="min-h-full p-2 flex flex-col mb-10">
            <ProfileHead
                updateProfileImageApiFunction={updateProfileImageApiFunction}
                updation={true}
                showDetails
                isMyProfile
            />

            <div className="mt-6 flex flex-col md:flex-row gap-6">

                <div className="w-full md:hidden">
                    <Select value={selectedTab} onValueChange={setSelectedTab}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Section" />
                        </SelectTrigger>
                        <SelectContent>
                            {profileTabs
                                .filter(tab => tab.role?.includes(authUser?.role || ""))
                                .map(({ value, label, icon: Icon }) => (
                                    <SelectItem key={value} value={value}>
                                        <div className="flex items-center gap-2">
                                            {Icon && <Icon className="w-4 h-4" />}
                                            {label}
                                        </div>
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="hidden md:flex md:flex-col w-2/12 space-y-2">
                    {profileTabs
                        .filter(tab => tab.role?.includes(authUser?.role || ""))
                        .map(({ value, label, icon: Icon }) => (
                            <button
                                key={value}
                                onClick={() => setSelectedTab(value)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer
          ${selectedTab === value ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}
                            >
                                {Icon && <Icon className="w-4 h-4" />}
                                {label}
                            </button>
                        ))}
                </div>

                {selectedTab === "tab1" && <Profile />}
                {selectedTab === "tab2" && <Address />}
                {isProvider && (
                    <>
                        {selectedTab === "tab3" && <ProviderService />}
                        {selectedTab === "tab4" && <ProviderAvailability />}
                    </>
                )}
            </div>
        </div>
    );
};

export default AccountPage;
