import { TimePicker } from "@/components/ui/TimePicker";
import { Controller } from "react-hook-form";

interface TimeFieldProps {
    label: string;
    name: "startTime" | "endTime";
    control: any;
}

const TimeField: React.FC<TimeFieldProps> = ({ label, name, control }) => {
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
                            value={field.value}
                            onChange={(newTime: Date) => field.onChange(newTime)}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default TimeField;