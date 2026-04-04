import { useCallback } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ServiceMode } from "@/shared/interface/enums";
import { addMinutes, format, isBefore, isEqual } from "date-fns";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { addAvailability } from "@/shared/redux/slices/providerSlice";

interface UseAddAvailabilityInterface {
    getValues: UseFormGetValues<{
        day: string;
        duration: number;
        startTime: Date;
        endTime: Date;
        modes: string[];
        selectedTimeSlots: string[];
        timeSlots: string[];
    }>,
    setValue: UseFormSetValue<{
        selectedTimeSlots: string[];
        day: string;
        duration: number;
        startTime: Date;
        endTime: Date;
        modes: string[];
        timeSlots: string[];
    }>,
}

interface UseAddAvailabilityReturnInterface {
    handleAddAvailability: (e: React.MouseEvent<HTMLButtonElement>) => void;
    generateTimeSlots: (start: Date, end: Date, intervalMinutes: number) => void;
    toggleSlot: (slot: string) => void;
    isModeSelected: (mode: string) => boolean;
    toggleMode: (mode: ServiceMode) => void;
}

export const useAddAvailability = ({
    getValues,
    setValue,
}: UseAddAvailabilityInterface): UseAddAvailabilityReturnInterface => {

    const dispatch = useDispatch();

    const handleAddAvailability = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            const vals = getValues();

            if (!vals.day) {
                toast.warning("Please select a day");
                return;
            }
            if (!vals.duration) {
                toast.warning("Please select a duration");
                return;
            }
            if (!vals.startTime) {
                toast.warning("Please select a startTime");
                return;
            }
            if (!vals.endTime) {
                toast.warning("Please select an endTime");
                return;
            }
            if (!vals.modes || vals.modes.length === 0) {
                toast.warning("Please select a service mode");
                return;
            }
            if (!vals.selectedTimeSlots || vals.selectedTimeSlots.length === 0) {
                toast.warning("Please select time slots");
                return;
            }

            const start = format(vals.startTime, "hh:mm a");
            const end = format(vals.endTime, "hh:mm a");

            const data = {
                day: vals.day,
                duration: vals.duration,
                startTime: start,
                endTime: end,
                modes: vals.modes,
                slots: vals.selectedTimeSlots,
            };

            dispatch(addAvailability(data));
            toast.success(`${vals.day} availability added.`);

            setValue("selectedTimeSlots", [], { shouldDirty: true });
        },
        [dispatch, getValues, setValue]
    );


    const generateTimeSlots = (start: Date, end: Date, intervalMinutes: number): void => {
        if (!start || !end) {
            toast.warning("Please select the startTime and endTime");
            return;
        }

        if (!intervalMinutes || intervalMinutes == 0) {
            toast.warning("Invalid interval");
            return;
        }

        const interval = intervalMinutes;

        const slots: string[] = [];
        let current = new Date(start);

        const maxEntries = Math.floor(24 * 60 / Math.max(interval, 1));
        let count = 0;
        while ((isBefore(current, end) || isEqual(current, end)) && count < maxEntries) {
            const formatted = format(current, "hh:mm a");
            slots.push(formatted);
            current = addMinutes(current, interval);
            count++;
        }

        setValue('timeSlots', slots, { shouldDirty: true, shouldValidate: true });
        setValue('selectedTimeSlots', [], { shouldDirty: true });
        toast.success(`Generated ${slots.length} slots`);
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
