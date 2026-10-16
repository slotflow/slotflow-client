import { Card } from '@/components/ui/card';
import { HearAboutUsOptionValue } from '@/shared/types/enums';
import { hearAboutUsOptions } from '@/shared/utils/constants/boardingConstants';

interface HearAboutUsOptionsProps {
  setSelectedOption: (value: HearAboutUsOptionValue | null) => void;
  selectedOption: string | null;
}

const HearAboutUsOptions = ({ setSelectedOption, selectedOption }: HearAboutUsOptionsProps) => {
  return (
    <div className="w-full space-y-4">
      <div className="text-left">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Select an option
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {hearAboutUsOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedOption === option.value;

          return (
            <Card
              key={option.value}
              onClick={() => setSelectedOption(option.value)}
              className={`group relative overflow-hidden cursor-pointer rounded-xl border p-4 transition-all duration-200 bg-background ${
                isSelected
                  ? 'border-primary ring-1 ring-primary shadow-sm'
                  : 'border-input hover:border-primary/50 hover:bg-accent/50'
              }`}
            >
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`flex items-center justify-center size-9 rounded-lg border transition-colors ${
                      isSelected
                        ? 'bg-primary/10 text-primary border-primary/20'
                        : 'bg-muted/50 text-muted-foreground border-transparent group-hover:text-foreground'
                    }`}
                  >
                    <Icon className="size-4 stroke-[1.75]" />
                  </div>
                  <span
                    className={`text-sm font-medium truncate ${
                      isSelected
                        ? 'text-foreground font-semibold'
                        : 'text-muted-foreground group-hover:text-foreground'
                    }`}
                  >
                    {option.label}
                  </span>
                </div>

                <div
                  className={`size-4 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground/30 group-hover:border-primary/50'
                  }`}
                >
                  {isSelected && <div className="size-1.5 rounded-full bg-background" />}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default HearAboutUsOptions;
