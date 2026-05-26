import DataField from '../app/DataField';
import { useSelector } from 'react-redux';
import MapPreview from '../map/MapPreview';
import { SelectSeparator } from '../ui/select';
import { useQuery } from '@tanstack/react-query';
import { RootState } from '@/shared/redux/appStore';
import DataFetchingError from '../error/DataFetchingError';
import DataFieldShimmer from '@/components/shimmers/DataFieldShimmer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { UserOrProviderAddressDetailsComponentProps } from '@/shared/interface/componentInterface';
import { Building, Globe, Landmark, Mail, Map, MapPin, MapPinned, MapPinPlus, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { defaultButtonClassName } from '@/shared/utils/constants';
import { AnimatePresence, motion } from 'framer-motion';
import AddressForm from '../form/CommonForms/AddressForm';

const AddressListing: React.FC<UserOrProviderAddressDetailsComponentProps> = ({
    userOrProviderId,
    fetchApiFunction,
    queryKey,
    isUserLookingProvider = false,
    canUpdate = false
}) => {

    const [showForm, setShowForm] = useState<boolean>(false);
    const isShowPreview = useSelector((state: RootState) => state.provider.isShowPreview);

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
        return <DataFieldShimmer row={9} />
    }


    return (
        <Card className="border shadow-sm rounded-xl w-full">
            <CardHeader className="flex justify-between items-center">
                <div>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Map className="w-5 h-5 text-primary" />
                    Address
                </CardTitle>
                <CardDescription>Address details with map preview</CardDescription>
                </div>
                {canUpdate && (
                    <Button
                        title="Update Password"
                        variant={showForm ? "destructive" : "default"}
                        className={defaultButtonClassName}
                        onClick={(e) => {
                            e.preventDefault();
                            setShowForm(!showForm);
                        }}
                    >{showForm ? "Cancel" : "Update"}
                    </Button>
                )}
            </CardHeader>
            <SelectSeparator />
            <CardContent className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
                    <DataField label="Address Line" value={data?.addressLine} Icon={MapPin} />
                    <DataField label="Landmark" value={data?.landMark} Icon={MapPinPlus} />
                    <DataField label="Place" value={data?.place} Icon={Map} />
                    <DataField label="City" value={data?.city} Icon={Building} />
                    {!isShowPreview && !isUserLookingProvider && (
                        <DataField label="Phone" value={data?.phone} Icon={Phone} />
                    )}
                    <DataField label="State" value={data?.state} Icon={MapPinned} />
                    <DataField label="Pincode" value={data?.pincode} Icon={Mail} />
                    <DataField label="Distrcit" value={data?.district} Icon={Landmark} />
                    <DataField label="Country" value={data?.country} Icon={Globe} />
                </div>
                {data?.location?.coordinates && !isLoading && (
                    <MapPreview lat={data?.location.coordinates[1]} lon={data?.location.coordinates[0]} />
                )}
            </CardContent>
            <AnimatePresence initial={false}>
                {showForm && (
                    <motion.div
                        key="address-form"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                    >
                        <SelectSeparator />
                        <CardContent className="space-y-2 mt-4">
                            <AddressForm
                                isUpdating={true}
                                heading="Update Address"
                            />
                        </CardContent>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    )
};

export default AddressListing;