import { ChartConfig } from '@/components/ui/chart';
import { BaseChartData } from '@/shared/types/common';
import BarChartHorizontal from '@/components/chart/BarChartHorizontal';

const barChartConfig: ChartConfig = {
  returningUsers: {
    label: 'Returning Users',
    color: '#6366f1',
  },
};

const barChartDummyData: BaseChartData[] = [
  { date: '2026-09-01', returningUsers: 45 },
  { date: '2026-09-02', returningUsers: 60 },
  { date: '2026-09-03', returningUsers: 35 },
  { date: '2026-09-04', returningUsers: 70 },
  { date: '2026-09-05', returningUsers: 55 },
  { date: '2026-09-06', returningUsers: 80 },
  { date: '2026-09-07', returningUsers: 65 },
];

export const BarChartHorizontalDemo = () => {
  return (
    <BarChartHorizontal
      title="BarChartHorizontal"
      description="Compare new user acquisition against returning active user density"
      chartData={barChartDummyData}
      dataKeyOne="date"
      dataKeyTwo="returningUsers"
      dataKeyThree="returningUsers"
      chartConfig={barChartConfig}
      isLocked={false}
    />
  );
};

export default BarChartHorizontalDemo;
