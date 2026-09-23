import { ChartConfig } from '@/components/ui/chart';
import { BaseChartData } from '@/shared/types/common';
import AreaGroupedChart from '@/components/chart/AreaGroupedChart';

const areaChartConfig: ChartConfig = {
  newUsers: {
    label: 'New Users',
    color: '#6366f1',
  },
  activeUsers: {
    label: 'Active Users',
    color: '#10b981',
  },
  churnedUsers: {
    label: 'Churned Users',
    color: '#f43f5e',
  },
};

const areaChartDummyData: BaseChartData[] = [
  { date: '2026-08-10', newUsers: 120, activeUsers: 450, churnedUsers: 25 },
  { date: '2026-08-12', newUsers: 140, activeUsers: 480, churnedUsers: 20 },
  { date: '2026-08-14', newUsers: 180, activeUsers: 520, churnedUsers: 15 },
  { date: '2026-08-16', newUsers: 160, activeUsers: 500, churnedUsers: 30 },
  { date: '2026-08-18', newUsers: 210, activeUsers: 580, churnedUsers: 18 },
  { date: '2026-08-20', newUsers: 250, activeUsers: 620, churnedUsers: 12 },
  { date: '2026-08-22', newUsers: 230, activeUsers: 610, churnedUsers: 22 },
  { date: '2026-08-24', newUsers: 290, activeUsers: 670, churnedUsers: 10 },
  { date: '2026-08-26', newUsers: 310, activeUsers: 710, churnedUsers: 14 },
  { date: '2026-08-28', newUsers: 340, activeUsers: 750, churnedUsers: 8 },
  { date: '2026-08-30', newUsers: 380, activeUsers: 800, churnedUsers: 11 },
  { date: '2026-09-01', newUsers: 360, activeUsers: 790, churnedUsers: 19 },
  { date: '2026-09-03', newUsers: 400, activeUsers: 840, churnedUsers: 9 },
  { date: '2026-09-05', newUsers: 430, activeUsers: 890, churnedUsers: 7 },
  { date: '2026-09-07', newUsers: 470, activeUsers: 930, churnedUsers: 5 },
];

export const AreaChartDemo = () => {
  return (
    <AreaGroupedChart
      title="AreaGroupedChart"
      description="Daily breakdown of new user signups, active users, and churn rate."
      chartData={areaChartDummyData}
      dataKeyOne="newUsers"
      dataKeyTwo="activeUsers"
      dataKeyThree="churnedUsers"
      chartConfig={areaChartConfig}
      isLocked={false}
    />
  );
};

export default AreaChartDemo;
