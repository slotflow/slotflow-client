import { cn } from '@/lib/utils';
import DateSelect from './DateSelect';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChartHeaderProps } from '@/shared/types/component';
import { CardTitle, CardHeader, CardDescription } from '@/components/ui/card';

const ChartHeader = ({
  title,
  onValueChange,
  value,
  showDatePicker,
  onReload,
  isLoading,
  description,
}: ChartHeaderProps) => {
  return (
    <CardHeader className="px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b h-auto w-full">
        <div className="flex flex-col items-start gap-1">
          <CardTitle className="text-sm font-semibold tracking-tight text-slate-800 dark:text-slate-200 uppercase">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>

      {(showDatePicker || onReload) && (
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {value && onValueChange && showDatePicker && (
            <DateSelect value={value} onValueChange={onValueChange} />
          )}
          {onReload && (
            <Button
              variant="secondary"
              onClick={onReload}
              disabled={isLoading}
              className="cursor-pointer text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <RefreshCw className={cn('size-4', isLoading && 'animate-spin')} />
              Refetch
            </Button>
          )}
        </div>
      )}
    </CardHeader>
  );
};

export default ChartHeader;
