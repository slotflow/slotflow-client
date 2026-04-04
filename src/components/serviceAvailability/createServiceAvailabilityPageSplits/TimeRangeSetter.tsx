import React from "react";
import { Goal } from "lucide-react";
import { Button } from "../../ui/button";
import { TimePicker } from "../../ui/TimePicker";
import { Control, Controller } from "react-hook-form";
import { ProviderServiceAvailabilityFormType } from "@/shared/zod/providerZod";

interface TimeRangeSetterProps {
    control: Control<ProviderServiceAvailabilityFormType>;
    isSubmitting: boolean;
    onGenerateSlots: () => void;
}

const TimeRangeSetter: React.FC<TimeRangeSetterProps> = ({ control, isSubmitting, onGenerateSlots }) => {
    return (
        <React.Fragment>
            <div className="md:flex items-end space-x-4 space-y-4 md:space-y-0 justify-between px-6 pt-6 md:px-6">
                <div className="md:w-6/12">
                    <label className="block text-sm font-medium">Start Time (HH:mm){<span className="text-red-500"> *</span>}</label>
                    <div className='mt-2'>
                        <Controller
                            name="startTime"
                            control={control}
                            render={({ field }) => (
                                <TimePicker
                                    value={field.value}
                                    onChange={(newTime: Date) => field.onChange(newTime)}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="md:w-6/12">
                    <label className="block text-sm font-medium">End Time (HH:mm){<span className="text-red-500"> *</span>}</label>
                    <div className='mt-2'>
                        <Controller
                            name="endTime"
                            control={control}
                            render={({ field }) => (
                                <TimePicker
                                    value={field.value}
                                    onChange={(newTime: Date) => field.onChange(newTime)}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-center md:justify-end mt-4 md:mt-6">
                <Button
                    title="Generate Slots"
                    type="button"
                    variant="default"
                    disabled={isSubmitting}
                    onClick={onGenerateSlots}
                    className="w-10/12 md:w-auto cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)] flex items-center gap-2"
                >
                    Generate Slots <Goal />
                </Button>
            </div>
        </React.Fragment>
    );
};

export default TimeRangeSetter;