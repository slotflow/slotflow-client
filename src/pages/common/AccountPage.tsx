import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Role } from '@/shared/interface/enums';
import Address from '@/components/profile/Address';
import Profile from '@/components/profile/Profile';
import { RootState } from '@/shared/redux/appStore';
import OptionTabs from '@/components/tabs/optionTabs';
import { profileTabs } from '@/shared/utils/constants';
import ProfileHead from '@/components/profile/ProfileHead';
import ProviderService from '@/components/provider/ProviderService';
import DataFetchingError from '@/components/error/DataFetchingError';
import ProviderAvailability from '@/components/provider/ProviderAvailability';

const AccountPage: React.FC = () => {

    const { authUser } = useSelector((state: RootState) => state.auth);
    const [selectedTab, setSelectedTab] = useState<string>("tab1");

    const isProvider = authUser?.role === Role.PROVIDER;

    if (!authUser) return <DataFetchingError message="User not found" />;

    return (
        <div className="min-h-full p-2 flex flex-col mb-10">
            <ProfileHead
                canUpdate={true}
                showDetails
                isMyProfile
            />
            <div className="mt-6 flex flex-col md:flex-row gap-6">
                <OptionTabs
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    profileTabs={profileTabs}
                    authUser={authUser}
                />

                {selectedTab === "tab1" && <Profile />}
                {selectedTab === "tab2" && <Address />}
                {isProvider && (
                    <React.Fragment>
                        {selectedTab === "tab3" && <ProviderService />}
                        {selectedTab === "tab4" && <ProviderAvailability />}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default AccountPage;
