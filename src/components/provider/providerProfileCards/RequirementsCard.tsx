import React from "react";
import NoData from "@/components/common/NoData";
import { Info, CheckCircle } from "lucide-react";
import DataFetchingError from "@/components/error/DataFetchingError";
import DataFieldShimmer from "@/components/shimmers/DataFieldShimmer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RequirementsCardProps {
    isLoading?: boolean;
    isError?: boolean;
    data?: string;
}

const RequirementsCard: React.FC<RequirementsCardProps> = ({
    isLoading,
    isError,
    data
}) => {
    return (
        <Card className="border shadow-sm rounded-xl">
            <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    Requirements for Booking
                </CardTitle>
                <CardDescription>To ensure a productive meeting, customers must prepare</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <DataFieldShimmer row={1} />
                ) : isError || !data ? (
                    <DataFetchingError message="No requirements found" />
                ) : !data ? (
                    <NoData message="No requirements available" />
                ) : (
                    <div className="p-4 border rounded-lg bg-muted/20 space-y-3">
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                {data}
                            </li>
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default RequirementsCard;