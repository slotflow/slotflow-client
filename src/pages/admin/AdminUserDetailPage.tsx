import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { userTabs } from '@/utils/constants';
import ReviewsPage from '../common/ReviewsPage';
import ProfileHead from '@/components/common/profile/ProfileHead';
import DataFetchingError from '@/components/common/DataFetchingError';
import ProfileListing from '@/components/common/profile/ProfileListing';
import AddressListing from '@/components/common/profile/AddressListing';
import ProfileHorizontalTabs from '@/components/common/ProfileHorizontalTabs';
import { Role } from '@/utils/interface/enums';
import { fetchReviews } from '@/utils/apis/review';
import { fetchAddressByUserId } from '@/utils/apis/address';
import { fetchUserProfileDetails } from '@/utils/apis/user';

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
                        <ProfileListing fetchApiFunction={() => fetchUserProfileDetails(userId)} queryKey="userProfile" userOrProviderId={userId} adminLookingUser shimmerRow={8} setSelectedUserData={setSelectedUserData} />
                    ) || tab === 1 && (
                        <AddressListing fetchApiFunction={() => fetchAddressByUserId(userId)} queryKey='' userOrProviderId={userId} />
                    ) || tab === 2 && (
                        <ReviewsPage fetchFunction={() => fetchReviews({ userId })} role={Role.ADMIN} className='mt-2 md:mt-0' />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminUserDetailPage;