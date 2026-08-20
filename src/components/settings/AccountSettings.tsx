import { useSelector } from 'react-redux';
import UserInfo from './account/UserInfo';
import ProfileHead from './account/ProfileHead';
import { Role } from '@/shared/interface/enums';
import { RootState } from '@/shared/redux/appStore';
import { fetchMyAddress } from '@/shared/apis/address';
import AddressListing from '../profile/AddressListing';
import ProviderServiceList from '../profile/ProviderServiceList';
import { providerFetchServiceDetails } from '@/shared/apis/providerService';
import ProviderServiceAvailability from '../profile/ProviderServiceAvailability';

const AccountSettings = () => {
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  return (
    <div className="space-y-2 max-w-5xl mx-auto">
      <ProfileHead />
      <UserInfo />
      <AddressListing fetchApiFunction={fetchMyAddress} queryKey="myAddress" canUpdate={true} />
      {authUser?.role === Role.PROVIDER && (
        <>
          <ProviderServiceList
            fetchApiFunction={providerFetchServiceDetails}
            queryKey="providerService"
            canUpdate={true}
          />
          <ProviderServiceAvailability role={Role.PROVIDER} canUpdate={true} />
        </>
      )}
    </div>
  );
};

export default AccountSettings;
