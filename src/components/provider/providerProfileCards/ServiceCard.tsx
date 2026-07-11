import { useSelector } from "react-redux";
import NoData from "@/components/common/NoData";
import DataField from "@/components/app/DataField";
import { RootState } from "@/shared/redux/appStore";
import { ServiceMode } from "@/shared/interface/enums";
import DataFetchingError from "@/components/error/DataFetchingError";
import DataFieldShimmer from "@/components/shimmers/DataFieldShimmer";
import { ServiceCardProps } from "@/shared/interface/componentInterface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Hash, Layers, MonitorSmartphone, UserPlus, Users } from "lucide-react";

const ServiceCard = ({
    isLoading,
    isError,
    data,
    isUserLookingProvider=false,
}: ServiceCardProps) => {

    const isShowPreview = useSelector((state: RootState) => state.provider.isShowPreview);

    return (
        <Card>
            <CardHeader className="border-b pb-4 flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Service Details
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <DataFieldShimmer row={5} />
                ) : isError || !data ? (
                    <DataFetchingError message="No service data found" />
                ) : !data ? (
                    <NoData message="No service data available" />
                ) : (
                    <>
                        <div className="space-y-3">
                            <h3 className="text-xl font-bold text-foreground">
                                {data?.serviceName}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {data?.serviceDescription}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <DataField label="Group Service" value={data?.isGroupService} isBoolean Icon={Users} />
                            <DataField label="Maximum Participants" value={data?.maxParticipants} Icon={UserPlus} />
                            <DataField label={data?.serviceMode === ServiceMode.BOTH ? "Modes" : "Mode"} value={data?.serviceMode === ServiceMode.BOTH ? "Online & Offline" : data?.serviceMode} Icon={MonitorSmartphone} />
                            {!isShowPreview && !isUserLookingProvider && (
                                <>
                                    <DataField label="Type" value={data?.serviceType} Icon={Layers} />
                                    <DataField label="Tags" value={data?.tags} tags Icon={Hash} />
                                </>
                            )}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default ServiceCard;