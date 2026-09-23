import { Role } from '@/shared/types/enums';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/shared/utils/helper/formatDate';
import { TimeSlotLegendProps } from '@/shared/types/component';

const TimeSlotLegend = ({
  role,
  showAdvanceNotice = false,
  date,
  legendItems,
}: TimeSlotLegendProps) => {
  return (
    <div className="space-y-2">
      <span className="my-4 text-xs font-medium text-slate-500 dark:text-slate-400 block">
        Slots Indicators
      </span>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {legendItems.map((item) => (
          <Button
            key={item.label}
            title={item.label}
            size='lg'
            variant="outline"
            className={`xs:text-xs text-sm font-semibold border-2 rounded-md py-3 px-4 cursor-default ${item.className}`}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <span className="my-4 text-xs font-medium text-slate-500 dark:text-slate-400 block">
        Available Time Slots {date && ` - ${formatDate(date)}`}
      </span>
      {role === Role.USER && showAdvanceNotice && (
        <p className="text-sm text-muted-foreground">
          Please ensure that you book the slot at least 2 hours in advance.
        </p>
      )}
    </div>
  );
};

export default TimeSlotLegend;
