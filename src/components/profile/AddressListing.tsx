import MapPreview from '../map/MapPreview';
import { Card, CardContent } from '../ui/card';
import { useQuery } from '@tanstack/react-query';
import DataFetchingError from '../error/DataFetchingError';
import DetailField from '../app/DetailField';
import ProfileDetailsShimmer from '@/components/shimmers/DataFieldShimmer';
import { UserOrProviderAddressDetailsComponentProps } from '@/shared/interface/componentInterface';
import { Building, Globe, Landmark, Mail, Map, MapPin, MapPinned, MapPinPlus, Phone } from 'lucide-react';

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
        <div className="overflow-hidden w-full mt-2 md:mt-0">
            <Card>
                <CardContent className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <DetailField label="Address Line" value={data?.addressLine} Icon={MapPin} />
                        <DetailField label="Landmark" value={data?.landMark} Icon={MapPinPlus} />
                        <DetailField label="Place" value={data?.place} Icon={Map} />
                        <DetailField label="City" value={data?.city} Icon={Building} />
                        <DetailField label="Phone" value={data?.phone} Icon={Phone} />
                        <DetailField label="State" value={data?.state} Icon={MapPinned} />
                        <DetailField label="Pincode" value={data?.pincode} Icon={Mail} />
                        <DetailField label="Distrcit" value={data?.district} Icon={Landmark} />
                        <DetailField label="Country" value={data?.country} Icon={Globe} />
                    </div>
                    {data?.location?.coordinates && (
                        <MapPreview lat={data?.location.coordinates[1]} lon={data?.location.coordinates[0]} />
                    )}
                </CardContent>
            </Card>
        </div>

    )
};

export default AddressListing;