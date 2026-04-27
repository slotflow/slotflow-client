import React from 'react';
import {
    Select,
    SelectItem,
    SelectValue,
    SelectContent,
    SelectTrigger,
} from "@/components/ui/select";
import { dateSelectList } from '@/shared/utils/constants';
import { DateSelectProps } from '@/shared/interface/componentInterface';

const DateSelect: React.FC<DateSelectProps> = ({
    onValueChange,
    value
}) => {

    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger
                className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                aria-label="Select a value"
            >
                <SelectValue placeholder="Last 7 days" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
                {dateSelectList.map((item, index) => (
                    <SelectItem key={index} value={item.value} className="rounded-lg">
                        {item.content}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default DateSelect