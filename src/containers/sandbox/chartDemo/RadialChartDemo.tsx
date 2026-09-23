import RadialChart from '@/components/chart/RadialChart';
import { ChartConfig } from '@/components/ui/chart';

const radialChartConfig: ChartConfig = {
  chrome: {
    label: 'Chrome',
    color: '#2563eb',
  },
  safari: {
    label: 'Safari',
    color: '#60a5fa',
  },
  firefox: {
    label: 'Firefox',
    color: '#f97316',
  },
  edge: {
    label: 'Edge',
    color: '#0284c7',
  },
  other: {
    label: 'Other',
    color: '#64748b',
  },
};

const radialChartDummyData = [
  { browser: 'chrome', visitors: 275 },
  { browser: 'safari', visitors: 200 },
  { browser: 'firefox', visitors: 187 },
  { browser: 'edge', visitors: 173 },
  { browser: 'other', visitors: 90 },
];

export const RadialChartDemo = () => {
  return (
    <RadialChart
      title="RadialChart"
      description="Breakdown of active users by browser choice"
      chartData={radialChartDummyData}
      dataKeyOne="visitors"
      dataKeyTwo="browser"
      chartConfig={radialChartConfig}
      isLocked={false}
    />
  );
};

export default RadialChartDemo;
