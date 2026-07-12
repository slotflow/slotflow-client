import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SplitTextReveal from "@/components/animation/SplitTextReveal";

const FAQHero = () => {
  return (
    <section className="relative overflow-hidden max-w-7xl mx-auto px-4 lg:px-0">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-0 lg:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Badge
            variant="secondary"
            className="rounded-full border px-4 py-1.5 text-sm font-medium hover:border-[#635bff]"
          >
            <Search className="mr-2 h-4 w-4 text-primary" />
            Frequently Asked Questions
          </Badge>

          <SplitTextReveal
            as="h1"
            split="lines"
            className="mt-8 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          >
            <span className="text-[#635bff]">Everything</span> you need
            <br />
            <span className="text-primary">to know.</span>
          </SplitTextReveal>

          <SplitTextReveal
            as="p"
            split="words"
            className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl"
          >
            Browse answers to the most common questions about bookings,
            subscriptions, payments, providers, and using Slotflow.
          </SplitTextReveal>
        </div>
      </div>
    </section>
  );
};

export default FAQHero;