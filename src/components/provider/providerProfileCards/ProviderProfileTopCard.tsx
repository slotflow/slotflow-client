import React from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Role } from "@/shared/interface/enums";
import { Share2, ShieldCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { getInitials } from "@/shared/helper/getInitials";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { setIsShowPreview } from "@/shared/redux/slices/providerSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProviderProfileTopCardProps {
    isLoading?: boolean;
    isError?: boolean;
    name: string;
    image: string;
    categoryName: string;
    trusted: boolean;
    role: Role;
}

const ProviderProfileTopCard: React.FC<ProviderProfileTopCardProps> = ({
    isLoading,
    isError,
    name,
    image,
    categoryName,
    trusted,
    role,
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const isShowPreview = useSelector((state: RootState) => state.provider.isShowPreview);
    
    return (
        <Card className="overflow-hidden border shadow-sm rounded-xl">
            <div className="h-32 bg-muted/50 relative" />
            <CardContent className="-mt-16 px-6 pb-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-5">
                        <Avatar className="w-28 h-28 border-4 border-background shadow-md">
                            {isLoading ? (
                                <AvatarFallback className="shimmer">
                                </AvatarFallback>
                            ) : isError ? (
                                <AvatarImage src={image || ""} />
                            ) : (
                                <>
                                    <AvatarImage src={image || ""} />
                                    <AvatarFallback className="bg-muted text-primary text-2xl font-bold">{getInitials(name || "")}</AvatarFallback>
                                </>
                            )}
                        </Avatar>
                        <div className="space-y-2 pb-1 flex flex-col items-center md:items-start">
                            <div className="flex flex-col sm:flex-row items-center gap-2">
                                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                    {isLoading ? (
                                        <div className="w-32 h-6 bg-muted rounded shimmer" />
                                    ) : isError ? (
                                        <p className="text-red-500 text-sm font-normal">Name fetching error</p>
                                    ) : (
                                        name
                                    )}
                                </h1>
                                {trusted && (
                                    <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 flex items-center gap-1 rounded-full text-xs font-semibold mt-2">
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        SlotFlow Trusted
                                    </Badge>
                                )}
                            </div>
                            <p className="text-sm font-medium text-muted-foreground">
                                {isLoading ? (
                                        <span className="w-38 h-2 bg-muted rounded shimmer" />
                                    ) : isError ? (
                                        <p className="text-red-500 text-sm font-normal">Category fetching error</p>
                                    ) : (
                                        categoryName
                                    )}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <Button variant="outline" size="sm" className="h-9 gap-1.5">
                            <Share2 className="w-4 h-4" />
                            Share Profile
                        </Button>
                        {role === Role.PROVIDER && (
                            <div className="flex items-center space-x-2 mt-2">
                                <Label htmlFor="airplane-mode">See how your profile looks to customers</Label>
                                <Switch
                                    id="preview-mode"
                                    checked={isShowPreview}
                                    onCheckedChange={() => dispatch(setIsShowPreview())}
                                />
                            </div>
                        )}

                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProviderProfileTopCard;