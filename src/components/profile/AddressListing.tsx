import {
  Map,
  Globe,
  Mail,
  Phone,
  MapPin,
  Building,
  Landmark,
  MapPinned,
  MapPinPlus,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import DataField from '../app/DataField';
import MapPreview from '../map/MapPreview';
import { SelectSeparator } from '../ui/select';
import { useQuery } from '@tanstack/react-query';
import FeatureOverlay from '../app/FeatureOverlay';
import AddressForm from '../form/Common/AddressForm';
import { AnimatePresence, motion } from 'framer-motion';
import DataFetchingError from '../error/DataFetchingError';
import DataShimmer from '@/components/shimmers/DataShimmer';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { UserOrProviderAddressDetailsProps } from '@/shared/types/component';

const AddressListing = ({
  userOrProviderId,
  fetchApiFunction,
  queryKey,
  isUserLookingProvider = false,
  canUpdate = false,
  showHeading = false,
  isShowPreview = false,
  hideAddress = false,
}: UserOrProviderAddressDetailsProps) => {

  const [showForm, setShowForm] = useState<boolean>(false);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => {
      const res = await fetchApiFunction(userOrProviderId);
      return res.data;
    },
    queryKey: [...queryKey, userOrProviderId],
  });

  if (isError) {
    return <DataFetchingError message={error?.message} />;
  }

  return (
    <Card className="relative rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      {hideAddress ? (
        <FeatureOverlay
          isBlur
          size='md'
          icon={MapPin}
          isDevMode={false}
          title="Address Protected"
          description="For privacy and security, the exact location is hidden until your appointment is confirmed. We will send you the full address once confirmed."
          borderRadius='rounded-xl'
        />
      ) : (
        showHeading || canUpdate) && (
        <CardHeader className="flex justify-between items-center">
          {showHeading && (
            <CardTitle className="flex flex-row space-x-2"> <Map className="size-4 text-indigo-500" /> <span>Address</span></CardTitle>
          )}
          {canUpdate && (
            <Button
              title="Update Password"
              variant={showForm ? 'destructive' : 'secondary'}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/30 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              onClick={(e) => {
                e.preventDefault();
                setShowForm(!showForm);
              }}
            >
              {showForm ? 'Cancel' : 'Update'}
            </Button>
          )}
        </CardHeader>
      )}
      {(!isShowPreview || isUserLookingProvider) && (
        <>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <DataField
                label="Address Line"
                value={data?.addressLine}
                Icon={MapPin}
                isLoading={isLoading}
                shimmerWidth="w-48"
              />
            </div>

            <DataField
              label="Landmark"
              value={data?.landmark}
              Icon={MapPinPlus}
              isLoading={isLoading}
              shimmerWidth="w-28"
            />

            <DataField
              label="Place"
              value={data?.place}
              Icon={Map}
              isLoading={isLoading}
              shimmerWidth="w-28"
            />

            <DataField
              label="City"
              value={data?.city}
              Icon={Building}
              isLoading={isLoading}
              shimmerWidth="w-24"
            />

            <DataField
              label="District"
              value={data?.district}
              Icon={Landmark}
              isLoading={isLoading}
              shimmerWidth="w-28"
            />

            <DataField
              label="State"
              value={data?.state}
              Icon={MapPinned}
              isLoading={isLoading}
              shimmerWidth="w-28"
            />

            <DataField
              label="Pincode"
              value={data?.pincode}
              Icon={Mail}
              isLoading={isLoading}
              shimmerWidth="w-20"
            />

            <DataField
              label="Country"
              value={data?.country}
              Icon={Globe}
              isLoading={isLoading}
              shimmerWidth="w-24"
            />

            <DataField
              label="Phone"
              value={data?.phone}
              Icon={Phone}
              canCopy
              isLoading={isLoading}
              shimmerWidth="w-28"
            />
          </CardContent>
          <CardContent>
            {(isLoading || data?.location?.coordinates) && (
              <div className="col-span-2">
                {isLoading ? (
                  <div className="w-full h-52 rounded-lg overflow-hidden border border-slate-100 dark:border-border">
                    <DataShimmer w="w-full" h="h-full" />
                  </div>
                ) : (
                  data?.location?.coordinates && (
                    <MapPreview lat={data.location.coordinates[1]} lon={data.location.coordinates[0]} />
                  )
                )}
              </div>
            )}
          </CardContent>
        </>
      )}

      <AnimatePresence initial={false}>
        {showForm && (
          <motion.div
            key="address-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <SelectSeparator />
            <CardContent className="space-y-2 mt-4">
              <AddressForm isUpdating={true} heading="Update Address" />
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default AddressListing;
