import { Check } from 'lucide-react';
import { Button } from '../../ui/button';
import { FormButton } from '@/components/form/FormButton';
import { actionBtnClass } from '@/shared/utils/constants';
import { CreateServiceAvailabilityFooterProps } from '@/shared/types/component';

const CreateServiceAvailabilityFooter = ({
  selectedTimeSlots,
  isSubmitting,
  onAddAvailability,
  availabilities,
  isValid,
  isUpdating,
  isLoading,
  isAvailable,
}: CreateServiceAvailabilityFooterProps) => {

  const showSubmit = availabilities?.length === 7;

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
            className={actionBtnClass}
          >
            <Check />
            Add Availability 
          </Button>
        </div>
      )}
      {showSubmit && (
        <div className="flex justify-center md:justify-end">
          <FormButton
            loading={isSubmitting}
            text={isUpdating && isSubmitting
              ? 'Updating...'
              : isSubmitting
                ? 'Submitting...'
                : isUpdating
                  ? 'Update'
                  : 'Submit'}
            title={isUpdating ? 'Update' : 'Submit'}
            disabled={!isValid || isSubmitting || isLoading}
          />
        </div>
      )}
      <div className="mt-10">
        <p className="text-sm text-gray-400 italic">
          Note: Please add your daily service available slots by selecting a day, Once you're done,
          only click Submit
        </p>
      </div>
    </div>
  );
};

export default CreateServiceAvailabilityFooter;
