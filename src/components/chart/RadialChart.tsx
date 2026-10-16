import { AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LabelList, RadialBar, RadialBarChart } from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import ChartHeader from './chartAddons/ChartHeader';
import ChartOverlay from './chartAddons/ChartOverlay';
import ChartDataNotAvailable from './chartAddons/ChartDataNotAvailable';

import { ChartDataItem, RadialChartInterface } from '@/shared/types/component';

const RadialChart = <T extends ChartDataItem>({
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
}: RadialChartInterface<T>) => {
  const coloredChartData = chartData.map((item) => {
    const key = item[dataKeyTwo];
    const keyString = String(key);
    const fill = chartConfig[keyString]?.color || '#8884d8';

    return {
      ...item,
      fill,
    };
  });

  return (
    <Card className="relative overflow-hidden">
      {isLocked && minimumPlan && <ChartOverlay stringOne={minimumPlan} chartTitle={title} />}

      <ChartHeader
        title={title}
        description={description}
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
              className="h-[250px] w-full flex items-center justify-center"
            >
              <Skeleton className="h-40 w-40 rounded-full" />
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
          ) : chartData.length === 0 ? (
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
                <RadialBarChart
                  data={coloredChartData}
                  startAngle={-90}
                  endAngle={380}
                  innerRadius={30}
                  outerRadius={110}
                >
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel nameKey={String(dataKeyTwo)} />}
                  />

                  <RadialBar dataKey={String(dataKeyOne)} background isAnimationActive label>
                    <LabelList
                      dataKey={String(dataKeyTwo)}
                      position="insideStart"
                      className="fill-white capitalize mix-blend-luminosity"
                      fontSize={11}
                    />
                  </RadialBar>
                </RadialBarChart>
              </ChartContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default RadialChart;
