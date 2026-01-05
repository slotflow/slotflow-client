import React from 'react';
import PlanCard from '../common/PlanCard';
import { useQuery } from '@tanstack/react-query';
import DataFetchingError from '../common/DataFetchingError';
import { providerFetchPlans } from '@/utils/apis/provider.api';
import ProviderPlanCardShimmer from '../shimmers/ProviderPlanCardShimmer';

const ShimmerCount = Array.from({ length: 3 });

export interface ProviderPlanListProps {
    showPlans: boolean;
}

const ProviderPlanList: React.FC<ProviderPlanListProps> = ({ showPlans }) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: providerFetchPlans,
        queryKey: ["plans"],
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6 ${!showPlans && "hidden"}`} >
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