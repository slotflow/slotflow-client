import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FeaturesHeader = () => {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Badge
        variant="secondary"
        className="rounded-full border px-4 py-1.5 text-sm font-medium"
      >
        <Sparkles className="mr-2 h-4 w-4 text-primary" />
        Powerful Features
      </Badge>
      <h2 className="mt-8 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        Everything you need
        <span className="block text-primary">
          to <span className="text-[#635bff] underline">book</span> with <span >confidence</span>.
        </span>
      </h2>
      <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
        Discover providers, compare availability, schedule appointments,
        make secure payments, and manage every booking from one modern
        platform designed for customers and service professionals.
      </p>
    </div>
  );
};

export default FeaturesHeader;