import React, { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import ProviderPlanList from "@/components/provider/ProviderPlanList";
import ProviderSubscriptionHistory from "@/components/provider/ProviderSubscriptionHistory";

const ProviderSubscriptionPage: React.FC = () => {

    const [showPlans, setShowPlans] = useState<boolean>(false);

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
        </div>
    );
};

export default ProviderSubscriptionPage;
