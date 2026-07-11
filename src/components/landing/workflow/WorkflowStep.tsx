import { cn } from "@/lib/utils";

interface WorkflowStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
  active?: boolean;
}

const WorkflowStep = ({
  number,
  title,
  description,
  icon: Icon,
  active = false,
}: WorkflowStepProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border p-7 transition-all duration-500",
        active
          ? "scale-[1.02] border-primary/40 bg-primary/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.12)] opacity-100"
          : "border-border/50 bg-background/70 opacity-60 hover:border-primary/30 hover:opacity-80"
      )}
    >
      <div className="flex gap-5">
        <div
          className={cn(
            "text-5xl font-black tracking-tight transition-all duration-500",
            active ? "text-primary" : "text-muted-foreground/25"
          )}
        >
          {String(number).padStart(2, "0")}
        </div>

        <div className="flex-1">
          <div
            className={cn(
              "mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-500",
              active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            )}
          >
            <Icon className="h-6 w-6" />
          </div>

          <h3
            className={cn(
              "text-2xl font-semibold transition-colors duration-500",
              active ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {title}
          </h3>

          <p
            className={cn(
              "mt-3 leading-7 transition-colors duration-500",
              active ? "text-muted-foreground" : "text-muted-foreground/70"
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkflowStep;