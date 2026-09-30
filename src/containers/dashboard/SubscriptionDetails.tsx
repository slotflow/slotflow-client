import {
  ArrowLeft,
  RotateCw,
  Package,
  Calendar,
  CalendarClock,
  CalendarDays,
  ListOrdered,
  Megaphone,
  BadgeCheck,
  Check,
  X,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import DataField from '@/components/app/DataField';
import StatusBadge from '@/components/common/StatusBadge';
import CopyableId from '@/components/common/CopyField';
import DataShimmer from '@/components/shimmers/DataShimmer';
import DataFetchingError from '@/components/error/DataFetchingError';
import DashboardDataCard from '@/components/common/DashboardDataCard';
import { fetchSubscriptionDetails } from '@/services/apis/subscription';
import { formatString } from '@/shared/utils/helper/formatString';
import { formatDate } from '@/shared/utils/helper/formatDate';

const SubscriptionDetails = () => {
  const navigate = useNavigate();
  const { subscriptionId } = useParams<{ subscriptionId: string }>();

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryFn: async () => {
      const res = await fetchSubscriptionDetails(subscriptionId!);
      return res.data;
    },
    queryKey: [queryKeys.SUBSCRIPTION, subscriptionId],
    enabled: !!subscriptionId,
  });

  const handleRefetch = async () => {
    const { isSuccess } = await refetch();
    if (isSuccess) {
      toast.success('Subscription details refreshed successfully');
    } else {
      toast.error('Failed to refresh subscription details');
    }
  };

  if (isError && error) {
    return (
      <div className="p-4 h-full">
        <DataFetchingError message={(error as Error).message} />
      </div>
    );
  }

  if (!isLoading && !data) {
    return (
      <div className="p-4 h-full">
        <DataFetchingError message="No subscription record found" />
      </div>
    );
  }

  // Helper function to resolve status badge type dynamically
  const getSubscriptionStatusType = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'active';
      case 'canceled':
      case 'cancelled':
      case 'expired':
        return 'blocked';
      case 'past_due':
      case 'trailing':
        return 'pending';
      default:
        return 'normal';
    }
  };

  return (
    <div className="h-full">
      <div className="space-y-8 min-h-screen font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-border pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <button
                onClick={() => navigate(-1)}
                className="hover:underline flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Subscriptions
              </button>
              <span>/</span>
              {isLoading ? (
                <DataShimmer w="w-24" h="h-3" />
              ) : (
                <span className="font-mono">{data?._id || subscriptionId}</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {isLoading ? (
                  <DataShimmer w="w-48" h="h-8" />
                ) : (
                  `Subscription Details`
                )}
              </h1>

              {isLoading ? (
                <DataShimmer w="w-20" h="h-5" className="rounded-full" />
              ) : (
                <StatusBadge
                  type={getSubscriptionStatusType(data?.subscriptionStatus)}
                  label={data?.subscriptionStatus ? String(data.subscriptionStatus).toUpperCase() : 'UNKNOWN'}
                />
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              disabled={isLoading || isFetching}
              onClick={handleRefetch}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/30 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 text-slate-500 ${isFetching && 'animate-spin'}`} />
              Refetch
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardDataCard
            label="Plan Name"
            icon={Package}
            value={formatString(data?.subscribedPlanId?.planName)}
            isLoading={isLoading}
          />

          <DashboardDataCard
            label="Max Monthly Bookings"
            icon={ListOrdered}
            value={data?.subscribedPlanId?.maxBookingPerMonth}
            suffix=" /mo"
            isLoading={isLoading}
          />

          <DashboardDataCard
            label="Period Start"
            icon={CalendarClock}
            value={formatDate(data?.currentPeriodStart)}
            isLoading={isLoading}
          />

          <DashboardDataCard
            label="Period End"
            icon={CalendarDays}
            value={formatDate(data?.currentPeriodEnd)}
            isLoading={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/20 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 font-bold text-xs">
                    S
                  </span>
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Subscription Lifecycle & Dates
                  </h2>
                </div>
              </div>

              <div className="p-6">
                {isLoading ? (
                  <div className="space-y-3">
                    <DataShimmer h="h-10" />
                    <DataShimmer h="h-10" />
                    <DataShimmer h="h-10" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DataField
                      label="Subscribed On"
                      value={data?.createdAt}
                      isDate
                      Icon={Calendar}
                    />
                    <DataField
                      label="Current Period Starts"
                      value={data?.currentPeriodStart}
                      isDate
                      Icon={CalendarClock}
                    />
                    <DataField
                      label="Current Period Ends"
                      value={data?.currentPeriodEnd}
                      isDate
                      Icon={CalendarDays}
                    />
                    {data?.cancelAt && (
                      <DataField
                        label="Cancellation Date"
                        value={data?.cancelAt}
                        isDate
                        Icon={CalendarClock}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/20 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-border">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Settings & Entitlements
                </h2>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-border text-xs">
                <div className="px-6 py-3.5 flex items-center justify-between">
                  <span className="text-slate-500 font-medium flex items-center gap-2">
                    <Megaphone className="w-3.5 h-3.5 text-slate-400" /> Ad Visibility
                  </span>
                  {isLoading ? (
                    <DataShimmer w="w-20" h="h-4" />
                  ) : data?.subscribedPlanId?.adVisibility ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <Check className="size-4" /> Ads Enabled
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-400">
                      <X className="size-4" /> Ads Hidden
                    </span>
                  )}
                </div>

                <div className="px-6 py-3.5 flex items-center justify-between">
                  <span className="text-slate-500 font-medium flex items-center gap-2">
                    <CalendarClock className="w-3.5 h-3.5 text-slate-400" /> Renewal Behavior
                  </span>
                  {isLoading ? (
                    <DataShimmer w="w-24" h="h-4" />
                  ) : data?.cancelAtPeriodEnd ? (
                    <span className="font-semibold text-amber-600 dark:text-amber-400">
                      Cancels at Period End
                    </span>
                  ) : (
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      Auto-renews Automatically
                    </span>
                  )}
                </div>

                <div className="px-6 py-3.5 flex items-center justify-between">
                  <span className="text-slate-500 font-medium flex items-center gap-2">
                    <BadgeCheck className="w-3.5 h-3.5 text-slate-400" /> Status
                  </span>
                  {isLoading ? (
                    <DataShimmer w="w-16" h="h-4" />
                  ) : (
                    <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">
                      {data?.subscriptionStatus || 'N/A'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetails;