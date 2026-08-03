import { Check } from "lucide-react";

const HistoryPreview = () => {
  return (
    <div className="space-y-3 rounded-2xl border border-border/60 bg-background/80 p-4">
      {[
        "Dental Checkup",
        "AC Repair",
        "Haircut",
      ].map((item) => (
        <div
          key={item}
          className="flex items-center justify-between rounded-xl border border-border/50 px-4 py-3"
        >
          <span className="text-sm font-medium">
            {item}
          </span>
          <span className="flex items-center gap-1 text-green-500">
          <span className="text-xs">
            Completed 
          </span>
            <Check className="" />
          </span>
        </div>
      ))}
    </div>
  );
};

export default HistoryPreview;