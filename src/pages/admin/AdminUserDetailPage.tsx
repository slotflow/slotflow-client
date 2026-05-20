import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewsPage from '../common/ReviewsPage';
import { userTabs } from '@/shared/utils/constants';
import { fetchAddressByUserId } from '@/shared/apis/address';
import { fetchUserProfileDetails } from '@/shared/apis/user';
import ProfileListing from '@/components/profile/ProfileListing';
import AddressListing from '@/components/profile/AddressListing';
import DataFetchingError from '@/components/error/DataFetchingError';
import ProfileHorizontalTabs from '@/components/profile/ProfileHorizontalTabs';

const AdminUserDetailPage: React.FC = () => {

    const { userId } = useParams();
    const [tab, setTab] = useState<number>(0);

    if (!userId) return <DataFetchingError message={"User Profile fetching error"} />

    return (
        <div className="min-h-full p-2 flex flex-col">
            <div className="mt-6 md:flex">
                <ProfileHorizontalTabs isAdmin={true} setTab={setTab} tab={tab} tabArray={userTabs} />
                <div className={`flex-grow`}>
                    {tab === 0 && (
                        <ProfileListing fetchApiFunction={() => fetchUserProfileDetails(userId)} queryKey="userProfile" userOrProviderId={userId} adminLookingUser shimmerRow={8} />
                    ) || tab === 1 && (
                        <AddressListing fetchApiFunction={() => fetchAddressByUserId(userId)} queryKey='' userOrProviderId={userId} />
                    ) || tab === 2 && (
                        <ReviewsPage userId={userId} isPage={false} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminUserDetailPage;