import { Star } from "lucide-react";
import SplitTextReveal from "@/components/animation/SplitTextReveal";

const ReviewHeader = () => {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 hover:border-yellow-500">
        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400">
          Customer Reviews
        </span>
      </div>
      <SplitTextReveal
        as="h2"
        once={false}
        split="lines"
        className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl"
      >
        <span className="text-[#635bff] underline">Trusted</span> by thousands
        <span className="mt-2 block">
          for every booking.
        </span>
      </SplitTextReveal>
      <SplitTextReveal
        as="p"
        once={false}
        split="words"
        className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground"
      >
        See how customers and service providers are using SlotFlow to
        simplify appointments, save time, and deliver exceptional booking
        experiences every day.
      </SplitTextReveal>
    </div>
  );
};

export default ReviewHeader;