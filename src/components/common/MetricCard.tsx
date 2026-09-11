import { MetricCProps } from '@/shared/types/component';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Info,
  XCircle,
  LoaderCircle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

const MetricCard = ({
  title,
  isLoading,
  isError,
  error,
  data,
  Icon,
  percentage,
  days,
  chartData = [],
  bgColour,
  main,
}: MetricCProps) => {
  const isPositive = (percentage ?? 0) >= 0;

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg border ${
        bgColour
          ? `${bgColour} text-white border-transparent shadow-indigo-500/10`
          : 'bg-card text-card-foreground border-border/60 hover:border-border'
      } rounded-2xl p-5 flex flex-col justify-between`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            bgColour ? 'text-white/80' : 'text-muted-foreground'
          }`}
        >
          {title}
        </span>
        <div
          className={`p-2 rounded-xl transition-colors ${
            bgColour
              ? 'bg-white/10 text-white'
              : 'bg-muted/60 text-muted-foreground'
          }`}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 mt-auto">
        <div className="space-y-1.5">
          {isLoading ? (
            <div className="flex items-center gap-2 py-1">
              <LoaderCircle className="w-5 h-5 animate-spin text-muted-foreground" />
              <span className="h-4 w-16 rounded bg-muted/60 animate-pulse" />
            </div>
          ) : isError && error ? (
            <div className="flex items-center gap-1.5 text-xs text-destructive">
              <Info className="w-4 h-4" />
              <span>Failed to fetch</span>
            </div>
          ) : (
            <>
              {typeof data === 'number' && (
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                      main ? 'text-4xl' : ''
                    }`}
                  >
                    {data.toLocaleString()}
                  </span>
                </div>
              )}

              {typeof data === 'boolean' && (
                <div className="py-1">
                  <Badge
                    variant="outline"
                    className={`px-3 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 border ${
                      data
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                        : 'bg-destructive/10 text-destructive border-destructive/20'
                    }`}
                  >
                    {data ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" /> Inactive
                      </>
                    )}
                  </Badge>
                </div>
              )}

              {percentage !== undefined && days !== undefined && (
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <span
                    className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md ${
                      bgColour
                        ? isPositive
                          ? 'bg-white/20 text-white'
                          : 'bg-red-500/30 text-white'
                        : isPositive
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-destructive/10 text-destructive'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {isPositive ? '+' : ''}
                    {percentage}%
                  </span>
                  <span
                    className={`text-[11px] ${
                      bgColour ? 'text-white/70' : 'text-muted-foreground'
                    }`}
                  >
                    vs last {days}d
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {chartData.length > 0 && !isLoading && !isError && (
          <div className="w-24 h-11 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={bgColour ? '#ffffff' : '#6366f1'}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MetricCard;