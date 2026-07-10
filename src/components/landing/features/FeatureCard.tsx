import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  className,
  children,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(`group relative overflow-hidden rounded-3xl border border-primary/60 bg-background/70 p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]`,className)}>
      <div className="absolute -right-16 -top-16 h-10 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"/>
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Icon className="h-7 w-7 text-primary" />
          </div>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"/>
        </div>
        <h3 className="mt-8 text-2xl font-bold">
          {title}
        </h3>
        <p className="mt-3 leading-7 text-muted-foreground">
          {description}
        </p>
        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;