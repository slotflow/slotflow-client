import WorkflowStep from "./WorkflowStep";
import { bookingSteps } from "@/shared/utils/constants";
import { WorkflowTimelineProps } from "@/shared/interface/componentInterface";

const WorkflowTimeline = ({
    activeStep,
}: WorkflowTimelineProps) => {
    return (
        <div className="relative h-full">
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