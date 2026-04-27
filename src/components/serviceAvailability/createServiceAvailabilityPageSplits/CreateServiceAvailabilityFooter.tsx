import React from "react";
import { Button } from "../../ui/button";
import { Check, ChevronRight } from "lucide-react";
import { CreateServiceAvailabilityFooterProps } from "@/shared/interface/componentInterface";

const CreateServiceAvailabilityFooter: React.FC<CreateServiceAvailabilityFooterProps> = ({
    selectedTimeSlots,
    isSubmitting,
    onAddAvailability,
    availabilities,
    isValid,
    isUpdating
}) => {
    return (
        <div className="flex flex-col gap-4">
            {selectedTimeSlots && selectedTimeSlots.length > 0 && (
                <div className="flex justify-center md:justify-end">
                    <Button
                        title="Confirm"
                        type="button"
                        variant="default"
                        disabled={isSubmitting}
                        onClick={onAddAvailability}
                        className="cursor-pointer w-full md:w-auto hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)] flex items-center gap-2"
                    >
                        Confirm <Check />
                    </Button>
                </div>
            )}
            {availabilities && (
                <div className="flex justify-center md:justify-end">
                    <Button
                        title={"Submit"}
                        type="submit"
                        variant="default"
                        disabled={isSubmitting || !isValid}
                        className="cursor-pointer w-full md:w-auto hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)] flex items-center gap-2"
                    >
                        {isSubmitting ? "Loading" : isUpdating ? "Update" : "Submit"} <ChevronRight />
                    </Button>
                </div>
            )}
            <div className='mt-10'>
                <p className='text-sm text-gray-400 italic'>Note: Please add your daily service available slots by selecting a day, Once you're done, only click Submit</p>
            </div>
        </div>
    );
};

export default CreateServiceAvailabilityFooter;