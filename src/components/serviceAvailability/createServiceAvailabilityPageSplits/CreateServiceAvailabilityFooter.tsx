import React from "react";
import { Button } from "../../ui/button";
import { Check, LoaderCircle } from "lucide-react";
import { CreateServiceAvailabilityFooterProps } from "@/shared/interface/componentInterface";
import { defaultButtonClassName } from "@/shared/utils/constants";

const CreateServiceAvailabilityFooter: React.FC<CreateServiceAvailabilityFooterProps> = ({
    selectedTimeSlots,
    isSubmitting,
    onAddAvailability,
    availabilities,
    isValid,
    isUpdating,
    isLoading,
    isAvailable
}) => {
    return (
        <div className="flex flex-col gap-4">
            {((isAvailable && selectedTimeSlots && selectedTimeSlots.length > 0) || !isAvailable) && (
  <div className="flex justify-center md:justify-end">
    <Button
      title="Add this availability (not saved yet)"
      type="button"
      variant="secondary"
      disabled={isSubmitting}
      onClick={onAddAvailability}
      className={defaultButtonClassName}
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
                        className={defaultButtonClassName}
                    >
                        {isSubmitting ? (
                            <>
                                <LoaderCircle className="animate-spin size-4 mr-2" />
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