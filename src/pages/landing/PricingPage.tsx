import { IndianRupee } from 'lucide-react';
import { useEffect, useState } from 'react';
import PlanCard from '@/components/plan/PlanCard';
import { BillingCycle } from '@/shared/types/enums';
import { useDispatch, useSelector } from 'react-redux';
import { getPlans } from '@/services/apis/contentful';
import { AppDispatch, RootState } from '@/app/store/appStore';
import SectionHeading from '@/components/common/SectionHeading';
import BillingCycleToggle from '@/components/plan/BillingCycleToggle';
import PricingFeatureDetails from '@/components/landing/pricing/PricingFeatureDetails';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(BillingCycle.MONTHLY);

  const dispatch = useDispatch<AppDispatch>();
  const { planData } = useSelector((state: RootState) => state.cms);

  useEffect(() => {
    dispatch(getPlans());
  }, [dispatch]);

  const plans = [...(planData?.plans || [])].sort((a, b) => a.planKey - b.planKey);
  const loading = planData?.loading;
  const error = planData?.error;

  console.log('plans : ', plans);

  return (
    <main className="w-full">
      <SectionHeading
        badge="Pricing"
        badgeIcon={IndianRupee}
        title={
          <>
            Simple{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
              pricing
            </span>{' '}
            that scales
            <br />
            with your{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
              business.
            </span>
          </>
        }
        description="Whether you're just getting started or managing thousands of
                bookings every month, choose a plan that grows with you."
      />

      <section className="w-full">
        <div className="mx-auto px-4 lg:px-0 max-w-7xl transition-colors duration-300 ease-in-out">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <BillingCycleToggle
              billingCycle={billingCycle}
              onBillingCycleChange={setBillingCycle}
            />
          </div>
        </div>
      </section>

      <section id="pricing-cards" className="w-full">
        {loading && plans.length === 0 ? (
          <div className="text-center py-12">Loading plans...</div>
        ) : error && plans.length === 0 ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <div className="max-w-7xl mx-auto mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:items-center">
            {plans.map((plan) => (
              <PlanCard
                key={plan.planKey}
                plan={{
                  ...plan,
                  _id: String(plan.planKey),
                  planName: plan.displayName,
                  features: plan.featuresList,
                }}
                dummy={false}
                popular={plan.isPopular}
                billingCycle={billingCycle}
              />
            ))}
          </div>
        )}
      </section>

      <PricingFeatureDetails billingCycle={billingCycle} plans={plans} />
    </main>
  );
};

export default PricingPage;
