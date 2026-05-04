import React from "react";
import { Button } from "../../ui/button";
import { Check, Loader } from "lucide-react";
import { CreateServiceAvailabilityFooterProps } from "@/shared/interface/componentInterface";

const CreateServiceAvailabilityFooter: React.FC<CreateServiceAvailabilityFooterProps> = ({
    selectedTimeSlots,
    isSubmitting,
    onAddAvailability,
    availabilities,
    isValid,
    isUpdating,
    isLoading
}) => {
    return (
        <div className="flex flex-col gap-4">
            {selectedTimeSlots && selectedTimeSlots.length > 0 && (
                <div className="flex justify-center md:justify-end">
                    <Button
                        title="Add this availability (not saved yet)"
                        type="button"
                        variant="default"
                        disabled={isSubmitting}
                        onClick={onAddAvailability}
                        className="cursor-pointer w-full md:w-auto hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)] flex items-center gap-2"
                    >
                        Add Availability <Check />
                    </Button>
                </div>
            )}
            {availabilities && (
                <div className="flex justify-center md:justify-end">
                    <Button
                        title={"Submit"}
                        type="submit"
                        variant="default"
                        disabled={isSubmitting || !isValid || isLoading}
                        className="cursor-pointer w-full md:w-auto hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)] flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader className="animate-spin size-4 mr-2" />
                                {(isUpdating && isSubmitting) ? "Updating" : "Submitting"}
                            </>
                        ) : (
                            isUpdating ? "Update" : "Submit"
                        )}
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