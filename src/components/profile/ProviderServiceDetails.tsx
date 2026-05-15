import React from 'react';
import DetailField from '../app/DetailField';
import { Card, CardContent } from '../ui/card';
import { useQuery } from '@tanstack/react-query';
import { ServiceMode } from '@/shared/interface/enums';
import DataFetchingError from '../error/DataFetchingError';
import DataFieldShimmer from '../shimmers/DataFieldShimmer';
import { ProviderServiceDetailsProps } from '@/shared/interface/componentInterface';
import { Briefcase, ClipboardList, FileText, Hash, IndianRupee, Layers, LayoutGrid, MonitorSmartphone, Tag, UserPlus, Users, Video } from 'lucide-react';

const ProviderServiceDetails: React.FC<ProviderServiceDetailsProps> = ({
    providerId,
    fetchApiFunction,
    queryKey,
    isUser,
    shimmerRow
}) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: async () => {
            const res = await fetchApiFunction(providerId);
            return res.data;
        },
        queryKey: [queryKey, providerId],
        staleTime: 1 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    if (isError) {
        return (
            <DataFetchingError message={error.message} />
        )
    };

    if (isLoading) {
        return (<DataFieldShimmer row={shimmerRow || 6} />)
    };

    return (
        <div className="overflow-hidden w-full mt-2 md:mt-0">
            <Card>
                <CardContent className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <DetailField label="Category" value={data?.serviceId?.serviceName} Icon={LayoutGrid} />
                        <DetailField label="Name" value={data?.serviceName} Icon={Tag} />
                        <DetailField label="Description" value={data?.serviceDescription} Icon={FileText} />
                        {data?.isGroupService && (
                            <DetailField label="Group Service" value={data?.isGroupService} isBoolean Icon={Users} />
                        )}
                        {data?.maxParticipants && (
                            <DetailField label="Maximum Participants" value={data?.maxParticipants} Icon={UserPlus} />
                        )}
                        {data?.requirements && (
                            <DetailField label="Requirements" value={data?.requirements} Icon={ClipboardList} />
                        )}
                        <DetailField label="Mode" value={data?.serviceMode === ServiceMode.BOTH ? "Online & Offline" : data?.serviceMode} Icon={MonitorSmartphone} />
                        {data?.serviceType && (
                            <DetailField label="Type" value={data?.serviceType} Icon={Layers} />
                        )}
                        {data?.videoUrl && (
                            <DetailField label="Demo" value={data?.videoUrl} link defaultValue="Watch Demo" Icon={Video} />
                        )}
                        {!isUser && (
                            <DetailField label="Tags" value={data?.tags} tags Icon={Hash} />
                        )}
                        <DetailField label="Price" value={data?.servicePrice} isPrice={true} Icon={IndianRupee} />
                        <DetailField label="Experience" value={data?.serviceExperience} Icon={Briefcase} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProviderServiceDetails