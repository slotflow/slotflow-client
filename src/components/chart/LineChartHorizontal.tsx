import React from 'react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ChartHeader from './ChartHeader';
import ChartOverlay from './ChartOverlay';
import ChartDataNotAvailable from './ChartDataNotAvailable';
import { TimeRange } from '@/utils/interface/commonInterface';
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { filterChartDataHelper } from '@/utils/helper/dateFilter';
import { LineChartHorizontalProps } from '@/utils/interface/componentInterface/commonComponentInterface';

const LineChartHorizontal: React.FC<LineChartHorizontalProps> = ({
  title,
  description,
  chartData,
  dataKeyOne,
  dataKeyTwo,
  chartConfig,
  isLocked
}) => {

  const [timeRange, setTimeRange] = React.useState<TimeRange>("7d");
  const filteredData = filterChartDataHelper(chartData, timeRange);

  return (
    <Card className="relative overflow-hidden">
      {isLocked && (<ChartOverlay stringOne="Starter" chartTitle={title} />)}
      <ChartHeader title={title} description={description} onValueChange={setTimeRange} value={timeRange} />
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="min-h-[200px]" >
          {chartData.length === 0 ? (
            <ChartDataNotAvailable />
          ) : (
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
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey={dataKeyOne}
                type="linear"
                stroke={chartConfig[dataKeyOne]?.color}
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey={dataKeyTwo}
                type="linear"
                stroke={chartConfig[dataKeyTwo]?.color}
                strokeWidth={2}
                dot={false}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default LineChartHorizontal;
