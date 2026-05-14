import React from "react";
import { Badge } from "../ui/badge";
import { Loader2, Info, LucideIcon, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CreditCardPorps {
    title: string;
    isLoading: boolean;
    isError: boolean;
    error: any;
    data: number | boolean | React.ReactNode;
    Icon: LucideIcon
    bgColour?: string;
    main?: boolean;
}

const CreditCard: React.FC<CreditCardPorps> = ({
    title,
    isLoading,
    isError,
    error,
    data,
    Icon,
    bgColour,
    main
}) => {
    return (
        <Card className={`${bgColour ? bgColour : ""} ${bgColour ? "text-white" : ""}`}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <span className="bg-black/60 rounded-sm p-2">
                    <Icon className="w-5 h-5 text-white" />
                    </span>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-md ml-2">
                            Loading...
                        </span>
                    </div>
                ) : isError && error ? (
                    <div className="flex items-center gap-2">
                        <Info className="w-5 h-5" />
                        <span className="text-md ml-2">
                            Failed to fetch data
                        </span>
                    </div>
                ) : (
                    <>
                        {typeof data === "number" && (
                            <>
                                <span className={`text-2xl md:text-4xl ${main ? "font-bold" : "font-semibold"}`}>
                                    {data}
                                </span>
                                <span className={`text-md ${main ? "text-slate-200" : "" } ml-2`}>
                                    Credits
                                </span>
                            </>
                        )}
                        {typeof data === "boolean" && (
                            <>
                                <Badge
                                    variant="outline"
                                    className={`px-2 py-1 flex items-center gap-1.5 rounded-full font-medium ${data
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                                        : "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
                                        }`}
                                >
                                    {data ? (
                                        <>
                                            <CheckCircle2 className="w-3.5 h-3.5" /> Active
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="w-3.5 h-3.5" /> Inactive
                                        </>
                                    )}
                                </Badge>
                            </>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export default CreditCard;