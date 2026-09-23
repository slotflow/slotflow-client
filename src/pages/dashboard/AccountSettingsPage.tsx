import { useSelector } from 'react-redux';
import UserInfo from '../../components/settings/account/UserInfo';
import { Role } from '@/shared/types/enums';
import ProfileHead from '../../components/settings/account/ProfileHead';
import { RootState } from '@/app/store/appStore';
import { queryKeys } from '@/shared/utils/constants';
import AddressListing from '../../components/profile/AddressListing';
import { fetchMyAddress } from '@/services/apis/address';
import ProviderServiceList from '../../components/profile/ProviderServiceList';
import ProviderSubscriptionInfo from '../../components/settings/account/ProviderSubscriptionInfo';
import { providerFetchServiceDetails } from '@/services/apis/providerService';
import ProviderServiceAvailability from '../../components/profile/ProviderServiceAvailability';

const AccountSettingsPage = () => {
  
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  return (
    <div className="space-y-2 max-w-5xl mx-auto">
      <ProfileHead />
      <UserInfo />
      {authUser?.role === Role.PROVIDER && (
        <ProviderSubscriptionInfo
          providerSubscription={authUser?.providerSubscription}
          subscriptionStartDate={authUser?.subscriptionStartDate}
          subscriptionEndDate={authUser?.subscriptionEndDate}
          subscriptionStatus={authUser?.subscriptionStatus}
        />
      )}
      <AddressListing
        fetchApiFunction={fetchMyAddress}
        queryKey={[queryKeys.ADDRESS]}
        canUpdate
        showHeading
      />
      {authUser?.role === Role.PROVIDER && (
        <>
          <ProviderServiceList
            fetchApiFunction={providerFetchServiceDetails}
            queryKey={[queryKeys.SERVICE]}
            canUpdate
            showHeading
          />
          <ProviderServiceAvailability
            role={Role.PROVIDER}
            canUpdate
            showHeading
          />
        </>
      )}
    </div>
  );
};

export default AccountSettingsPage;
