import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { RootState } from "@/utils/redux/appStore";
import ProviderPlanList from "@/components/provider/ProviderPlanList";
import CommonPaymentSelection from "@/components/common/CommonPaymentSelection";
import ProviderFreeSubscription from "@/components/provider/ProviderFreeSubscription";
import ProviderSubscriptionHistory from "@/components/provider/ProviderSubscriptionHistory";

const ProviderSubscriptionPage = () => {

    const [showPlans, setShowPlans] = useState<boolean>(false);
    const { planId, planDuration, isTrialPlan, paymentSelectionOpen } = useSelector((store: RootState) => store.provider);

    return (
        <div>
            <ProviderSubscriptionHistory />
            <div className="p-4">
                <Button
                    title={showPlans ? "Hide Plans" : "Show Plans"}
                    className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
                    onClick={() => setShowPlans(!showPlans)} >{showPlans ? "Hide Plans" : "Show Plans"}</Button>
                {showPlans && (
                    <ProviderPlanList />
                )}
            </div>

            {paymentSelectionOpen && planId && planDuration && (
                <CommonPaymentSelection
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
