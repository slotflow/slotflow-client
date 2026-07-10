import WorkflowStep from "./WorkflowStep";
import { bookingSteps } from "@/shared/utils/constants";

interface WorkflowTimelineProps {
    activeStep: number;
}

const WorkflowTimeline = ({
    activeStep,
}: WorkflowTimelineProps) => {
    return (
        <div className="relative h-full">
            <div className="absolute left-[30px] top-0 bottom-0 w-px bg-border/50" />
            <div
                className="absolute left-[30px] top-0 w-px bg-primary transition-all duration-500"
                style={{
                    height: `${((activeStep + 1) / bookingSteps.length) * 100}%`,
                }}
            />
            <div className="space-y-8">
                {bookingSteps.map((step, index) => (
                    <WorkflowStep
                        key={step.title}
                        number={index + 1}
                        title={step.title}
                        description={step.description}
                        icon={step.icon}
                        active={activeStep === index}
                    />
                ))}
            </div>
        </div>
    );
};

export default WorkflowTimeline;