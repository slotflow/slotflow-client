import { Button } from '@/components/ui/button';
import { Check, ChevronLeft, LoaderCircle } from 'lucide-react';
import { HearAboutUsButtonsProps } from '@/shared/types/component';

const HearAboutUsButtons = ({
  isSubmitting,
  disabled,
  onPrevious,
  onSubmit,
}: HearAboutUsButtonsProps) => {
  return (
    <div className="mt-8 flex w-full justify-end gap-3">
      <Button
        variant="secondary"
        onClick={onPrevious}
        disabled={isSubmitting}
        className="flex-1 sm:flex-none sm:w-auto"
      >
        <ChevronLeft className="size-4" />
        Previous
      </Button>

      <Button
        variant="default"
        onClick={onSubmit}
        disabled={disabled}
        className="flex-1 sm:flex-none sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            Submitting
          </>
        ) : (
          <>
            <Check className="size-4" />
            Submit
          </>
        )}
      </Button>
    </div>
  );
};

export default HearAboutUsButtons;
