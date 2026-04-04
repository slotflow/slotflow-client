import React from 'react';
import PlanCard from '../plan/PlanCard';
import { useQuery } from '@tanstack/react-query';
import { providerFetchPlans } from '@/utils/apis/plan';
import DataFetchingError from '../error/DataFetchingError';
import ProviderPlanCardShimmer from '../shimmers/ProviderPlanCardShimmer';

const ShimmerCount = Array.from({ length: 3 });

const ProviderPlanList: React.FC = () => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: providerFetchPlans,
        queryKey: ["plans"],
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6`} >
            {isLoading ? (
                ShimmerCount.map((_, index) => (
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
                        />
                    )
                })
            ) : (
                <DataFetchingError message="No plans found" />
            )}
        </div>
    );
};

export default ProviderPlanList;