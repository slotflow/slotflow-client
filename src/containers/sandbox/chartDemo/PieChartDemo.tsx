import { ChartConfig } from '@/components/ui/chart';
import PieChartRounded from '@/components/chart/PieChartRounded';

const completionChartConfig: ChartConfig = {
  completed: {
    label: 'Completed',
    color: '#10b981',
  },
  inProgress: {
    label: 'In Progress',
    color: '#3b82f6',
  },
  pending: {
    label: 'Pending',
    color: '#f59e0b',
  },
  failed: {
    label: 'Failed',
    color: '#ef4444',
  },
};

const completionChartDummyData = [
  { status: 'completed', value: 450 },
  { status: 'inProgress', value: 210 },
  { status: 'pending', value: 120 },
  { status: 'failed', value: 35 },
];

export const PieChartDemo = () => {
  return (
    <PieChartRounded
      title="PieChartRounded"
      description="Distribution of current task completion statuses across active projects"
      chartData={completionChartDummyData}
      dataKey="value"
      nameKey="status"
      chartConfig={completionChartConfig}
      isLocked={false}
    />
  );
};

export default PieChartDemo;
