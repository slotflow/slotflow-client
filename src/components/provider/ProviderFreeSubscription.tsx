import { useState } from 'react';
import { toast } from 'react-toastify';
import { RootState } from '@/app/store/appStore';
import { X, Coins, Check, Sparkles, ShieldCheck, LoaderCircle } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setSubscription } from '@/app/store/slices/authSlice';
import { subscribeToTrialPlan } from '@/services/apis/subscription';
import { PlanName, SubscriptionStatus } from '@/shared/types/enums';
import {
  setPaymentSelectionOpen,
  setSubscriptionPaymentData,
} from '@/app/store/slices/paymentSlice';
import { queryKeys } from '@/shared/utils/constants';

const ProviderFreeSubscription = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { isOpen } = useSelector((store: RootState) => store.payment);

  const handleFreeTrialSelectionClose = () => {
    dispatch(setPaymentSelectionOpen(false));
    dispatch(setSubscriptionPaymentData(null));
    dispatch(
      setSubscription({
        subscribedPlan: PlanName.TRIAL,
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        subscriptionStatus: SubscriptionStatus.ACTIVE,
      }),
    );
  };

  const makeTrialubscription = async () => {
    setPaymentLoading(true);
    try {
      const res = await subscribeToTrialPlan();

      if (res.success) {
        toast.success(res.message);
        handleFreeTrialSelectionClose();
      } else {
        toast.error('Failed to subscribe trial, please try again.');
      }

      queryClient.invalidateQueries({ queryKey: [queryKeys.SUBSCRIPTIONS] });
    } catch {
      setPaymentLoading(false);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
        {!paymentLoading ? (
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-[var(--background)] shadow-2xl">
            <button
              type="button"
              onClick={handleFreeTrialSelectionClose}
              className="cursor-pointer absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="px-7 pb-7 pt-8">
              <div className="mb-6 flex items-center justify-center">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-8 ring-primary/5">
                  <Coins className="h-8 w-8 text-primary" />

                  <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--background)] bg-primary">
                    <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    7-DAY FREE TRIAL
                  </span>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Start your free trial
                </h2>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  Explore SlotFlow and experience everything you need to manage your appointments
                  effortlessly.
                </p>
              </div>

              <div className="mt-7 rounded-xl border border-border bg-muted/30 p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">7 days of free access</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Up to 7 appointments</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">No payment required</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={makeTrialubscription}
                className="cursor-pointer group mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25 active:translate-y-0"
              >
                <Coins className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                Start Free Trial
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-border bg-[var(--background)] px-8 py-10 shadow-2xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <LoaderCircle className="h-7 w-7 animate-spin text-primary" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">Activating your trial</h3>

            <p className="mt-2 text-center text-sm text-muted-foreground">
              Setting up your SlotFlow trial. This will only take a moment.
            </p>
          </div>
        )}
      </div>
    )
  );
};

export default ProviderFreeSubscription;
