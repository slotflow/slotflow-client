import React, { useState } from 'react';
import DataField from '../app/DataField';
import { SelectSeparator } from '../ui/select';
import { useQuery } from '@tanstack/react-query';
import { ServiceMode } from '@/shared/interface/enums';
import DataFetchingError from '../error/DataFetchingError';
import DataFieldShimmer from '../shimmers/DataFieldShimmer';
import { ProviderServiceListProps } from '@/shared/interface/componentInterface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Briefcase, ClipboardList, FileText, Hash, IndianRupee, Layers, LayoutGrid, MonitorSmartphone, Notebook, Tag, UserPlus, Users, Video } from 'lucide-react';
import { Button } from '../ui/button';
import { defaultButtonClassName } from '@/shared/utils/constants';
import { AnimatePresence, motion } from 'framer-motion';
import ProviderServiceForm from '../form/provider/ProviderServiceForm';

const ProviderServiceList: React.FC<ProviderServiceListProps> = ({
    providerId,
    fetchApiFunction,
    queryKey,
    canUpdate = false
}) => {

    const [showForm, setShowForm] = useState<boolean>(false);
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
        return <DataFieldShimmer row={12} />
    }

    return (
        <Card className="border shadow-sm rounded-xl w-full">
            <CardHeader className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <LayoutGrid className="w-5 h-5 text-primary" />
                        Service
                    </CardTitle>
                    <CardDescription>Service details</CardDescription>
                </div>
                {canUpdate && (
                    <Button
                        title="Update Password"
                        variant={showForm ? "destructive" : "default"}
                        className={defaultButtonClassName}
                        onClick={(e) => {
                            e.preventDefault();
                            setShowForm(!showForm);
                        }}
                    >{showForm ? "Cancel" : "Update"}
                    </Button>
                )}
            </CardHeader>
            <SelectSeparator />
            <CardContent className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <DataField label="Category" value={data?.serviceId?.serviceName} Icon={LayoutGrid} />
                    <DataField label="Name" value={data?.serviceName} Icon={Tag} />
                    <DataField label="Description" value={data?.serviceDescription} Icon={FileText} />
                    <DataField label="Group Service" value={data?.isGroupService} isBoolean Icon={Users} />
                    <DataField label="Maximum Participants" value={data?.maxParticipants} Icon={UserPlus} />
                    {data?.requirements?.map((req,i) => (
                        <DataField key={i} label={`Requirement ${i+1}`} value={req} Icon={ClipboardList} />
                    ))}
                    <DataField label="Mode" value={data?.serviceMode === ServiceMode.BOTH ? "Online & Offline" : data?.serviceMode} Icon={MonitorSmartphone} />
                    <DataField label="Type" value={data?.serviceType} Icon={Layers} />
                    <DataField label="Demo Video Url" value={data?.videoUrl} link Icon={Video} />
                    <DataField label="Portfolio Url" value={data?.portfolioUrl} link Icon={Notebook} />
                    <DataField label="Tags" value={data?.tags} tags Icon={Hash} />
                    <DataField label="Price" value={data?.servicePrice} isPrice={true} Icon={IndianRupee} />
                    <DataField label="Experience in Years" value={data?.serviceExperienceYears} Icon={Briefcase} />
                    <DataField label="Experience" value={data?.serviceExperience} Icon={Briefcase} />
                </div>
            </CardContent>
            <AnimatePresence initial={false}>
                {showForm && (
                    <motion.div
                        key="provider-service-form"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                    >
                        <SelectSeparator />
                        <CardContent className="space-y-2 mt-4">
                            <ProviderServiceForm
                                isUpdating={true}
                                heading="Update Service"
                            />
                        </CardContent>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    )
}

export default ProviderServiceList