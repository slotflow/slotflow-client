import {
  ChartLegend,
  ChartTooltip,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from '@/components/ui/chart';
import ChartHeader from './ChartHeader';
import ChartOverlay from './ChartOverlay';
import { Pie, PieChart, Cell } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import ChartDataNotAvailable from './ChartDataNotAvailable';
import { CompletionChartProps } from '@/shared/types/component';

const PieChartCompletionBreakdown = ({
  title,
  description,
  chartData,
  dataKey,
  chartConfig,
  nameKey,
  isLocked,
  minimumPlan,
}: CompletionChartProps) => {
  return (
    <Card className="relative overflow-hidden">
      {isLocked && <ChartOverlay stringOne={minimumPlan} chartTitle={title} />}
      <ChartHeader title={title} description={description} />
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {chartData.length === 0 ? (
          <ChartDataNotAvailable />
        ) : (
          <ChartContainer config={chartConfig} className="min-h-[200px]">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey={dataKey} nameKey={nameKey} label outerRadius="80%">
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={chartConfig[entry.status]?.color || '#8884d8'} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default PieChartCompletionBreakdown;
