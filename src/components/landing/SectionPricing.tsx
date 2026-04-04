import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "./Heading";
import PlanCard from "../plan/PlanCard";
import { CheckIcon, MinusIcon } from "lucide-react";
import { PLAN_TIERS, planFeatures, PlanList } from "@/utils/constants";

export default function SectionPricing() {
  return (
    <section id="pricing" className="w-full bg-[var(--background)]">
      <div className="mx-auto px-4 lg:px-0 max-w-7xl py-24 lg:py-32 transition-colors duration-300 ease-in-out">
        <Heading heading='Pricing' headingDescription='Whatever your status, our offers evolve according to your needs.' />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:items-center">
          {PlanList.map(plan => (
            <PlanCard
              key={plan._id}
              isTrial={true}
              plan={plan}
              dummy={true}
              popular={plan._id === "2" ? true : false}
              data-aos="fade-up"
            />
          ))}
        </div>

        <div className="mt-20 lg:mt-32">
          <Heading heading='Compare Plans' headingDescription='Pick the best plan for your service.' />

          <Table className="table" data-aos="fade-left">
            <TableHeader>
              <TableRow className="bg-muted hover:bg-muted">
                <TableHead className="w-3/12 text-primary">Plans</TableHead>
                {PlanList.map(plan => (
                  <TableHead key={plan.planName} className="w-2/12 text-primary text-lg font-medium text-center">
                    {plan.planName}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {planFeatures.map((featureType) => (
                <React.Fragment key={featureType.type} >
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={5} className="font-bold">
                      {featureType.type}
                    </TableCell>
                  </TableRow>
                  {featureType.features.map((feature) => (
                    <TableRow key={feature.name} className="text-muted-foreground">
                      <TableCell>{feature.name}</TableCell>
                      {PLAN_TIERS.map((tier) => (
                        <TableCell key={tier}>
                          <PlanCheck available={feature[tier]} />
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
}

const PlanCheck: React.FC<{ available: boolean }> = ({ available }) => (
  <div className="mx-auto w-min">
    {available ? <CheckIcon className="h-5 w-5" /> : <MinusIcon className="h-5 w-5" />}
  </div>
);

