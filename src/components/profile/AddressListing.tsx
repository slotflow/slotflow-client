import MapPreview from '../map/MapPreview';
import { useQuery } from '@tanstack/react-query';
import DataFetchingError from '../error/DataFetchingError';
import InfoDisplayComponent from '../app/InfoDisplayComponent';
import ProfileDetailsShimmer from '@/components/shimmers/ProfileDetailsShimmer';
import { UserOrProviderAddressDetailsComponentProps } from '@/shared/interface/componentInterface';

const AddressListing: React.FC<UserOrProviderAddressDetailsComponentProps> = ({
    userOrProviderId,
    fetchApiFunction,
    queryKey,
}) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: async () => {
            const res = await fetchApiFunction(userOrProviderId)
            return res.data;
        },
        queryKey: [queryKey, userOrProviderId],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
    });

    if (isError) {
        return <DataFetchingError message={error?.message} />
    };

    if (isLoading) {
        return <ProfileDetailsShimmer row={9} className='mt-2' />
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