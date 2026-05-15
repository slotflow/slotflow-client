import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { RootState } from "@/shared/redux/appStore";
import { defaultButtonClassName } from "@/shared/utils/constants";
import PaymentSelection from "@/components/payment/PaymentSelection";
import ProviderPlanList from "@/components/provider/ProviderPlanList";
import ProviderFreeSubscription from "@/components/provider/ProviderFreeSubscription";
import ProviderSubscriptionHistory from "@/components/provider/ProviderSubscriptionHistory";

const ProviderSubscriptionPage: React.FC = () => {

    const [showPlans, setShowPlans] = useState<boolean>(false);
    const { planId, planDuration, isTrialPlan, paymentSelectionOpen } = useSelector((store: RootState) => store.provider);

    return (
        <div>
            <ProviderSubscriptionHistory />
            <div className="p-4">
                <Button
                    variant="default"
                    title={showPlans ? "Hide Plans" : "Show Plans"}
                    className={defaultButtonClassName}
                    onClick={() => setShowPlans(!showPlans)} >{showPlans ? "Hide Plans" : "Show Plans"}</Button>
                {showPlans && (
                    <ProviderPlanList />
                )}
            </div>

            {paymentSelectionOpen && planId && planDuration && (
                <PaymentSelection
                    data={{
                        planId: planId,
                        planDuration: planDuration,
                    }}
                    isProviderSubscription
                />
            )}

            {isTrialPlan && paymentSelectionOpen && (
                <ProviderFreeSubscription />
            )}
        </div>
    );
};

export default ProviderSubscriptionPage;
