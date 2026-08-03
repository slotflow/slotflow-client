import { useState } from 'react';
import PlanCard from '../plan/PlanCard';
import { useQuery } from '@tanstack/react-query';
import { providerFetchPlans } from '@/shared/apis/plan';
import DataFetchingError from '../error/DataFetchingError';
import BillingCycleToggle from '../plan/BillingCycleToggle';
import ProviderPlanCardShimmer from '../shimmers/ProviderPlanCardShimmer';

const ProviderPlanList = () => {

    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
    const { data, isLoading, isError, error } = useQuery({
        queryFn: async () => {
            const res = await providerFetchPlans();
            return res.data?.items;
        },
        queryKey: ["plans"],
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    return (<>
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
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6`} >
            {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                    <ProviderPlanCardShimmer key={index} />
                ))
            ) : isError && error ? (
                <DataFetchingError message={(error as Error).message} />
            ) : data ? (
                data.map((plan) => {
                    const isTrial: boolean = plan?.price === 0
                    return (
                        <PlanCard
                            key={plan._id}
                            plan={plan}
                            isTrial={isTrial}
                            dummy={false}
                            billingCycle={billingCycle}
                        />
                    )
                })
            ) : (
                <DataFetchingError message="No plans found" />
            )}
        </div>
    </>
    );
};

export default ProviderPlanList;