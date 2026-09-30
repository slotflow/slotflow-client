import { Button } from '@/components/ui/button';
import ChartHeader from './chartAddons/ChartHeader';
import { Skeleton } from '@/components/ui/skeleton';
import ChartOverlay from './chartAddons/ChartOverlay';
import { AlertCircle, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HorizontalChartProps } from '@/shared/types/component';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import ChartDataNotAvailable from './chartAddons/ChartDataNotAvailable';
import { horizontalChartConfig } from '@/shared/utils/constants/chartConstants';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const HorizontalChart = ({
  chartData,
  isLoading,
  isError,
  onReload,
  title,
  description,
  isLocked,
  minimumPlan,
}: HorizontalChartProps) => {
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
              className="h-[250px] w-full flex flex-col justify-between p-4"
            >
              <div className="space-y-3">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>

              <div className="flex flex-col justify-between gap-3 h-36 pt-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2 w-full">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton
                      className="h-6 rounded-md"
                      style={{
                        width: `${Math.max(25, (i + 1) * 18)}%`,
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
              <ChartContainer config={horizontalChartConfig} className="min-h-[200px]">
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

                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />

                  <Bar dataKey="value" fill="#635bff" radius={4}>
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
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Analyze the trending data
          <TrendingUp className="size-4" />
        </div>

        <div className="text-muted-foreground leading-none">Showing stats in bar chart</div>
      </CardFooter>
    </Card>
  );
};

export default HorizontalChart;
