import { Controller } from "react-hook-form";
import { TimePicker } from "@/components/ui/TimePicker";
import { TimeFieldProps } from "@/shared/interface/componentInterface";

const TimeField= ({ 
    label, 
    name, 
    control 
}: TimeFieldProps) => {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium">
                {label}
                <span className="text-red-500"> *</span>
            </label>

            <div className="mt-2">
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <TimePicker
                            value={field.value as Date}
                            onChange={(newTime: Date) => field.onChange(newTime)}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default TimeField;