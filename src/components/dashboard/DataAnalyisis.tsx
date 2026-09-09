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
    <div className="rounded-md relative group overflow-hidden bg-gradient-to-br from-indigo-950/90 via-slate-900 to-zinc-950 p-6 text-white border border-indigo-500/20 shadow-xl flex flex-col justify-between h-full min-h-[180px]">
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none group-hover:bg-indigo-500/30 transition-all duration-500" />

      <div>
        <div className="flex items-center justify-between mb-3 gap-2">
          {badgeText && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <BadgeIcon className="w-3.5 h-3.5" />
              <span>{badgeText}</span>
            </div>
          )}

          {isLoading && (
            <div className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-md text-indigo-300 bg-indigo-500/10 border border-indigo-500/20">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Analyzing...</span>
            </div>
          )}

          {isError && (
            <div className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md text-rose-400 bg-rose-500/10 border border-rose-500/20">
              <AlertCircle className="w-3 h-3" />
              <span>Failed to fetch AI insights</span>
            </div>
          )}

          {aiInsightText && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              <span>AI generated response</span>
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold tracking-tight text-white mb-3">{title}</h3>

        {isLoading && (
          <div className="space-y-2 mt-4 animate-pulse">
            <div className="h-3.5 bg-indigo-500/20 rounded w-full"></div>
            <div className="h-3.5 bg-indigo-500/20 rounded w-11/12"></div>
            <div className="h-3.5 bg-indigo-500/20 rounded w-4/5"></div>
          </div>
        )}

        {aiInsightText && (
          <div className="mt-3 text-sm text-slate-300 leading-relaxed font-normal whitespace-pre-line bg-indigo-950/40 border border-indigo-500/10 rounded-lg p-3.5 backdrop-blur-sm">
            <p>{aiInsightText}</p>
          </div>
        )}

        {!isLoading && !isError && !aiInsightText && (
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 italic">
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>No AI analysis available for this selection.</span>
          </div>
        )}
      </div>

      {isError && (
        <p className="text-xs text-rose-400/80 mt-4 bg-rose-500/10 p-2.5 rounded border border-rose-500/20">
          {error?.message || 'An error occurred while generating insights.'}
        </p>
      )}
    </div>
  );
};

export default DataAnalysis;
