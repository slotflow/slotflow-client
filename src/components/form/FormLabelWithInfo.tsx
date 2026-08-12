import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface FormLabelWithInfoProps {
  htmlFor?: string;
  label: string;
  infoText?: string;
}

const FormLabelWithInfo = ({ htmlFor, label, infoText }: FormLabelWithInfoProps) => {
  return (
    <div className="flex items-center gap-1.5">
      <Label htmlFor={htmlFor} className="text-sm">
        {label}
      </Label>

      {infoText && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`Information about ${label}`}
              >
                <Info className="size-3" />
              </button>
            </TooltipTrigger>

            <TooltipContent side="right" className="max-w-xs text-sm leading-relaxed">
              {infoText}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default FormLabelWithInfo;
