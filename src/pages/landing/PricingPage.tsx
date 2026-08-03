import { useState } from "react";
import { IndianRupee } from "lucide-react";
import PlanCard from "@/components/plan/PlanCard";
import { PlanList } from "@/shared/utils/constants";
import MoveUpward from "@/components/animation/MoveUpward";
import SectionHeading from "@/components/common/SectionHeading";
import BillingCycleToggle from "@/components/plan/BillingCycleToggle";
import PricingFeaturesDetails from "@/components/landing/pricing/PricingFeaturesDetails";

const PricingPage = () => {

  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <main className="w-full">
      <SectionHeading
        badge="Pricing"
        badgeIcon={IndianRupee}
        title={<>
          Simple <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">pricing</span> that scales
          <br />
          with your <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">business.</span>
        </>}
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

      <MoveUpward>
        <section id="pricing-cards w-full">
          <div className="max-w-7xl mx-auto mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:items-center">
            {PlanList.map(plan => (
              <PlanCard
                key={plan._id}
                isTrial={true}
                plan={plan}
                dummy={true}
                popular={plan._id === "2" ? true : false}
                billingCycle={billingCycle}
              />
            ))}
          </div>
        </section>
      </MoveUpward>

      <MoveUpward>
        <PricingFeaturesDetails />
      </MoveUpward>

    </main>
  );
}



export default PricingPage;

