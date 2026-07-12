import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays } from "lucide-react";
import SplitTextReveal from "@/components/animation/SplitTextReveal";

const ContactCTA = () => {
    const navigate = useNavigate();
  return (
    <section className="pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-0">
        <div className="relative overflow-hidden rounded-[2rem] border bg-background/60 px-8 py-16 text-center backdrop-blur-xl lg:px-16 lg:py-24">
          <div className="absolute left-1/2 top-1/2 -z-10 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

          <div className="mx-auto max-w-3xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <CalendarDays className="h-8 w-8 text-primary" />
            </div>

            <SplitTextReveal
              as="h2"
              split="lines"
              once={false}
              className="mt-8 text-4xl font-bold tracking-tight md:text-5xl"
            >
              Ready to simplify your scheduling?
            </SplitTextReveal>

            <SplitTextReveal
              as="p"
              split="words"
              once={false}
              className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground"
            >
              Discover how Slotflow can help you automate appointments,
              improve customer experiences, and grow your business with
              confidence.
            </SplitTextReveal>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button 
                className="group h-8 lg:h-12 rounded-xl px-8"
                onClick={() => {}}
                >
                Book a Demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                className="h-8 lg:h-12 rounded-xl px-8"
                onClick={() => navigate("/pricing")}
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;