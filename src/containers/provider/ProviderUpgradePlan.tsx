import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { BillingCycle } from '@/shared/types/enums';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import PlanCard from '../../components/plan/PlanCard';
import { providerFetchPlans } from '@/services/apis/plan';
import { ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import DataFetchingError from '../../components/error/DataFetchingError';
import BillingCycleToggle from '../../components/plan/BillingCycleToggle';
import ProviderPlanCardShimmer from '../../components/shimmers/ProviderPlanCardShimmer';

const ProviderUpgradePlan = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(BillingCycle.MONTHLY);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => {
      const res = await providerFetchPlans();
      return res.data?.items;
    },
    queryKey: [queryKeys.PLANS],
  });

  return (
    <div className="relative min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-between overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto flex-1">
        <section className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Flexible Plans for Every Stage</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Ready to grow your business?
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Choose the plan that fits your business needs. Upgrade or downgrade anytime with no
            hidden lock-in fees.
          </p>

          <div className="pt-4 flex justify-center">
            <BillingCycleToggle
              billingCycle={billingCycle}
              onBillingCycleChange={setBillingCycle}
            />
          </div>
        </section>

        <div className="py-4">
          {isLoading ? (
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <ProviderPlanCardShimmer key={index} />
              ))}
            </div>
          ) : isError && error ? (
            <div className="max-w-md mx-auto my-8">
              <DataFetchingError message={(error as Error).message} />
            </div>
          ) : data && data.length > 0 ? (
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 items-stretch justify-center">
              {data.map((plan) => {
                return (
                  <div key={plan._id} className="flex">
                    <PlanCard plan={plan} dummy={false} billingCycle={billingCycle} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="max-w-md mx-auto my-8">
              <DataFetchingError message="No active plans available at the moment." />
            </div>
          )}
        </div>
      </div>

      <footer className="max-w-7xl w-full mx-auto pt-16 pb-6 mt-auto">
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <Button
            variant="link"
            onClick={() => navigate(-1)}
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-foreground transition-all duration-200 hover:-translate-x-0.5 active:translate-x-0"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Dashboard</span>
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-5xl" />
              <span>Secure Payment Guarantee</span>
            </div>
            <span className="hidden sm:inline text-border">•</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProviderUpgradePlan;
