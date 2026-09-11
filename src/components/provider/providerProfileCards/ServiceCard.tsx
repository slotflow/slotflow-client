import NoData from '@/components/common/NoData';
import DataField from '@/components/app/DataField';
import { Card, CardContent } from '@/components/ui/card';
import { ServiceCardProps } from '@/shared/types/component';
import { Hash, Users, Layers, UserPlus } from 'lucide-react';
import DataFetchingError from '@/components/error/DataFetchingError';
import DataFieldShimmer from '@/components/shimmers/DataFieldShimmer';

const ServiceCard = ({
  isLoading,
  isError,
  data,
  isUserLookingProvider = false,
  isShowPreview = false,
}: ServiceCardProps) => {

  return (
    <Card className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      <CardContent>
        {isLoading ? (
          <DataFieldShimmer row={5} />
        ) : isError || !data ? (
          <DataFetchingError message="No service data found" />
        ) : !data ? (
          <NoData message="No service data available" />
        ) : (
          <>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">{data?.serviceName}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {data?.serviceDescription}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <DataField
                label="Group Service"
                value={data?.isGroupService}
                isBoolean
                Icon={Users}
              />
              <DataField
                label="Maximum Participants"
                value={data?.maxParticipants}
                Icon={UserPlus}
              />
              {/* <DataField
                label={data?.serviceMode === ServiceMode.BOTH ? 'Modes' : 'Mode'}
                value={
                  data?.serviceMode === ServiceMode.BOTH ? 'Online & Offline' : data?.serviceMode
                }
                Icon={MonitorSmartphone}
              /> */}
              {!isShowPreview && !isUserLookingProvider && (
                <>
                  <DataField label="Type" value={data?.serviceType} Icon={Layers} />
                  <DataField label="Tags" value={data?.tags} tags Icon={Hash} />
                </>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
