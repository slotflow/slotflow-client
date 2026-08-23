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
import { Card, CardContent } from '@/components/ui/card';
import ChartDataNotAvailable from './ChartDataNotAvailable';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { ChartLineMultipleProps } from '@/shared/types/component';
import { filterChartDataHelper } from '@/shared/utils/helper/dateFilter';

const ChartLineMultiple = ({
  title,
  description,
  chartData,
  dataKeyOne,
  dataKeyTwo,
  chartConfig,
  isLocked,
}: ChartLineMultipleProps) => {
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
        {chartData.length === 0 ? (
          <ChartDataNotAvailable />
        ) : (
          <ChartContainer config={chartConfig} className="min-h-[200px]">
            <LineChart
              accessibilityLayer
              data={filteredData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  });
                }}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey={dataKeyOne}
                type="monotone"
                stroke={chartConfig[dataKeyOne]?.color ?? '#000'}
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey={dataKeyTwo}
                type="monotone"
                stroke={chartConfig[dataKeyTwo]?.color ?? '#888'}
                strokeWidth={2}
                dot={false}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartLineMultiple;
