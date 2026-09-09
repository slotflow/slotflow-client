import { useSelector } from 'react-redux';
import UserInfo from './account/UserInfo';
import { Role } from '@/shared/types/enums';
import ProfileHead from './account/ProfileHead';
import { RootState } from '@/app/store/appStore';
import AddressListing from '../profile/AddressListing';
import { fetchMyAddress } from '@/services/apis/address';
import ProviderServiceList from '../profile/ProviderServiceList';
import { providerFetchServiceDetails } from '@/services/apis/providerService';
import ProviderServiceAvailability from '../profile/ProviderServiceAvailability';
import { queryKeys } from '@/shared/utils/constants';

const AccountSettings = () => {
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  return (
    <div className="space-y-2 max-w-5xl mx-auto">
      <ProfileHead />
      <UserInfo />
      <AddressListing
        fetchApiFunction={fetchMyAddress}
        queryKey={[queryKeys.MY_ADDRESS]}
        canUpdate={true}
      />
      {authUser?.role === Role.PROVIDER && (
        <>
          <ProviderServiceList
            fetchApiFunction={providerFetchServiceDetails}
            queryKey={[queryKeys.SERVICE]}
            canUpdate={true}
          />
          <ProviderServiceAvailability role={Role.PROVIDER} canUpdate={true} />
        </>
      )}
    </div>
  );
};

export default AccountSettings;
