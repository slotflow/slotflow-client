const AvailabilityPreview = () => {
  return (
    <div className="space-y-3 rounded-2xl border border-border/60 bg-background/80 p-4">
      {[
        "09:30 AM",
        "11:00 AM",
        "02:00 PM",
      ].map((slot) => (
        <div
          key={slot}
          className="flex items-center justify-between rounded-xl border border-border/50 px-4 py-3"
        >
          <span className="text-sm font-medium">
            {slot}
          </span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-emerald-500">
            Available
          </span>
        </div>
      ))}
    </div>
  );
};

export default AvailabilityPreview;