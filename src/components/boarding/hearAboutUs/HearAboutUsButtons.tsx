import { Button } from "@/components/ui/button";
import { ChevronLeft, LoaderCircle } from "lucide-react";
import { defaultButtonClassName } from "@/shared/utils/constants";

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
                variant="secondary"
                className={defaultButtonClassName}
                onClick={onPrevious}
                disabled={isSubmitting}
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
            </Button>

            <Button
                variant="default"
                className={defaultButtonClassName}
                onClick={onSubmit}
                disabled={disabled}
            >
                {isSubmitting ? (
                    <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Submitting
                    </>
                ) : (
                    "Submit"
                )}
            </Button>
        </div>
    );
};

export default HearAboutUsButtons;