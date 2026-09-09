import React from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { TimeRange } from '@/shared/types/common';
import ChartHeader from './chartAddons/ChartHeader';
import ChartOverlay from './chartAddons/ChartOverlay';
import { ChartLineLinearProps } from '@/shared/types/component';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import ChartDataNotAvailable from './chartAddons/ChartDataNotAvailable';
import { filterChartDataHelper } from '@/shared/utils/helper/dateFilter';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';

const ChartLineLinear = ({
  title,
  description,
  chartData,
  dataKeyOne,
  dataKeyTwo,
  dataKeyThree,
  dataKeyFour,
  chartConfig,
  footerTextOne,
  footerTextTwo,
  chartContainerClassName,
  isLocked,
  minimumPlan,
  isError,
  isLoading,
  onReload,
}: ChartLineLinearProps) => {
  const [timeRange, setTimeRange] = React.useState<TimeRange>('365d');

  const filteredData = filterChartDataHelper(chartData ?? [], timeRange);

  return (
    <Card className="relative overflow-hidden rounded-md">
      {isLocked && minimumPlan && <ChartOverlay stringOne={minimumPlan} chartTitle={title || ''} />}

      {title && description && (
        <ChartHeader
          title={title}
          description={description}
          onValueChange={setTimeRange}
          value={timeRange}
          isLoading={isLoading}
          onReload={onReload}
        />
      )}

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

              <div className="relative h-36 w-full">
                <Skeleton className="absolute bottom-0 left-0 h-1 w-full" />

                <div className="absolute inset-x-0 bottom-2 flex items-end justify-between gap-2">
                  {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                    <Skeleton
                      key={i}
                      className="w-full rounded-md"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
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
              <ChartContainer
                config={chartConfig}
                className={`${chartContainerClassName || ''} w-full min-h-[200px]`}
              >
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

                      return date.toLocaleDateString('en-US', {
                        month: 'short',
                        year: '2-digit',
                      });
                    }}
                  />

                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

                  <Line
                    dataKey={dataKeyOne}
                    type="linear"
                    stroke={chartConfig[dataKeyOne]?.color}
                    strokeWidth={2}
                    dot={false}
                  />

                  {dataKeyTwo && (
                    <Line
                      dataKey={dataKeyTwo}
                      type="linear"
                      stroke={chartConfig[dataKeyTwo]?.color}
                      strokeWidth={2}
                      dot={false}
                    />
                  )}

                  {dataKeyThree && (
                    <Line
                      dataKey={dataKeyThree}
                      type="linear"
                      stroke={chartConfig[dataKeyThree]?.color}
                      strokeWidth={2}
                      dot={false}
                    />
                  )}

                  {dataKeyFour && (
                    <Line
                      dataKey={dataKeyFour}
                      type="linear"
                      stroke={chartConfig[dataKeyFour]?.color}
                      strokeWidth={2}
                      dot={false}
                    />
                  )}
                </LineChart>
              </ChartContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      {(footerTextOne || footerTextTwo) && (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          {footerTextOne && (
            <div className="flex gap-2 leading-none font-medium">
              {footerTextOne}
              <TrendingUp className="h-4 w-4" />
            </div>
          )}

          {footerTextTwo && (
            <div className="leading-none text-muted-foreground">{footerTextTwo}</div>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default ChartLineLinear;
