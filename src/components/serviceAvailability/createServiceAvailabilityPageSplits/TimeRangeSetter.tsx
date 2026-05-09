import React from "react";
import TimeField from "./TimeField";
import { Goal } from "lucide-react";
import { Button } from "../../ui/button";
import { defaultButtonClassName } from "@/shared/utils/constants";
import { TimeRangeSetterProps } from "@/shared/interface/componentInterface";

const TimeRangeSetter: React.FC<TimeRangeSetterProps> = ({ 
    control, 
    isSubmitting, 
    onGenerateSlots 
}) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <TimeField
                    label="Start Time (HH:mm)"
                    name="startTime"
                    control={control}
                />

                <TimeField
                    label="End Time (HH:mm)"
                    name="endTime"
                    control={control}
                />
            </div>

            <div className="flex justify-center md:justify-end mt-4 md:mt-6">
                <Button
                    title="Generate Slots"
                    type="button"
                    variant="secondary"
                    disabled={isSubmitting}
                    onClick={onGenerateSlots}
                    className={defaultButtonClassName}
                >
                    Generate Slots <Goal />
                </Button>
            </div>
        </>
    );
};

export default TimeRangeSetter;