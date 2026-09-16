import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { dateFormats } from '@/shared/utils/constants';
import { DateFilterProps } from '@/shared/types/component';
import { formatDate } from '@/shared/utils/helper/formatter';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const DateFilter = ({
  dateRange,
  setDateRange,
  title = 'Timeframe Analysis',
  description = 'Filtering data by selected date range',
}: DateFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2 p-4 rounded-md border border-border shadow-sm backdrop-blur-sm bg-background/80">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-primary/10 rounded-lg">
          <CalendarIcon className="w-5 h-5 text-primary" />
        </div>

        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="w-full sm:w-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="cursor-pointer w-full sm:w-[280px] justify-start text-left font-normal hover:border-primary hover:bg-muted transition-all duration-200 shadow-sm px-4 h-11 border-border"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />

              {dateRange?.from && dateRange?.to ? (
                <span className="text-foreground">
                  {formatDate(dateRange.from, dateFormats.RANGE_MONTH_DAY)} - {formatDate(dateRange.to, dateFormats.RANGE_FULL)}
                </span>
              ) : (
                <span className="text-muted-foreground">Pick a custom range</span>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-auto p-0 shadow-2xl rounded-xl border-border bg-background"
            align="end"
          >
            <Calendar
              initialFocus
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              required
              numberOfMonths={2}
              className="rounded-xl"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DateFilter;
