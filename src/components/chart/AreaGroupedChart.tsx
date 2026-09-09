import * as React from 'react';
import {
  ChartLegend,
  ChartTooltip,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TimeRange } from '@/shared/types/common';
import { Skeleton } from '@/components/ui/skeleton';
import ChartHeader from './chartAddons/ChartHeader';
import ChartOverlay from './chartAddons/ChartOverlay';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { AreaGroupChartProps } from '@/shared/types/component';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import ChartDataNotAvailable from './chartAddons/ChartDataNotAvailable';
import { filterChartDataHelper } from '@/shared/utils/helper/dateFilter';

const AreaGroupedChart = ({
  title,
  description,
  chartData,
  dataKeyOne,
  dataKeyTwo,
  dataKeyThree,
  chartConfig,
  isLocked,
  minimumPlan,
  isError,
  isLoading,
  onReload,
}: AreaGroupChartProps) => {
  const [timeRange, setTimeRange] = React.useState<TimeRange>('7d');

  const filteredData = filterChartDataHelper(chartData ?? [], timeRange);

  return (
    <Card className="relative overflow-hidden">
      {isLocked && minimumPlan && <ChartOverlay stringOne={minimumPlan} chartTitle={title} />}
      <ChartHeader
        title={title}
        description={description}
        onValueChange={setTimeRange}
        value={timeRange}
        isLoading={isLoading}
        onReload={onReload}
      />
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[250px] w-full flex flex-col justify-between p-4"
            >
              <div className="space-y-3">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
              <div className="flex items-end justify-between gap-2 h-36">
                {[...Array(8)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-full rounded-t-md"
                    style={{ height: `${Math.max(20, (i * 17) % 100)}%` }}
                  />
                ))}
              </div>
            </motion.div>
          ) : isError ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[250px] flex flex-col items-center justify-center text-center p-6"
            >
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-full mb-3">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Failed to load chart data
              </p>
              {onReload && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={onReload}
                  className="text-indigo-600 dark:text-indigo-400 mt-1"
                >
                  Try again
                </Button>
              )}
            </motion.div>
          ) : filteredData.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ChartDataNotAvailable />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ChartContainer config={chartConfig} className="min-h-[250px]">
                <AreaChart data={filteredData}>
                  <defs>
                    {[
                      { key: dataKeyOne, id: 'fillOne' },
                      { key: dataKeyTwo, id: 'fillTwo' },
                      { key: dataKeyThree, id: 'fillThree' },
                    ].map(({ key, id }) => (
                      <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartConfig[key]?.color} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={chartConfig[key]?.color} stopOpacity={0.1} />
                      </linearGradient>
                    ))}
                  </defs>

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

                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => {
                          return new Date(value).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          });
                        }}
                        indicator="dot"
                      />
                    }
                  />

                  <Area
                    dataKey={dataKeyOne}
                    type="natural"
                    fill="url(#fillOne)"
                    stroke={chartConfig[dataKeyOne]?.color}
                    stackId="a"
                  />

                  <Area
                    dataKey={dataKeyTwo}
                    type="natural"
                    fill="url(#fillTwo)"
                    stroke={chartConfig[dataKeyTwo]?.color}
                    stackId="a"
                  />

                  <Area
                    dataKey={dataKeyThree}
                    type="natural"
                    fill="url(#fillThree)"
                    stroke={chartConfig[dataKeyThree]?.color}
                    stackId="a"
                  />

                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default AreaGroupedChart;
