import {
  X,
  Ban,
  Clock,
  Check,
  Layers,
  Calendar,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  CreditCard,
  ShieldAlert,
  CheckCircle2,
  CircleCheck,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { queryClient } from '@/lib/queryClient';
import { useQuery } from '@tanstack/react-query';
import CopyableId from '@/components/common/CopyField';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminPlan } from '@/hooks/adminHooks/usePlan';
import DataShimmer from '@/components/shimmers/DataShimmer';
import { adminFetchPlanDetails } from '@/services/apis/plan';
import DataFetchingError from '@/components/error/DataFetchingError';
import { formatNumberToPrice } from '@/shared/utils/helper/formatter';
import { Plan, StripeSyncStatus } from '@/shared/types/entity/planInterface';

const PlanDetailsPage = () => {
  const navigate = useNavigate();
  const { planId } = useParams<{ planId: Plan['_id'] }>();

  const { changePlanBlockStatus, resyncPlanWithStripe, resyncingPlanId } = useAdminPlan();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => {
      const res = await adminFetchPlanDetails(planId!);
      return res.data;
    },
    queryKey: ['plan', planId],
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!planId,
  });

  const handleAdminChangePlanStatus = async () => {
    if (!data) return;
    const res = await changePlanBlockStatus({ planId: data._id, isBlocked: data.isBlocked });
    if (res.success) {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['plan', planId] });
    } else {
      toast.error(res.message);
    }
  };

  const handleResyncStripe = async () => {
    if (!data) return;
    const res = await resyncPlanWithStripe({ planId: data._id });
    if (res.success) {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['plan', planId] });
    } else {
      toast.error(res.message);
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
    <div className="p-4 h-full">
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
                  {!data?.isBlocked ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      Blocked
                    </span>
                  )}

                  {data?.stripeSync === StripeSyncStatus.SYNCED ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 dark:bg-muted/20 dark:text-slate-300 dark:border-border">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      Stripe Synced
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800">
                      <Clock className="w-3 h-3 text-amber-500" />
                      Sync Pending
                    </span>
                  )}
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
              disabled={isLoading || data?.stripeSync == StripeSyncStatus.SYNCED}
              onClick={handleResyncStripe}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/30 shadow-sm transition-all cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-slate-500 ${resyncingPlanId && 'animate-spin'}`}
              />
              Re-sync Stripe
            </button>
            <button
              onClick={handleAdminChangePlanStatus}
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
          <div className="p-5 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/20 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span>Monthly Rate</span>
              <CreditCard className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {isLoading ? (
                <DataShimmer w="w-24" h="h-7" />
              ) : (
                <>
                  {formatNumberToPrice(data!.monthlyPrice)}
                  <span className="text-xs font-normal text-slate-500"> /mo</span>
                </>
              )}
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/20 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span>Yearly Rate</span>
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {isLoading ? (
                <DataShimmer w="w-24" h="h-7" />
              ) : (
                <>
                  {formatNumberToPrice(data!.yearlyPrice)}
                  <span className="text-xs font-normal text-slate-500"> /yr</span>
                </>
              )}
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/20 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span>Max Bookings</span>
              <Layers className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {isLoading ? (
                <DataShimmer w="w-20" h="h-7" />
              ) : (
                <>
                  {data!.maxBookingPerMonth.toLocaleString()}
                  <span className="text-xs font-normal text-slate-500"> /mo</span>
                </>
              )}
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/20 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span>Trial Window</span>
              <Sparkles className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {isLoading ? (
                <DataShimmer w="w-20" h="h-7" />
              ) : data!.hasTrial ? (
                `${data!.trialDays} Days`
              ) : (
                'Disabled'
              )}
            </div>
          </div>
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
                    <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
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
                        <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
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
                      <Check className="w-4 h-4" /> Enabled
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-400">
                      <X className="w-4 h-4" /> Disabled
                    </span>
                  )}
                </div>

                <div className="px-6 py-3.5 flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Free Trial Eligibility</span>
                  {isLoading ? (
                    <DataShimmer w="w-20" h="h-4" />
                  ) : data?.hasTrial ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <Check className="w-4 h-4" /> Yes ({data.trialDays} Days)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-400">
                      <X className="w-4 h-4" /> No
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

export default PlanDetailsPage;
