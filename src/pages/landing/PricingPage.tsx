import { useState } from "react";
import { motion } from "framer-motion";
import { IndianRupee } from "lucide-react";
import PlanCard from "@/components/plan/PlanCard";
import { PlanList } from "@/shared/utils/constants";
import MoveUpward from "@/components/animation/MoveUpward";
import SectionHeading from "@/components/common/SectionHeading";
import PricingFeaturesDetails from "@/components/landing/pricing/PricingFeaturesDetails";

const PricingPage = () => {

  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <main className="w-full">
      <SectionHeading
        badge="Pricing"
        badgeIcon={IndianRupee}
        title={<>
          Simple <span className="text-[#635bff]">pricing</span> that scales
          <br />
          with your <span className="text-[#635bff]">business.</span>
        </>}
        description="Whether you're just getting started or managing thousands of
                bookings every month, choose a plan that grows with you."
      />

      <section className="w-full">
        <div className="mx-auto px-4 lg:px-0 max-w-7xl transition-colors duration-300 ease-in-out">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="mt-10 flex justify-center">
              <div className="relative flex items-center rounded-full border border-border bg-background/70 p-1 shadow-lg backdrop-blur-xl">
                <motion.div
                  layoutId="billing-toggle"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                  className="absolute inset-y-1 rounded-full bg-primary"
                  animate={{
                    width: billingCycle === "monthly" ? 108 : 100,
                    left: billingCycle === "monthly" ? 4 : 112,
                  }}
                />

                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`relative z-10 px-8 py-2 text-sm font-semibold transition-colors ${billingCycle === "monthly"
                    ? "text-primary-foreground"
                    : "text-muted-foreground"
                    }`}
                >
                  Monthly
                </button>

                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`relative z-10 px-8 py-2 text-sm font-semibold transition-colors ${billingCycle === "yearly"
                    ? "text-primary-foreground"
                    : "text-muted-foreground"
                    }`}
                >
                  Yearly
                </button>

                <span className="ml-3 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
                  Save 20%
                </span>
              </div>
            </div>
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

