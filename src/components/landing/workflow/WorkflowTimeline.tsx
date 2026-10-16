import WorkflowStep from './WorkflowStep';
import { WorkflowTimelineProps } from '@/shared/types/component';
import { bookingSteps } from '@/shared/utils/constants/landingConstants';

const WorkflowTimeline = ({ activeStep }: WorkflowTimelineProps) => {
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
