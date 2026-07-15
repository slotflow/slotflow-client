import { CircleHelp } from "lucide-react";
import SplitTextReveal from "@/components/animation/SplitTextReveal";

const FAQHeader = () => {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 hover:border-[#635bff]">
          <CircleHelp className="h-5 w-5 text-primary" />
        </div>
        <span className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
          FAQ
        </span>
      </div>
      <SplitTextReveal
        as="h2"
        once={false}
        split="lines"
        className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
      >
        Questions?
        <span className="mt-2 block">
          We've got <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent underline">answers.</span>
        </span>
      </SplitTextReveal>
      <SplitTextReveal
        as="p"
        once={false}
        split="words"
        className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground"
      >
        Everything you need to know about bookings,
        payments, providers and appointments before
        getting started with SlotFlow.
      </SplitTextReveal>
    </div>
  );
};

export default FAQHeader;