import { useCallback } from "react";
import { ServiceMode } from "@/shared/interface/enums";
import { addMinutes, format, isBefore, isEqual } from "date-fns";
import { UseAddAvailabilityParams, UseAddAvailabilityReturn } from "@/shared/interface/hooksInterface";

export const useAddAvailability = ({
    getValues,
    setValue,
}: UseAddAvailabilityParams): UseAddAvailabilityReturn => {

    const handleAddAvailability = useCallback(() => {

            const vals = getValues();

            if (!vals.day) return { success: false, message: "Please select a day" };
            if(vals.isAvailable) {
                if (!vals.duration) return { success: false, message: "Please select a duration" };
                if (!vals.startTime) return { success: false, message: "Please select a startTime" };
                if (!vals.endTime) return { success: false, message: "Please select an endTime" };
                if (!vals.modes || vals.modes.length === 0) return { success: false, message: "Please select a service mode" };
                if (!vals.selectedTimeSlots || vals.selectedTimeSlots.length === 0) return { success: false, message: "Please select time slots" };
            }

            if (vals.isAvailable) {
                if (!vals.startTime || !vals.endTime) {
                    return {
                        success: false,
                        message: "Start time and end time are required when the day is marked as available",
                    };
                }
            }

            let start: string | undefined;
            let end: string | undefined;
            if (vals.startTime) {
                start = format(vals.startTime, "hh:mm a");
            }
            if (vals.endTime) {
                end = format(vals.endTime, "hh:mm a");
            }

            const data = {
                day: vals.day,
                isAvailable: vals.isAvailable,
                duration: vals.duration,
                startTime: start,
                endTime: end,
                modes: vals.modes,
                slots: vals.selectedTimeSlots,
            };

            setValue("selectedTimeSlots", [], { shouldDirty: true });

            return { success: true, message: `${vals.day} availability added.`, data: data };
        },
        [getValues, setValue]
    );


    const generateTimeSlots = (start: Date, end: Date, intervalMinutes: number) => {

        if (!start || !end) return { success: false, message: "Please select the startTime and endTime" };
        if(start >= end) return { success: false, message: "Start time must be before end time" };
        if (!intervalMinutes || intervalMinutes == 0) return { success: false, message: "Invalid interval" };

        const slots: string[] = [];
        let current = new Date(start);

        const maxEntries = Math.floor(24 * 60 / Math.max(intervalMinutes, 1));
        let count = 0;
        while ((isBefore(current, end) || isEqual(current, end)) && count < maxEntries) {
            const formatted = format(current, "hh:mm a");
            slots.push(formatted);
            current = addMinutes(current, intervalMinutes);
            count++;
        }

        setValue('timeSlots', slots, { shouldDirty: true, shouldValidate: true });
        setValue('selectedTimeSlots', [], { shouldDirty: true });
        return { success: true, message: `Generated ${slots.length} slots` };
    };

    const toggleSlot = (slot: string) => {
        const current = getValues('selectedTimeSlots') || [];
        if (current.includes(slot)) {
            setValue('selectedTimeSlots', current.filter(s => s !== slot), { shouldDirty: true });
        } else {
            setValue('selectedTimeSlots', [...current, slot], { shouldDirty: true });
        }
    };

    const isModeSelected = (mode: string) => {
        const current = getValues('modes') || [];
        return current.includes(mode);
    };

    const toggleMode = (mode: ServiceMode) => {
        const current = getValues('modes') || [];
        if (current.includes(mode)) {
            setValue('modes', current.filter(m => m !== mode), { shouldDirty: true });
        } else {
            setValue('modes', [...current, mode], { shouldDirty: true });
        }
    };

    return {
        handleAddAvailability,
        generateTimeSlots,
        toggleSlot,
        isModeSelected,
        toggleMode,
    };
};
