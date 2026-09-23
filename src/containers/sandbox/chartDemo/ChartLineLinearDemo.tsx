import { ChartConfig } from '@/components/ui/chart';
import { BaseChartData } from '@/shared/types/common';
import ChartLineLinear from '@/components/chart/ChartLineLinear';

const lineChartConfig: ChartConfig = {
  newUsers: {
    label: 'New Users',
    color: '#6366f1',
  },
  activeUsers: {
    label: 'Active Users',
    color: '#10b981',
  },
  returningUsers: {
    label: 'Returning Users',
    color: '#f59e0b',
  },
  churnedUsers: {
    label: 'Churned Users',
    color: '#f43f5e',
  },
};

const lineChartDummyData: BaseChartData[] = [
  { date: '2025-10-01', newUsers: 100, activeUsers: 300, returningUsers: 150, churnedUsers: 20 },
  { date: '2025-11-01', newUsers: 130, activeUsers: 340, returningUsers: 170, churnedUsers: 18 },
  { date: '2025-12-01', newUsers: 170, activeUsers: 390, returningUsers: 200, churnedUsers: 15 },
  { date: '2026-01-01', newUsers: 210, activeUsers: 450, returningUsers: 230, churnedUsers: 22 },
  { date: '2026-02-01', newUsers: 240, activeUsers: 490, returningUsers: 260, churnedUsers: 19 },
  { date: '2026-03-01', newUsers: 280, activeUsers: 540, returningUsers: 290, churnedUsers: 14 },
  { date: '2026-04-01', newUsers: 320, activeUsers: 600, returningUsers: 310, churnedUsers: 12 },
  { date: '2026-05-01', newUsers: 360, activeUsers: 650, returningUsers: 340, churnedUsers: 16 },
  { date: '2026-06-01', newUsers: 400, activeUsers: 710, returningUsers: 380, churnedUsers: 10 },
  { date: '2026-07-01', newUsers: 430, activeUsers: 760, returningUsers: 410, churnedUsers: 8 },
  { date: '2026-08-01', newUsers: 470, activeUsers: 820, returningUsers: 450, churnedUsers: 6 },
  { date: '2026-09-01', newUsers: 510, activeUsers: 880, returningUsers: 490, churnedUsers: 5 },
];

export const ChartLineLinearDemo = () => {
  return (
    <ChartLineLinear
      title="ChartLineLinear"
      description="Linear progression across key platform user categories over the past 12 months"
      chartData={lineChartDummyData}
      dataKeyOne="newUsers"
      dataKeyTwo="activeUsers"
      dataKeyThree="returningUsers"
      dataKeyFour="churnedUsers"
      chartConfig={lineChartConfig}
      footerTextOne="Trending up by 12.4% this year"
      footerTextTwo="Showing total user activity breakdown"
      isLocked={false}
    />
  );
};

export default ChartLineLinearDemo;
