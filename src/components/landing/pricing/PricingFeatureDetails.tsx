import React from 'react';
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table';
import { BillingCycle } from '@/shared/types/enums';
import { CheckIcon, MinusIcon, Clock3Icon } from 'lucide-react';
import { formatNumberToPrice } from '@/shared/utils/helper/formatter';
import { PLAN_TIERS, planFeatures } from '@/shared/utils/constants/planConstants';
import { PlanFeatureValueProps, PricingFeatureDetailsProps } from '@/shared/types/component';

export type PlanTier = (typeof PLAN_TIERS)[number];

const PricingFeatureDetails = ({
  billingCycle = BillingCycle.MONTHLY,
  plans,
}: PricingFeatureDetailsProps) => {
  return (
    <section id="table" className="hidden w-full lg:block">
      <div className="mx-auto mt-20 max-w-7xl lg:mt-32">
        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/60 hover:bg-muted/60">
                <TableHead className="w-5/12 px-6 py-5 text-base font-semibold text-foreground">
                  Features
                </TableHead>

                {plans.map((plan) => {
                  return (
                    <TableHead
                      key={plan.displayName}
                      className={`w-2/12 px-4 py-5 text-center ${
                        plan.isPopular ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-base font-semibold text-foreground">
                          {plan.displayName}
                        </span>

                        <span className="text-xs font-normal text-muted-foreground">
                          {billingCycle === BillingCycle.MONTHLY
                            ? plan.monthlyPrice === 0
                              ? 'Free'
                              : formatNumberToPrice(plan.monthlyPrice, 0)
                            : plan.yearlyPrice === 0
                              ? 'FREE'
                              : formatNumberToPrice(plan.yearlyPrice, 0)}
                        </span>
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>

            <TableBody>
              {planFeatures.map((featureType) => (
                <React.Fragment key={featureType.type}>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableCell
                      colSpan={5}
                      className="px-6 py-4 text-sm font-bold uppercase tracking-wide text-foreground"
                    >
                      {featureType.type}
                    </TableCell>
                  </TableRow>

                  {featureType.features.map((feature) => (
                    <TableRow key={feature.name} className="group hover:bg-muted/20">
                      <TableCell className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium text-foreground">
                            {feature.name}
                          </span>

                          {feature.inDevelopment && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock3Icon className="h-3.5 w-3.5" />
                              Coming soon
                            </span>
                          )}
                        </div>
                      </TableCell>

                      {PLAN_TIERS.map((tier) => (
                        <TableCell
                          key={tier}
                          className={`px-4 py-4 text-center ${
                            tier === 'professional' ? 'bg-primary/[0.02]' : ''
                          }`}
                        >
                          <PlanFeatureValue
                            available={feature[tier]}
                            inDevelopment={feature.inDevelopment}
                            limit={feature.limit?.[tier]}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default PricingFeatureDetails;

const PlanFeatureValue: React.FC<PlanFeatureValueProps> = ({ available, inDevelopment, limit }) => {
  if (!available) {
    return (
      <div className="flex justify-center">
        <MinusIcon className="h-4 w-4 text-muted-foreground/50" />
      </div>
    );
  }

  if (inDevelopment) {
    return (
      <div className="flex flex-col items-center gap-1">
        <Clock3Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Coming soon</span>
      </div>
    );
  }

  if (limit) {
    return <span className="text-sm font-medium text-foreground">{limit}</span>;
  }

  return (
    <div className="flex justify-center">
      <CheckIcon className="h-5 w-5 text-primary" />
    </div>
  );
};
