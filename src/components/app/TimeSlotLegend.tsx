import React from "react";
import { Role } from "@/shared/interface/enums";
import { Button } from "@/components/ui/button";
import { formateDate } from "@/shared/helper/formatter";
import { TimeSlotLegendProps } from "@/shared/interface/componentInterface";

const TimeSlotLegend: React.FC<TimeSlotLegendProps> = ({
  role,
  showAdvanceNotice = false,
  date,
  legendItems,
}) => {
  return (
    <div className="space-y-2">
      <h3 className="font-bold text-lg">Slots Indicators </h3>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {legendItems.map((item) => (
            <Button
              key={item.label}
              title={item.label}
              variant="outline"
              className={`xs:text-xs text-sm font-semibold border-2 rounded-md py-3 px-4 cursor-default ${item.className}`}
            >
              {item.label}
            </Button>
        ))}
      </div>
      <h3 className="font-bold text-lg">Available Time Slots {date && ` - ${formateDate(date)}`}</h3>
      {role === Role.USER && showAdvanceNotice && (
        <p className="text-sm text-muted-foreground">
          Please ensure that you book the slot at least 2 hours in advance.
        </p>
      )}
    </div>
  );
};

export default TimeSlotLegend;
