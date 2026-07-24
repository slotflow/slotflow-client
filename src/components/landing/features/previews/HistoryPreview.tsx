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
          <span className="text-xs text-muted-foreground">
            Completed
          </span>
        </div>
      ))}
    </div>
  );
};

export default HistoryPreview;