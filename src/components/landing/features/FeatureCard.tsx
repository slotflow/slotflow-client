import { cn } from "@/lib/utils";
import { FeatureCardProps } from "@/shared/interface/componentInterface";

const FeatureCard = ({
  title,
  description,
  className,
  children,
}: FeatureCardProps) => {
  return (
    <div className={cn(`group relative overflow-hidden rounded-3xl border border-primary/60 bg-background/70 p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]`, className)}>
      <div className="absolute -right-16 -top-16 h-10 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="pointer-events-none absolute -bottom-20 left-1/2 h-56 w-[120%] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
        <div className="flex flex-col items-start p-2">
          <h3 className="mt-8 text-2xl font-bold">
            {title}
          </h3>
          <p className="mt-3 leading-7 text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;