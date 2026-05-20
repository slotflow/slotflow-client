import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/appStore";
import PageHeader from "@/components/common/PageHeader";
import PaymentSelection from "@/components/payment/PaymentSelection";
import ProviderPlanList from "@/components/provider/ProviderPlanList";
import ProviderFreeSubscription from "@/components/provider/ProviderFreeSubscription";
import ProviderSubscriptionHistory from "@/components/provider/ProviderSubscriptionHistory";

const ProviderSubscriptionPage: React.FC = () => {

    const [showPlans, setShowPlans] = useState<boolean>(false);
    const { planId, planDuration, isTrialPlan, paymentSelectionOpen } = useSelector((store: RootState) => store.provider);

    return (
        <div className="p-4">
            <PageHeader
                title="Subscriptions"
                description="Manage your subscription and view history"
                actionLabel={showPlans ? "Hide Plans" : "Show Plans"}
                onActionClick={() => setShowPlans(!showPlans)}
            />
            <ProviderSubscriptionHistory />
            {showPlans && (
                <ProviderPlanList />
            )}

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
