import { cn } from "@/lib/utils";
import { IntegrationSectionCardProps } from "@/shared/interface/componentInterface";

const IntegrationCard = ({
  title,
  description,
  logo,
}: IntegrationSectionCardProps) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-background/70 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]"
      )}
    >

      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border bg-background shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:border-primary/30">

          <img
            src={logo}
            alt={title}
            className="h-9 w-9 object-contain transition-transform duration-500 group-hover:scale-110"
          />

        </div>

        <h3 className="mt-6 text-xl font-semibold">
          {title}
        </h3>

        <p className="mt-3 leading-7 text-muted-foreground">
          {description}
        </p>

      </div>

    </div>
  );
};

export default IntegrationCard;