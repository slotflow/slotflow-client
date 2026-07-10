import { Star } from "lucide-react";

const ReviewHeader = () => {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2">
        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400">
          Customer Reviews
        </span>
      </div>

      <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
        <span className="text-[#635bff] underline">Trusted</span> by thousands
        <span className="mt-2 block">
          for every booking.
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
        See how customers and service providers are using SlotFlow to
        simplify appointments, save time, and deliver exceptional booking
        experiences every day.
      </p>
    </div>
  );
};

export default ReviewHeader;