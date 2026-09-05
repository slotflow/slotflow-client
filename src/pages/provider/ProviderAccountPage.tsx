import { useSelector } from 'react-redux';
import { Role } from '@/shared/types/enums';
import { useQuery } from '@tanstack/react-query';
import { RootState } from '@/app/store/appStore';
import { fetchMyAddress } from '@/services/apis/address';
import AddressListing from '@/components/profile/AddressListing';
import ProviderProofs from '@/components/profile/ProviderProofs';
import ProviderProfile from '@/components/provider/ProviderProfile';
import DataFetchingError from '@/components/error/DataFetchingError';
import { providerFetchServiceDetails } from '@/services/apis/providerService';
import ProviderServiceAvailability from '@/components/profile/ProviderServiceAvailability';
import {
  providerFetchMyProofs,
  providerFetchMyProfileDetails,
} from '@/services/apis/providerProfile';
import { QUERY_KEYS } from '@/shared/utils/constants';

const ProviderAccountPage = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);

  const {
    data: providerService,
    isLoading: providerServiceLoading,
    isError: providerServiceError,
  } = useQuery({
    queryFn: async () => {
      const res = await providerFetchServiceDetails();
      return res.data;
    },
    queryKey: [QUERY_KEYS.PROVIDER_SERVICE],
    staleTime: 1 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const {
    data: providerProfile,
    isLoading: providerProfileLoading,
    isError: providerProfileError,
  } = useQuery({
    queryFn: async () => {
      const res = await providerFetchMyProfileDetails();
      return res.data;
    },
    queryKey: [QUERY_KEYS.PROVIDER_PROFILE],
    staleTime: 1 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (!authUser) return <DataFetchingError message="User not found" />;

  return (
    <ProviderProfile
      username={authUser.username}
      profileImage={authUser.profileImage || ''}
      service={{
        isLoading: providerServiceLoading,
        isError: providerServiceError,
        data: providerService,
      }}
      profile={{
        isLoading: providerProfileLoading,
        isError: providerProfileError,
        data: providerProfile,
      }}
      role={authUser.role}
      address={
        <AddressListing fetchApiFunction={fetchMyAddress} queryKey={[QUERY_KEYS.USER_ADDRESS]} />
      }
      availability={<ProviderServiceAvailability role={Role.PROVIDER} />}
      proofs={<ProviderProofs fetchApiFunction={providerFetchMyProofs} />}
    />
  );
};

export default ProviderAccountPage;
