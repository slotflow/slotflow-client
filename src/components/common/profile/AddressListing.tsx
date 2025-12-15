import { useEffect } from 'react';
import MapPreview from '../MapPreview';
import { useQuery } from '@tanstack/react-query';
import DataFetchingError from '../DataFetchingError';
import InfoDisplayComponent from '../InfoDisplayComponent';
import ProfileDetailsShimmer from '@/components/shimmers/ProfileDetailsShimmer';
import { AdminFetchddressResponse } from '@/utils/interface/api/commonApiInterface';
import { ProviderFetchAddressResponse } from '@/utils/interface/api/providerApiInterface';
import { UserFetchProviderAddressResponse, UserFetchAddressResponse } from '@/utils/interface/api/userApiInterface';

interface UserOrProviderAddressDetailsComponentProps {
    userOrProviderId?: string;
    fetchApiFunction: (userOrProviderId?: string) => Promise<
        AdminFetchddressResponse |
        ProviderFetchAddressResponse |
        UserFetchAddressResponse |
        UserFetchProviderAddressResponse
    >;
    queryKey: string;
    setLoading?: (data: boolean) => void;
    setIsUpdating?: (data: boolean) => void;
}

const AddressListing: React.FC<UserOrProviderAddressDetailsComponentProps> = ({
    userOrProviderId,
    fetchApiFunction,
    queryKey,
    setLoading,
    setIsUpdating
}) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchApiFunction(userOrProviderId),
        queryKey: [queryKey],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
    });

    useEffect(() => {
        if (setLoading) {
            if (isLoading) {
                setLoading(true);
            } else {
                setLoading(false)
            }
        }
    }, [isLoading, setLoading])

    useEffect(() => {
        if (setIsUpdating) {
            if (data && Object.values(data).length !== 0) {
                setIsUpdating(true);
            } else {
                setIsUpdating(false)
            }
        }
    }, [data, setIsUpdating])

    if (isError) {
        return <DataFetchingError message={error?.message} />
    };

    if (isLoading) {
        return <ProfileDetailsShimmer row={9} className='mt-2' />
    };

    if (!data) {
        return <DataFetchingError message="No address found." />;
    };

    return (
        <div className=" border rounded-md overflow-hidden w-full mt-2 md:mt-0">
            <table className="table-auto w-full">
                <tbody className="w-1/2">
                    <InfoDisplayComponent label="Address Line" value={data?.addressLine} />
                    <InfoDisplayComponent label="Landmark" value={data?.landMark} />
                    <InfoDisplayComponent label="Place" value={data?.place} />
                    <InfoDisplayComponent label="City" value={data?.city} />
                    <InfoDisplayComponent label="Phone" value={data?.phone} />
                    <InfoDisplayComponent label="State" value={data?.state} />
                    <InfoDisplayComponent label="Pincode" value={data?.pincode} />
                    <InfoDisplayComponent label="Distrcit" value={data?.district} />
                    <InfoDisplayComponent label="Country" value={data?.country} />
                </tbody>
            </table>
            {data?.location?.coordinates && (
                <MapPreview lat={data?.location.coordinates[1]} lon={data?.location.coordinates[0]} />
            )}
        </div>

    )
};

export default AddressListing;