import React from 'react';
import {
  ChartLegend,
  ChartTooltip,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from '@/components/ui/chart';
import ChartHeader from './ChartHeader';
import ChartOverlay from './ChartOverlay';
import { TimeRange } from '@/shared/types/common';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import ChartDataNotAvailable from './ChartDataNotAvailable';
import { BarChartHorizontalProps } from '@/shared/types/component';
import { filterChartDataHelper } from '@/shared/utils/helper/dateFilter';

const BarChartHorizontal = ({
  title,
  description,
  chartData,
  dataKeyOne,
  dataKeyTwo,
  dataKeyThree,
  chartConfig,
  isLocked,
}: BarChartHorizontalProps) => {
  const [timeRange, setTimeRange] = React.useState<TimeRange>('7d');
  const filteredData = filterChartDataHelper(chartData, timeRange);

  return (
    <Card className="relative overflow-hidden">
      {isLocked && <ChartOverlay stringOne="Starter" chartTitle={title} />}
      <ChartHeader
        title={title}
        description={description}
        onValueChange={setTimeRange}
        value={timeRange}
      />
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="min-h-[200px]">
          {chartData.length === 0 ? (
            <ChartDataNotAvailable />
          ) : (
            <BarChart data={filteredData} layout="vertical" margin={{ left: 0 }}>
              <YAxis
                dataKey={dataKeyOne}
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <XAxis dataKey={dataKeyTwo} type="number" />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel={false} />} />
              <Bar
                dataKey={dataKeyThree}
                radius={[5, 5, 5, 5]}
                fill={chartConfig[dataKeyThree as keyof typeof chartConfig]?.color}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BarChartHorizontal;
