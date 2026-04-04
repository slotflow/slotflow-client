import React from "react";
import { Role } from "@/shared/interface/enums";
import { Button } from "@/components/ui/button";

export interface SlotLegendItem {
  label: string;
  description?: string;
  className: string;
}

interface TimeSlotLegendProps {
  role?: Role;
  showAdvanceNotice?: boolean;
  heading?: string;
  legendItems: SlotLegendItem[];
}

const TimeSlotLegend: React.FC<TimeSlotLegendProps> = ({
  role,
  showAdvanceNotice = false,
  heading = "Available Time Slots for the Selected Date",
  legendItems,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex space-x-3 flex-wrap">
        {legendItems.map((item) => (
          <div key={item.label} className="flex flex-col space-y-1">
            <Button
              title={item.label}
              variant="outline"
              className={`text-sm font-semibold border-2 rounded-md py-3 px-4 cursor-default ${item.className}`}
            >
              {item.label}
            </Button>
          </div>
        ))}
      </div>
      <h3 className="font-bold text-lg">{heading}</h3>
      {role === Role.USER && showAdvanceNotice && (
        <p className="text-sm text-muted-foreground">
          Please ensure that you book the slot at least 2 hours in advance.
        </p>
      )}
    </div>
  );
};

export default TimeSlotLegend;
