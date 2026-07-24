const BookingPreview = () => {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
      <div className="grid grid-cols-4 gap-2">
        {[
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "02:00",
          "03:00",
          "04:00",
          "05:00",
        ].map((time, index) => (
          <div
            key={time}
            className={`
              rounded-lg
              border
              p-2
              text-center
              text-xs
              ${
                index === 5
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border"
              }
            `}
          >
            {time}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPreview;