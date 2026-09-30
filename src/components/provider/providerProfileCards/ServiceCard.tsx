import NoData from '@/components/common/NoData';
import { Hash, Layers, Info } from 'lucide-react';
import DataField from '@/components/app/DataField';
import { Card, CardContent } from '@/components/ui/card';
import { ServiceCardProps } from '@/shared/types/component';
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
              {data?.isGroupService && data?.maxParticipants && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-800/50 text-indigo-900 dark:text-indigo-200 text-xs font-medium">
                  <Info className="size-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>
                    This provider offers group sessions, accommodating a maximum of{' '}
                    <strong className="font-semibold text-indigo-950 dark:text-indigo-100">
                      {data.maxParticipants} participants
                    </strong>.
                  </span>
                </div>
              )}
              {!isShowPreview && !isUserLookingProvider && (
                <>
                  <DataField label="Type" value={data?.serviceType} Icon={Layers} />
                  {data?.tags && data.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {data.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground"
                        >
                          <Hash className="size-3 text-muted-foreground" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
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
