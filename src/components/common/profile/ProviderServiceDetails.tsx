import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DataFetchingError from '../DataFetchingError';
import { serviceModeArray } from '@/utils/constants';
import InfoDisplayComponent from '../InfoDisplayComponent';
import ProfileDetailsShimmer from '../../shimmers/ProfileDetailsShimmer';
import { ProviderFetchServiceDetailsResponse } from '@/utils/interface/api/providerApiInterface';
import { AdminFetchProviderServiceResponse } from '@/utils/interface/api/adminProviderApiInterface';
import { ProviderServiceDetailsComponentProps } from '@/utils/interface/componentInterface/commonComponentInterface';

const ProviderServiceDetails: React.FC<ProviderServiceDetailsComponentProps> = ({
    providerId,
    fetchApiFunction,
    queryKey,
    isUser,
    shimmerRow
}) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchApiFunction(providerId),
        queryKey: [queryKey],
        staleTime: 1 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    if (isError) {
        return (
            <DataFetchingError message={error.message} />
        )
    }

    if (isLoading) {
        return (<ProfileDetailsShimmer row={shimmerRow || 6} className='mt-2' />)
    }

    if (!data) {
        return <DataFetchingError message="No service found." />;
    }

    return (
        <div className="border rounded-md overflow-hidden w-full mt-2 md:mt-0">
            <table className="table-auto w-full">
                <tbody className="w-1/2">
                    <InfoDisplayComponent label="Category" value={data?.service?.serviceName} />
                    <InfoDisplayComponent label="Name" value={data?.serviceName} />
                    <InfoDisplayComponent label="Description" value={data?.serviceDescription} />
                    {data?.isGroupService && (
                        <InfoDisplayComponent label="Group Service" value={data?.isGroupService} isBoolean />
                    )}
                    {data?.maxParticipants && (
                        <InfoDisplayComponent label="Maximum Participants" value={data?.maxParticipants} />
                    )}
                    {data?.requirements && (
                        <InfoDisplayComponent label="Requirements" value={data?.requirements} />
                    )}
                    <InfoDisplayComponent label="Mode" value={data?.serviceMode === serviceModeArray[2] ? "Online & Offline" : data?.serviceMode} />
                    {data?.serviceType && (
                        <InfoDisplayComponent label="Type" value={data?.serviceType} />
                    )}
                    {data?.videoUrl && (
                        <InfoDisplayComponent label="Demo" value={data?.videoUrl} link defaultValue="Watch Demo" />
                    )}
                    {!isUser && (
                        <InfoDisplayComponent label="Service Description" value={(data as AdminFetchProviderServiceResponse | ProviderFetchServiceDetailsResponse)?.tags} />
                    )}
                    <InfoDisplayComponent label="Service Price" value={data?.servicePrice} isPrice={true} />
                    <InfoDisplayComponent label="Service Experience" value={data?.serviceExperience} isLast />
                </tbody>
            </table>
        </div>
    )
}

export default ProviderServiceDetails