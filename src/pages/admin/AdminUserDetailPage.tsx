import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { userTabs } from '@/shared/utils/constants';
import ReviewsPage from '../common/ReviewsPage';
import { fetchAddressByUserId } from '@/shared/apis/address';
import { fetchUserProfileDetails } from '@/shared/apis/user';
import ProfileHead from '@/components/profile/ProfileHead';
import DataFetchingError from '@/components/error/DataFetchingError';
import ProfileListing from '@/components/profile/ProfileListing';
import AddressListing from '@/components/profile/AddressListing';
import ProfileHorizontalTabs from '@/components/profile/ProfileHorizontalTabs';

const AdminUserDetailPage: React.FC = () => {

    const { userId } = useParams();
    const [tab, setTab] = useState<number>(0);
    const [selectedUserData, setSelectedUserData] = useState<{ selectedUserName: string, selectedUserProfileImage: string | null }>({
        selectedUserName: "",
        selectedUserProfileImage: null
    });

    if (!userId) return <DataFetchingError message={"User Profile fetching error"} />

    return (
        <div className="min-h-full p-2 flex flex-col">

            <ProfileHead
                canUpdate={false}
                isMyProfile={false}
                showDetails
                selectedUserData={selectedUserData}
            />

            <div className="mt-6 md:flex">
                <ProfileHorizontalTabs isAdmin={true} setTab={setTab} tab={tab} tabArray={userTabs} />

                <div className={`flex-grow`}>
                    {tab === 0 && (
                        <ProfileListing fetchApiFunction={() => fetchUserProfileDetails(userId)} queryKey="userProfile" userOrProviderId={userId} adminLookingUser shimmerRow={8} setSelectedUserData={setSelectedUserData} />
                    ) || tab === 1 && (
                        <AddressListing fetchApiFunction={() => fetchAddressByUserId(userId)} queryKey='' userOrProviderId={userId} />
                    ) || tab === 2 && (
                        <ReviewsPage userId={userId} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminUserDetailPage;