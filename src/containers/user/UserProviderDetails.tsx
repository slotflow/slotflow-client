import { Role } from '@/shared/types/enums';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ListReviews from '../dashboard/ListReviews';
import { fetchAddressByUserId } from '@/services/apis/address';
import AddressListing from '@/components/profile/AddressListing';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import ProviderProfile from '@/components/provider/ProviderProfile';
import DataFetchingError from '@/components/error/DataFetchingError';
import { fetchProviderDetailsForUser } from '@/services/apis/providerProfile';
import { fetchProviderServiceByProviderId } from '@/services/apis/providerService';
import ProviderServiceAvailability from '@/components/profile/ProviderServiceAvailability';

const UserProviderDetails = () => {
  const { providerId } = useParams<{ providerId: string }>();

  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileIsError,
  } = useQuery({
    queryFn: async () => {
      const res = await fetchProviderDetailsForUser(providerId!);
      return res.data;
    },
    queryKey: [queryKeys.PROFILE, providerId],
  });

  const {
    data: serviceData,
    isLoading: serviceLoading,
    isError: serviceIsError,
  } = useQuery({
    queryFn: async () => {
      const res = await fetchProviderServiceByProviderId(providerId!);
      return res.data;
    },
    queryKey: [queryKeys.SERVICE, providerId],
  });

  if (!providerId) return <DataFetchingError message={'Provider Profile fetching error'} />;

  return (
    <ProviderProfile
      role={Role.USER}
      username={profileData?.username || ''}
      profileImage={profileData?.profileImage || ''}
      service={{
        isLoading: serviceLoading,
        isError: serviceIsError,
        data: serviceData,
        isUserLookingProvider: true,
      }}
      profile={{
        isLoading: profileLoading,
        isError: profileIsError,
        data: profileData,
      }}
      reviews={<ListReviews providerId={providerId} isPage={false} />}
      address={
        <AddressListing
          userOrProviderId={providerId}
          fetchApiFunction={() => fetchAddressByUserId({
            userId: providerId
          })}
          queryKey={[queryKeys.ADDRESS]}
          isUserLookingProvider
          hideAddress
        />
      }
      availability={<ProviderServiceAvailability role={Role.USER} providerId={providerId} />}

    />
  );
};

export default UserProviderDetails;
