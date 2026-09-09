import React from 'react';
import { Card, CardContent } from '../ui/card';
import { TimeRange } from '@/shared/types/common';
import ChartHeader from './chartAddons/ChartHeader';
import ChartOverlay from './chartAddons/ChartOverlay';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { BarChartVerticalProps } from '@/shared/types/component';
import ChartDataNotAvailable from './chartAddons/ChartDataNotAvailable';
import { filterChartDataHelper } from '@/shared/utils/helper/dateFilter';
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';

const BarChartVertical = ({
  title,
  description,
  chartData,
  dataKeyOne,
  dataKeyTwo,
  chartConfig,
  isLocked,
  minimumPlan,
  isError,
  isLoading,
  onReload,
}: BarChartVerticalProps) => {
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

              <div className="flex items-end justify-center gap-6 h-36 pt-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-8 rounded-t-md"
                    style={{
                      height: `${Math.max(30, (i + 1) * 15)}%`,
                    }}
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
              <ChartContainer config={chartConfig} className="min-h-[200px]">
                <BarChart accessibilityLayer data={filteredData}>
                  <CartesianGrid vertical={false} />

                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => {
                      const date = new Date(value);

                      return date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      });
                    }}
                  />

                  <ChartTooltip content={<ChartTooltipContent />} />

                  <ChartLegend content={<ChartLegendContent />} />

                  <Bar
                    dataKey={dataKeyOne}
                    fill="var(--mainColor)"
                    radius={[8, 8, 0, 0]}
                    barSize={20}
                    label={{
                      position: 'top',
                      fill: 'var(--textOne)',
                      fontSize: 12,
                    }}
                    animationDuration={500}
                  />

                  <Bar
                    dataKey={dataKeyTwo}
                    fill="var(--mainColorHover)"
                    radius={[8, 8, 0, 0]}
                    barSize={20}
                    label={{
                      position: 'top',
                      fill: 'var(--textOne)',
                      fontSize: 12,
                    }}
                    animationDuration={700}
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

export default BarChartVertical;
