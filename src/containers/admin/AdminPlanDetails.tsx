import {
  X,
  Ban,
  Clock,
  Check,
  Layers,
  Calendar,
  RotateCw,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  CreditCard,
  ShieldAlert,
  CircleCheck,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import CopyableId from '@/components/common/CopyField';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminPlan } from '@/hooks/adminHooks/usePlan';
import StatusBadge from '@/components/common/StatusBadge';
import DataShimmer from '@/components/shimmers/DataShimmer';
import { adminFetchPlanDetails } from '@/services/apis/plan';
import DataFetchingError from '@/components/error/DataFetchingError';
import DashboardDataCard from '@/components/common/DashboardDataCard';
import { Plan } from '@/shared/types/entity/planInterface';
import { StripeSyncStatus } from '@/shared/types/enums';

const AdminPlanDetails = () => {
  
  const navigate = useNavigate();
  const { planId } = useParams<{ planId: Plan['_id'] }>();

  const { changePlanBlockStatus, resyncPlanWithStripe, resyncingPlanId, changeBlockStatusPlanId } =
    useAdminPlan();

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryFn: async () => {
      const res = await adminFetchPlanDetails({ planId: planId! });
      return res.data;
    },
    queryKey: [queryKeys.PLAN_DETAILS, planId],
    enabled: !!planId,
  });

  const handleRefetch = async () => {
    const { isSuccess } = await refetch();
    if (isSuccess) {
      toast.success('Plan details refreshed successfully');
    } else {
      toast.error('Failed to refresh plan details');
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
        <DataFetchingError message="No data found" />
      </div>
    );
  }

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
                <ArrowLeft className="w-3.5 h-3.5" /> Plans
              </button>
              <span>/</span>
              {isLoading ? (
                <DataShimmer w="w-24" h="h-3" />
              ) : (
                <span className="font-mono">{data?._id}</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {isLoading ? <DataShimmer w="w-48" h="h-8" /> : `${data?.planName} Plan`}
              </h1>

              {isLoading ? (
                <div className="flex gap-2">
                  <DataShimmer w="w-16" h="h-5" className="rounded-full" />
                  <DataShimmer w="w-24" h="h-5" className="rounded-full" />
                </div>
              ) : (
                <>
                  <StatusBadge
                    type={
                      changeBlockStatusPlanId === data?._id
                        ? 'updating'
                        : !data?.isBlocked
                          ? 'active'
                          : 'blocked'
                    }
                  />

                  <StatusBadge
                    type={
                      resyncingPlanId === data?._id
                        ? 'updating'
                        : !data?.stripeSync
                          ? 'pending'
                          : 'verified'
                    }
                    label={!data?.stripeSync ? 'Sync Pending' : 'Stripe Synced'}
                    icon={
                      !data?.stripeSync ? (
                        <Clock className="w-3 h-3 text-amber-500" />
                      ) : (
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      )
                    }
                  />
                </>
              )}
            </div>
            {isLoading ? (
              <DataShimmer w="w-96" h="h-4" className="mt-2" />
            ) : (
              <p className="text-sm text-slate-500 max-w-xl">{data?.description}</p>
            )}
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
            {data?.stripeSync === StripeSyncStatus.PENDING && (
              <button
                disabled={isLoading}
                onClick={() => resyncPlanWithStripe({ planId: planId! })}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/30 shadow-sm transition-all cursor-pointer"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-slate-500 ${resyncingPlanId && 'animate-spin'}`}
                />
                Re-sync Stripe
              </button>
            )}
            <button
              onClick={() =>
                changePlanBlockStatus({ planId: planId!, isBlocked: !(data?.isBlocked ?? false) })
              }
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border shadow-sm transition-all cursor-pointer ${
                data?.isBlocked
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent'
                  : 'bg-white dark:bg-muted/20 text-rose-600 border-slate-200 dark:border-border hover:bg-rose-50 dark:hover:bg-rose-950/30'
              }`}
            >
              {' '}
              {data?.isBlocked ? (
                <CircleCheck className="w-3.5 h-3.5" />
              ) : (
                <Ban className="w-3.5 h-3.5" />
              )}
              {data?.isBlocked ? 'Unblock Plan' : 'Block Plan'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardDataCard
            label="Monthly Rate"
            icon={CreditCard}
            value={data?.monthlyPrice}
            price
            suffix=" /mo"
            isLoading={isLoading}
          />

          <DashboardDataCard
            label="Yearly Rate"
            icon={Calendar}
            value={data?.yearlyPrice}
            price
            suffix=" /yr"
            isLoading={isLoading}
          />

          <DashboardDataCard
            label="Max Bookings"
            icon={Layers}
            value={data?.maxBookingPerMonth}
            suffix=" /mo"
            isLoading={isLoading}
          />

          <DashboardDataCard
            label="Trial Window"
            icon={Sparkles}
            value={data?.hasTrial ? `${data.trialDays} Days` : 'Disabled'}
            status={data?.hasTrial}
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
                    Stripe Integration Details
                  </h2>
                </div>
                {!isLoading && data?.stripeSync === StripeSyncStatus.SYNCED && (
                  <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Fully Synchronized
                  </span>
                )}
              </div>

              <div className="p-6 space-y-4">
                {isLoading ? (
                  <div className="space-y-3">
                    <DataShimmer h="h-6" />
                    <DataShimmer h="h-6" />
                    <DataShimmer h="h-6" />
                  </div>
                ) : data?.stripePlanDetails ? (
                  <div className="space-y-3">
                    <CopyableId label="Product ID" value={data.stripePlanDetails.productId} />
                    <CopyableId
                      label="Monthly Price ID"
                      value={data.stripePlanDetails.monthlyPriceId}
                    />
                    <CopyableId
                      label="Yearly Price ID"
                      value={data.stripePlanDetails.yearlyPriceId}
                    />
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
                    <ShieldAlert className="size-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                        Stripe product not provisioned
                      </p>
                      <p className="text-xs text-amber-700 dark:text-amber-400">
                        This plan exists locally but has not been mapped to a Stripe Product or
                        Price structure. Click &quot;Re-sync Stripe&quot; above to push this plan
                        live.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/20 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-border">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Plan Features
                </h2>
              </div>
              <div className="p-6">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <DataShimmer h="h-9" />
                    <DataShimmer h="h-9" />
                    <DataShimmer h="h-9" />
                    <DataShimmer h="h-9" />
                  </div>
                ) : data?.features && data.features.length > 0 ? (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {data.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-100 dark:border-border bg-slate-50/50 dark:bg-muted/20 text-xs font-medium text-slate-700 dark:text-slate-300"
                      >
                        <span className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    No explicit features defined for this tier.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/20 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-border">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Configuration
                </h2>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-border text-xs">
                <div className="px-6 py-3.5 flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Ad Visibility</span>
                  {isLoading ? (
                    <DataShimmer w="w-16" h="h-4" />
                  ) : data?.adVisibility ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <Check className="size-4" /> Enabled
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-400">
                      <X className="size-4" /> Disabled
                    </span>
                  )}
                </div>

                <div className="px-6 py-3.5 flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Free Trial Eligibility</span>
                  {isLoading ? (
                    <DataShimmer w="w-20" h="h-4" />
                  ) : data?.hasTrial ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <Check className="size-4" /> Yes ({data.trialDays} Days)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-400">
                      <X className="size-4" /> No
                    </span>
                  )}
                </div>

                <div className="px-6 py-3.5 flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Purchasable</span>
                  {isLoading ? (
                    <DataShimmer w="w-24" h="h-4" />
                  ) : !data?.isBlocked ? (
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Publicly Available
                    </span>
                  ) : (
                    <span className="font-semibold text-rose-600 dark:text-rose-400">Blocked</span>
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

export default AdminPlanDetails;
