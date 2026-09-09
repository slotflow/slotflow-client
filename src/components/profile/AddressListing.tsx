import { useState } from 'react';
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
import { Button } from '../ui/button';
import DataField from '../app/DataField';
import { useSelector } from 'react-redux';
import MapPreview from '../map/MapPreview';
import { useQuery } from '@tanstack/react-query';
import { RootState } from '@/app/store/appStore';
import AddressForm from '../form/Common/AddressForm';
import { AnimatePresence, motion } from 'framer-motion';
import DataFetchingError from '../error/DataFetchingError';
import DataShimmer from '@/components/shimmers/DataShimmer';
import { defaultButtonClassName } from '@/shared/utils/constants';
import { UserOrProviderAddressDetailsProps } from '@/shared/types/component';

const AddressListing = ({
  userOrProviderId,
  fetchApiFunction,
  queryKey,
  isUserLookingProvider = false,
  canUpdate = false,
  showHeading = false,
}: UserOrProviderAddressDetailsProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const isShowPreview = useSelector((state: RootState) => state.provider.isShowPreview);

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
    <div className="space-y-6 pb-8 sm:pb-12">
      {(showHeading || canUpdate) && (
        <div className="flex items-center justify-between gap-4 py-1">
          <div>
            {showHeading && (
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                <Map className="w-4 h-4 text-indigo-500" /> Address Details
              </h3>
            )}
          </div>

          {canUpdate && (
            <Button
              title="Update Address"
              variant={showForm ? 'destructive' : 'default'}
              className={defaultButtonClassName}
              onClick={(e) => {
                e.preventDefault();
                setShowForm(!showForm);
              }}
            >
              {showForm ? 'Cancel Update' : 'Update Address'}
            </Button>
          )}
        </div>
      )}

      <div className="p-6 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm space-y-4">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-border/60 pb-3">
          <MapPin className="w-4 h-4 text-indigo-500" /> Location Details
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {!isShowPreview && !isUserLookingProvider && (
            <DataField
              label="Phone"
              value={data?.phone}
              Icon={Phone}
              canCopy
              isLoading={isLoading}
              shimmerWidth="w-28"
            />
          )}
        </div>
      </div>

      {(isLoading || data?.location?.coordinates) && (
        <div className="p-6 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm space-y-4">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-border/60 pb-3">
            <Globe className="w-4 h-4 text-indigo-500" /> Map Location
          </h4>

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
            <div className="p-6 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
              <AddressForm isUpdating={true} heading="Update Address" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddressListing;
