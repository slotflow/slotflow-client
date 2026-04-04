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
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { filterChartDataHelper } from '@/utils/helper/dateFilter';
import { BarChartStackedProps } from '@/utils/interface/componentInterface/commonComponentInterface';

const BarChartStacked: React.FC<BarChartStackedProps> = ({
    title,
    description,
    chartData,
    dataKeyOne,
    dataKeyTwo,
    dataKeyThree,
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
                        <BarChart accessibilityLayer data={filteredData}>
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
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar
                                dataKey={dataKeyOne}
                                stackId="a"
                                fill={chartConfig[dataKeyOne]?.color}
                                radius={[0, 0, 4, 4]}
                            />
                            <Bar
                                dataKey={dataKeyTwo}
                                stackId="a"
                                fill={chartConfig[dataKeyTwo]?.color}
                                radius={[4, 4, 0, 0]}
                            />
                            <Bar
                                dataKey={dataKeyThree}
                                stackId="a"
                                fill={chartConfig[dataKeyThree]?.color}
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    )}
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default BarChartStacked
