import React from "react";
import TimeField from "./TimeField";
import { Goal } from "lucide-react";
import { Button } from "../../ui/button";
import { Control } from "react-hook-form";
import { ProviderServiceAvailabilityFormType } from "@/shared/zod/providerZod";

interface TimeRangeSetterProps {
    control: Control<ProviderServiceAvailabilityFormType>;
    isSubmitting: boolean;
    onGenerateSlots: () => void;
}

const TimeRangeSetter: React.FC<TimeRangeSetterProps> = ({ control, isSubmitting, onGenerateSlots }) => {
    return (
        <React.Fragment>
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
                    variant="default"
                    disabled={isSubmitting}
                    onClick={onGenerateSlots}
                    className="w-full md:w-auto cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)] flex items-center gap-2"
                >
                    Generate Slots <Goal />
                </Button>
            </div>
        </React.Fragment>
    );
};

export default TimeRangeSetter;