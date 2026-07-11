import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { destructiveButtonClassName } from "@/shared/utils/constants";
import { SavedAvailabilitiesProps } from "@/shared/interface/componentInterface";

const   SavedAvailabilities = ({
    availabilities,
    removeAvailability
}: SavedAvailabilitiesProps) => {

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
                        {availability.isAvailable ? (
                            <li className="flex-1 p-2 border border-gray-300 rounded-md text-sm truncate">
                                {availability.day} - {availability.startTime} to {availability.endTime}
                            </li>
                        ) : (
                            <li className="flex-1 p-2 border border-gray-300 rounded-md text-sm truncate">
                                {availability.day} - Not Available
                            </li>
                        )}
                        <Button
                            title="Delete availability"
                            variant="destructive"
                            className={destructiveButtonClassName}
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