import { ChartConfig } from '@/components/ui/chart';
import { BaseChartData } from '@/shared/types/common';
import BarChartVertical from '@/components/chart/BarChartVertical';

const verticalBarChartConfig: ChartConfig = {
  newUsers: {
    label: 'New Users',
    color: '#6366f1',
  },
  activeUsers: {
    label: 'Active Users',
    color: '#10b981',
  },
};

const verticalBarChartDummyData: BaseChartData[] = [
  { date: '2026-08-10', newUsers: 120, activeUsers: 450 },
  { date: '2026-08-12', newUsers: 140, activeUsers: 480 },
  { date: '2026-08-14', newUsers: 180, activeUsers: 520 },
  { date: '2026-08-16', newUsers: 160, activeUsers: 500 },
  { date: '2026-08-18', newUsers: 210, activeUsers: 580 },
  { date: '2026-08-20', newUsers: 250, activeUsers: 620 },
  { date: '2026-08-22', newUsers: 230, activeUsers: 610 },
  { date: '2026-08-24', newUsers: 290, activeUsers: 670 },
  { date: '2026-08-26', newUsers: 310, activeUsers: 710 },
  { date: '2026-08-28', newUsers: 340, activeUsers: 750 },
  { date: '2026-08-30', newUsers: 380, activeUsers: 800 },
  { date: '2026-09-01', newUsers: 360, activeUsers: 790 },
  { date: '2026-09-03', newUsers: 400, activeUsers: 840 },
  { date: '2026-09-05', newUsers: 430, activeUsers: 890 },
  { date: '2026-09-07', newUsers: 470, activeUsers: 930 },
];

export const BarChartVerticalDemo = () => {
  return (
    <BarChartVertical
      title="BarChartVerticalDemo"
      description="Side-by-side view of new vs active user volume over time"
      chartData={verticalBarChartDummyData}
      dataKeyOne="newUsers"
      dataKeyTwo="activeUsers"
      chartConfig={verticalBarChartConfig}
      isLocked={false}
    />
  );
};

export default BarChartVerticalDemo;
