import React from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Availability } from "@/shared/interface/entityInterface/serviceAvailabilityInterface";

interface SavedAvailabilitiesProps {
    availabilities: Availability[] | null;
    removeAvailability: (day: string) => void;
}

const SavedAvailabilities: React.FC<SavedAvailabilitiesProps> = ({
    availabilities,
    removeAvailability
}) => {

    if (!availabilities || availabilities.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4 mt-10">
            <label className="block text-sm font-medium">
                Saved Availabilities
            </label>
            <ul className="space-y-1">
                {availabilities.map((availability) => (
                    <div className="flex items-center justify-between gap-2 w-full md:w-1/2" key={availability.day}>
                        <li className="flex-1 p-2 border border-gray-300 rounded-md text-sm truncate">
                            {availability.day} - {availability.startTime} to {availability.endTime}
                        </li>
                        <Button
                            title="Delete availability"
                            variant="default"
                            className="shrink-0 cursor-pointer hover:bg-red-100 border-red-300 hover:text-red-700"
                            onClick={() => removeAvailability(availability.day)}
                        >
                            <Trash className="size-4" />
                        </Button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default SavedAvailabilities;