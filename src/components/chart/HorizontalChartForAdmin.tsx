import { Loader2, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart with a custom label";

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

interface HorizontalChartForAdminReactProps {
  chartData: { name: string; value: number }[];
  isLOading: boolean;
}

const HorizontalChartForAdminReact: React.FC<HorizontalChartForAdminReactProps> = ({
  chartData,
  isLOading
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview Bar Chart</CardTitle>
        <CardDescription>Can analyse the data in more easy</CardDescription>
      </CardHeader>
      <CardContent>
        {isLOading ? (
          <div className="h-full flex justify-center items-center">
            <span><Loader2 className="animate-spin" /></span>
          </div>
        ) : (
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={150}
            />
            <XAxis dataKey="value" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="value"
              fill="#635bff"
              radius={4}
            >
              <LabelList
                dataKey="name"
                position="insideLeft"
                offset={20}
                className="fill-[#ffffff]"
                fontSize={12}
              />
              <LabelList
                dataKey="value"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
           )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Analyze the trending data <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing stats in bar chart
        </div>
      </CardFooter>
    </Card>
  );
}

export default HorizontalChartForAdminReact;