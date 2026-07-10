import { BadgeCheck, Star } from "lucide-react";

const ProviderPreview = () => {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-primary/10" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-medium">
              John Services
            </p>
            <BadgeCheck className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-1 flex items-center gap-1">
            <Star className="h-4 w-4 fill-current text-primary" />
            <span className="text-xs">
              4.9 (220 Reviews)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderPreview;