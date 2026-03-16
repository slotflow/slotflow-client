import React from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {

  const [isOpen, setIsOpen] = React.useState(false);
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    inputValue: string
  ) => {
    const newDate = new Date(value);

    if (type === "hour") {
      const hour = parseInt(inputValue);
      const isPM = newDate.getHours() >= 12;
      newDate.setHours((hour % 12) + (isPM ? 12 : 0));
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(inputValue));
    } else if (type === "ampm") {
      const currentHours = newDate.getHours();
      const isPM = inputValue === "PM";
      if (isPM && currentHours < 12) {
        newDate.setHours(currentHours + 12);
      } else if (!isPM && currentHours >= 12) {
        newDate.setHours(currentHours - 12);
      }
    }

    onChange(newDate);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          title="Date"
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value ? format(value, "hh:mm aa") : <span>hh:mm aa</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
          {/* Hour Picker */}
          <ScrollArea className="w-64 sm:w-auto">
            <div className="flex sm:flex-col p-2">
              {hours.map((hour) => (
                <Button
                  title="Date"
                  key={hour}
                  size="icon"
                  variant={
                    value.getHours() % 12 === hour % 12 ? "default" : "ghost"
                  }
                  className="sm:w-full shrink-0 aspect-square"
                  onClick={() => handleTimeChange("hour", hour.toString())}
                >
                  {hour}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="sm:hidden" />
          </ScrollArea>

          {/* Minute Picker */}
          <ScrollArea className="w-64 sm:w-auto">
            <div className="flex sm:flex-col p-2">
              {minutes.map((minute) => (
                <Button
                  title="Date"
                  key={minute}
                  size="icon"
                  variant={
                    value.getMinutes() === minute ? "default" : "ghost"
                  }
                  className="sm:w-full shrink-0 aspect-square"
                  onClick={() => handleTimeChange("minute", minute.toString())}
                >
                  {minute.toString().padStart(2, "0")}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="sm:hidden" />
          </ScrollArea>

          {/* AM/PM Picker */}
          <ScrollArea>
            <div className="flex sm:flex-col p-2">
              {["AM", "PM"].map((ampm) => (
                <Button
                  title="Date"
                  key={ampm}
                  size="icon"
                  variant={
                    (ampm === "AM" && value.getHours() < 12) ||
                    (ampm === "PM" && value.getHours() >= 12)
                      ? "default"
                      : "ghost"
                  }
                  className="sm:w-full shrink-0 aspect-square"
                  onClick={() => handleTimeChange("ampm", ampm)}
                >
                  {ampm}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};
