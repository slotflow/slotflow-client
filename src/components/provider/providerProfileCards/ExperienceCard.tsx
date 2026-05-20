import React from "react";
import { Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataFetchingError from "@/components/error/DataFetchingError";

interface ExperienceCardProps {
    isLoading?: boolean;
    isError?: boolean;
    data?: {
        experienceYears?: number;
        description?: string;
    };
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
    isLoading,
    isError,
    data,
}) => {
    return (
        <Card className="border shadow-sm rounded-xl">
            <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Experience & About
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {isLoading ? (
                    <>
                        <div className="p-4 rounded-lg bg-muted/30 border border-muted flex items-center gap-3">
                            <div className="w-10/12 shimmer h-8"></div>
                        </div>
                        <div className="w-ful shimmer h-2"></div>
                        <div className="w-ful shimmer h-2"></div>
                    </>
                ) : isError ? (
                    <DataFetchingError message="No experience found" />
                ) : data && (
                    <>
                        <div className="p-4 rounded-lg bg-muted/30 border border-muted flex items-center gap-3">
                            <div className="text-3xl font-extrabold text-primary leading-none">10+</div>
                            <p className="text-sm font-semibold text-foreground">
                                Years of Professional Experience
                            </p>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {data.description}
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export default ExperienceCard;