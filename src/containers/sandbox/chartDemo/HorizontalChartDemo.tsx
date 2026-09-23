import HorizontalChart from '@/components/chart/HorizontalChart';

const horizontalChartDummyData = [
  { name: 'Direct Sales', value: 4500 },
  { name: 'Referral Traffic', value: 3200 },
  { name: 'Organic Search', value: 2800 },
  { name: 'Social Media', value: 1900 },
  { name: 'Email Campaigns', value: 1400 },
];

export const HorizontalChartDemo = () => {
  return (
    <HorizontalChart
      title="HorizontalChart"
      description="HorizontalChart description"
      chartData={horizontalChartDummyData}
    />
  );
};

export default HorizontalChartDemo;
