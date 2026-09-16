import { Button } from '@/components/ui/button';
import { ChevronLeft, LoaderCircle } from 'lucide-react';
import { defaultBtnClass } from '@/shared/utils/constants';

interface HearAboutUsButtonsProps {
  isSubmitting: boolean;
  disabled: boolean;
  onPrevious: () => void;
  onSubmit: () => void;
}

const HearAboutUsButtons = ({
  isSubmitting,
  disabled,
  onPrevious,
  onSubmit,
}: HearAboutUsButtonsProps) => {
  return (
    <div className="mt-8 flex justify-end gap-2">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isSubmitting}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>

      <Button
        variant="default"
        className={defaultBtnClass}
        onClick={onSubmit}
        disabled={disabled}
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Submitting
          </>
        ) : (
          'Submit'
        )}
      </Button>
    </div>
  );
};

export default HearAboutUsButtons;
