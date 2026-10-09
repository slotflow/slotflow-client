import { Plus } from 'lucide-react';
import { Button } from '../../ui/button';
import { FormButton } from '@/components/form/FormButton';
import { CreateServiceAvailabilityFooterProps } from '@/shared/types/component';

const CreateServiceAvailabilityFooter = ({
  selectedTimeSlots,
  isSubmitting,
  onAddAvailability,
  hasAllDays,
  isValid,
  isUpdating,
  isLoading,
  isAvailable,
}: CreateServiceAvailabilityFooterProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="mt-10">
        <p className="text-sm text-gray-400 italic">
          Note: Please add your daily service available slots by selecting a day. Once you're done,
          only click Submit.
        </p>
      </div>
      {((isAvailable && selectedTimeSlots && selectedTimeSlots.length > 0) || !isAvailable) && (
        <div className="flex justify-center md:justify-end mt-4 md:mt-0">
          <Button
            title="Add this availability (not saved yet)"
            type="button"
            variant="secondary"
            disabled={isSubmitting}
            onClick={onAddAvailability}
            className="w-full md:w-auto"
          >
            <Plus className="size-4" />
            <span>Add Availability</span>
          </Button>
        </div>
      )}

      {hasAllDays && (
        <div className="flex justify-center md:justify-end">
          <FormButton
            loading={isSubmitting}
            text={
              isUpdating && isSubmitting
                ? 'Updating...'
                : isSubmitting
                  ? 'Submitting...'
                  : isUpdating
                    ? 'Update'
                    : 'Submit'
            }
            title={isUpdating ? 'Update' : 'Submit'}
            disabled={!isValid || isSubmitting || isLoading}
            className="w-full md:w-auto"
          />
        </div>
      )}
    </div>
  );
};

export default CreateServiceAvailabilityFooter;
