import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { userTabs } from '@/utils/constants';
import ReviewsPage from '../common/ReviewsPage';
import ProfileHead from '@/components/common/profile/ProfileHead';
import { adminFetchAllReviews } from '@/utils/apis/adminReview.api';
import DataFetchingError from '@/components/common/DataFetchingError';
import ProfileListing from '@/components/common/profile/ProfileListing';
import AddressListing from '@/components/common/profile/AddressListing';
import ProfileHorizontalTabs from '@/components/common/ProfileHorizontalTabs';
import { adminFetchUserAddress, adminFetchUserProfileDetails } from '@/utils/apis/adminUser.api';
import { Role } from '@/utils/interface/enums';

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
                updation={false}
                isMyProfile={false}
                showDetails
                selectedUserData={selectedUserData}
            />

            <div className="mt-6 md:flex">
                <ProfileHorizontalTabs isAdmin={true} setTab={setTab} tab={tab} tabArray={userTabs} />

                <div className={`flex-grow`}>
                    {tab === 0 && (
                        <ProfileListing fetchApiFunction={() => adminFetchUserProfileDetails(userId)} queryKey="userProfile" userOrProviderId={userId} adminLookingUser shimmerRow={8} setSelectedUserData={setSelectedUserData} />
                    ) || tab === 1 && (
                        <AddressListing fetchApiFunction={() => adminFetchUserAddress(userId)} queryKey='' userOrProviderId={userId} />
                    ) || tab === 2 && (
                        <ReviewsPage isAdmin fetchFun={adminFetchAllReviews} id={userId} role={Role.User} className='mt-2 md:mt-0' />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminUserDetailPage;