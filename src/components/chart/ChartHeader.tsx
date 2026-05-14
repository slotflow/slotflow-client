import {
    CardTitle,
    CardHeader,
    CardDescription,
} from "@/components/ui/card";
import * as React from "react";
import DateSelect from "./DateSelect";
import { ChartHeaderProps } from "@/shared/interface/componentInterface";

const ChartHeader: React.FC<ChartHeaderProps> = ({
    title = "Title",
    description = "Description",
    onValueChange,
    value,
    showDatePicker
}) => {

    return (
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row h-auto">
            <div className="grid flex-1 gap-1">
                <CardTitle>{title}</CardTitle>
                {description && (
                    <CardDescription>
                        {description}
                    </CardDescription>
                )}
            </div>
            {value && onValueChange && showDatePicker && (
                <DateSelect value={value} onValueChange={onValueChange} />
            )}
        </CardHeader>
    )
}

export default ChartHeader