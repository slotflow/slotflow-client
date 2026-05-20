import React from "react";
import IconText from "@/components/app/IconText";
import DataField from "@/components/app/DataField";
import { FileText, ChevronRight } from "lucide-react";
import DataFetchingError from "@/components/error/DataFetchingError";
import DataFieldShimmer from "@/components/shimmers/DataFieldShimmer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AttachmentCardProps {
    isLoading?: boolean;
    isError?: boolean;
    data?: {
        demoVideoUrl?: string;
        portfolioUrl?: string;
    }
}

const AttachmentCard: React.FC<AttachmentCardProps> = ({
    isLoading,
    isError,
    data
}) => {
    return (
        <Card className="border shadow-sm rounded-xl">
            <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Attachments & Portfolio
                </CardTitle>
                <CardDescription>Resources, guidelines, and direct project showcase links</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <DataFieldShimmer row={2} />
                ) : isError ? (
                    <DataFetchingError message="Attachments fetching error" />
                ) : (!data || (!data.demoVideoUrl && !data.portfolioUrl)) ? (
                    <IconText text="No Data Found" className="text-red-500" />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {data.portfolioUrl && (
                            <DataField label="Portfolio Link" value={data.portfolioUrl} Icon={ChevronRight} link />
                        )}

                        {data.demoVideoUrl && (
                            <DataField label="Demo video Link" value={data.demoVideoUrl} Icon={ChevronRight} link />
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default AttachmentCard;