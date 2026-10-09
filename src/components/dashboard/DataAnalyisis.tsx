import { useQuery } from '@tanstack/react-query';
import { DataAnalysisProps } from '@/shared/types/component';
import { Sparkles, Loader2, AlertCircle, Bot } from 'lucide-react';

const DataAnalysis = ({
  badgeText = 'Growth Insights',
  badgeIcon: BadgeIcon = Sparkles,
  title,
  queryKey,
  fetchFn,
}: DataAnalysisProps) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: fetchFn,
  });

  const aiInsightText = data?.data?.aiResponse;

  return (
    <div className="relative group overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-indigo-500/10 dark:from-indigo-950/50 dark:via-indigo-900/20 dark:to-zinc-950/80 text-foreground p-6 shadow-lg shadow-indigo-500/5 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-400/50 transition-all duration-300 flex flex-col justify-between h-full min-h-[180px]">
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-44 h-44 rounded-full bg-indigo-500/20 dark:bg-indigo-500/25 blur-3xl pointer-events-none group-hover:bg-indigo-400/30 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-36 h-36 rounded-full bg-indigo-400/10 dark:bg-indigo-400/15 blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
          {badgeText && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 shadow-sm backdrop-blur-md">
              <BadgeIcon className="w-3.5 h-3.5 shrink-0 text-indigo-600 dark:text-indigo-300 animate-pulse" />
              <span>{badgeText}</span>
            </div>
          )}

          {isLoading && (
            <div className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md text-indigo-700 dark:text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md">
              <Loader2 className="w-3 h-3 animate-spin shrink-0 text-indigo-500 dark:text-indigo-400" />
              <span>Analyzing...</span>
            </div>
          )}

          {isError && (
            <div className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md text-destructive bg-destructive/10 border border-destructive/20">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>Failed to fetch AI insights</span>
            </div>
          )}

          {aiInsightText && !isLoading && !isError && (
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-md text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-md">
              <span>AI generated response</span>
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold tracking-tight text-foreground mb-3 flex items-center gap-2">
          {title}
        </h3>

        {isLoading && (
          <div className="space-y-2.5 mt-4 animate-pulse">
            <div className="h-3.5 bg-indigo-500/20 dark:bg-indigo-400/20 rounded-md w-full"></div>
            <div className="h-3.5 bg-indigo-500/20 dark:bg-indigo-400/20 rounded-md w-11/12"></div>
            <div className="h-3.5 bg-indigo-500/20 dark:bg-indigo-400/20 rounded-md w-4/5"></div>
          </div>
        )}

        {aiInsightText && !isLoading && !isError && (
          <div className="mt-3 text-sm text-foreground/90 leading-relaxed font-normal whitespace-pre-line bg-background/70 dark:bg-indigo-950/40 border border-indigo-500/20 dark:border-indigo-500/30 rounded-xl p-4 backdrop-blur-md shadow-inner">
            <p>{aiInsightText}</p>
          </div>
        )}

        {!isLoading && !isError && !aiInsightText && (
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground italic bg-background/50 dark:bg-indigo-950/30 p-3 rounded-xl border border-indigo-500/15 backdrop-blur-sm">
            <Bot className="size-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
            <span>No AI analysis available for this selection.</span>
          </div>
        )}
      </div>

      {isError && (
        <p className="relative z-10 text-xs text-destructive mt-4 bg-destructive/10 p-3 rounded-xl border border-destructive/20">
          {error?.message || 'An error occurred while generating insights.'}
        </p>
      )}
    </div>
  );
};

export default DataAnalysis;
