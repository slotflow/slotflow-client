import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/appStore';
import UserProfile from '@/components/user/UserProfile';
import { fetchMyAddress } from '@/services/apis/address';
import { userFetchMyProfileDetails } from '@/services/apis/user';
import AddressListing from '@/components/profile/AddressListing';
import ProfileListing from '@/components/profile/ProfileListing';
import DataFetchingError from '@/components/error/DataFetchingError';
import { queryKeys } from '@/shared/utils/constants';

const UserAccountPage = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);

  if (!authUser) return <DataFetchingError message="User not found" />;

  return (
    <UserProfile
      username={authUser.username}
      profileImage={authUser.profileImage || ''}
      profile={
        <ProfileListing
          fetchApiFunction={userFetchMyProfileDetails}
          queryKey={[queryKeys.PROFILE]}
          shimmerRow={5}
          userSelf
        />
      }
      role={authUser.role}
      address={<AddressListing fetchApiFunction={fetchMyAddress} queryKey={[queryKeys.ADDRESS]} />}
    />
  );
};

export default UserAccountPage;
