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
        `
        relative
        overflow-hidden
        rounded-3xl
        border
        p-7
        transition-all
        duration-500
        `,
        active
  ? `
      border-primary/40
      bg-primary/[0.04]
      shadow-[0_20px_60px_rgba(0,0,0,0.12)]
      scale-[1.02]
    `
  : `
      border-border/50
      bg-background/70
      hover:border-primary/30
    `
      )}
    >
      <div className="flex gap-5">

        <div
          className={cn(
            `
            text-5xl
            font-black
            tracking-tight
            transition-colors
            transition-all
            duration-500
            hover:-translate-y-1
            hover:shadow-2xl
            `,
            active
              ? "text-primary"
              : "text-muted-foreground/30"
          )}
        >
          {String(number).padStart(2, "0")}
        </div>

        <div className="flex-1">

          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">

            <Icon className="h-6 w-6 text-primary" />

          </div>

          <h3 className="text-2xl font-semibold">

            {title}

          </h3>

          <p className="mt-3 leading-7 text-muted-foreground">

            {description}

          </p>

        </div>

      </div>
    </div>
  );
};

export default WorkflowStep;