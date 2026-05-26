import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getInitials } from "@/shared/helper/getInitials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfileTopCardProps {
    name: string;
    image: string;
}

const UserProfileTopCard: React.FC<UserProfileTopCardProps> = ({
    name,
    image,
}) => {

    return (
        <Card className="overflow-hidden border shadow-sm rounded-xl">
            <div className="h-32 bg-muted/50 relative" />
            <CardContent className="-mt-16 px-6 pb-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center md:items-cneter gap-5">
                        <Avatar className="w-28 h-28 border-4 border-background shadow-md">
                            <AvatarImage src={image || ""} />
                            <AvatarFallback className="bg-muted text-primary text-2xl font-bold">{getInitials(name || "")}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2 pb-1 flex flex-col items-center md:items-start">
                            <div className="flex flex-col sm:flex-row items-center gap-2">
                                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                    {name}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default UserProfileTopCard;