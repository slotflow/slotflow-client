import React from 'react';
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
import { Card, CardContent } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChartStackedProps } from '@/shared/types/component';
import ChartDataNotAvailable from './chartAddons/ChartDataNotAvailable';
import { filterChartDataHelper } from '@/shared/utils/helper/dateFilter';

const BarChartStacked = ({
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
}: BarChartStackedProps) => {
  const [timeRange, setTimeRange] = React.useState<TimeRange>('7d');

  const filteredData = filterChartDataHelper(chartData ?? [], timeRange);

  return (
    <Card className="relative overflow-hidden rounded-md">
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

              <div className="flex flex-col justify-between gap-3 h-36 pt-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2 w-full">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton
                      className="h-6 rounded-md"
                      style={{
                        width: `${Math.max(20, (i + 1) * 22)}%`,
                      }}
                    />
                  </div>
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
              <ChartContainer config={chartConfig} className="min-h-[200px]">
                <BarChart accessibilityLayer data={filteredData}>
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
              </ChartContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default BarChartStacked;
