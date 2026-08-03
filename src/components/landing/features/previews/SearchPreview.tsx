import { Search, Star } from "lucide-react";

const SearchPreview = () => {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Search "Electrician"
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-xl border border-border/50 p-3"
          >
            <div>
              <p className="text-sm font-medium">
                Web Developer
              </p>
              <p className="text-xs text-muted-foreground">
                Available Today
              </p>
            </div>
            <div className="flex items-center gap-1 text-primary">
              <Star className="h-4 w-4 fill-current text-yellow-400" />
              <span className="text-sm font-medium">4.9</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPreview;