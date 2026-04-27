import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ChartLegend,
  ChartTooltip,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ChartHeader from "./ChartHeader";
import ChartOverlay from "./ChartOverlay";
import { Pie, PieChart, Cell } from "recharts";
import ChartDataNotAvailable from "./ChartDataNotAvailable";
import { CompletionChartProps } from "@/shared/interface/componentInterface";

const PieChartCompletionBreakdown: React.FC<CompletionChartProps> = ({
  title,
  description,
  chartData,
  dataKey,
  chartConfig,
  nameKey,
  isLocked,
  minimumPlan
}) => {
  return (
    <Card className="relative overflow-hidden">
      {isLocked && (<ChartOverlay stringOne={minimumPlan} chartTitle={title} />)}
      <ChartHeader title={title} description={description} />
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="min-h-[200px]" >
          {chartData.length === 0 ? (
            <ChartDataNotAvailable />
          ) : (
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey={dataKey}
                nameKey={nameKey}
                label
                outerRadius="80%"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={chartConfig[entry.status]?.color || "#8884d8"}
                  />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PieChartCompletionBreakdown;
