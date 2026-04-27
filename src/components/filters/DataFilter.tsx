import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DataFilterProps } from "@/shared/interface/componentInterface";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const DataFilter: React.FC<DataFilterProps> = ({
  dateRange,
  setDateRange,
  title = "Timeframe Analysis",
  description = "Filtering data by selected date range",
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-4 bg-white/50 dark:bg-slate-950/50 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
          <CalendarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>

      <div className="w-full sm:w-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-[280px] justify-start text-left font-normal hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all duration-200 shadow-sm px-4 h-11 border-slate-300 dark:border-slate-700"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
              {dateRange?.from && dateRange?.to ? (
                <span className="text-slate-700 dark:text-slate-300">
                  {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd, y")}
                </span>
              ) : (
                <span className="text-slate-500">Pick a custom range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 shadow-2xl rounded-xl border-slate-200 dark:border-slate-800" align="end">
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

export default DataFilter;
