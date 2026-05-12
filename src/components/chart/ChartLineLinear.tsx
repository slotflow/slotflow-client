import React from "react"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import ChartHeader from "./ChartHeader"
import { TrendingUp } from "lucide-react"
import ChartDataNotAvailable from "./ChartDataNotAvailable"
import { TimeRange } from "@/shared/interface/commonInterface"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { filterChartDataHelper } from "@/shared/helper/dateFilter"
import { ChartLineLinearProps } from "@/shared/interface/componentInterface"

const ChartLineLinear: React.FC<ChartLineLinearProps> = ({
  title,
  description,
  chartData,
  dataKeyOne,
  chartConfig,
  footerTextOne,
  footerTextTwo,
  chartContainerClassName
}) => {

  const [timeRange, setTimeRange] = React.useState<TimeRange>("365d");
  const filteredData = filterChartDataHelper(chartData, timeRange);

  return (
    <Card className="relative overflow-hidden">
      {title && description && (
        <ChartHeader title={title} description={description} onValueChange={setTimeRange} value={timeRange} />
      )}
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className={`${chartContainerClassName || ""} w-full`}>
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
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
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
            </LineChart>
          )}
        </ChartContainer>
      </CardContent>
      {footerTextOne || footerTextTwo && (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          {footerTextOne && (
            <div className="flex gap-2 leading-none font-medium">
              {footerTextOne} <TrendingUp className="h-4 w-4" />
            </div>
          )}
          {footerTextTwo && (
            <div className="leading-none text-muted-foreground">
              {footerTextTwo}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  )
}

export default ChartLineLinear;