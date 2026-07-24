import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CheckIcon, MinusIcon } from "lucide-react";
import { PLAN_TIERS, planFeatures, PlanList } from "@/shared/utils/constants";

const PricingFeaturesDetails = () => {
    return (
        <section id="table" className="w-full hidden lg:block">
            <div className="mt-20 lg:mt-32 max-w-7xl mx-auto">
                <Table className="table">
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
        </section>
    )
}

export default PricingFeaturesDetails;

const PlanCheck: React.FC<{ available: boolean }> = ({ available }) => (
    <div className="mx-auto w-min">
        {available ? <CheckIcon className="h-5 w-5" /> : <MinusIcon className="h-5 w-5" />}
    </div>
);