import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IntegrationCardProps } from '@/shared/types/component';
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

const IntegrationCard = ({
  image,
  heading,
  description,
  action,
  title,
  text,
  show,
  connectionStatus,
  connectionText,
  isLoading,
}: IntegrationCardProps) => {
  return (
    <Card
      className={`w-full p-2 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-xs transition-all duration-200 hover:shadow-sm ${
        show ? 'flex' : 'hidden'
      }`}
    >
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 gap-4">
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          <div className="relative p-2 rounded-lg border border-slate-100 dark:border-border/60 bg-slate-50/50 dark:bg-muted/20 shrink-0">
            <img
              src={image}
              alt={heading}
              className="size-7 object-contain rounded-sm"
            />
          </div>

          <div className="min-w-0 flex-1 space-y-0.5">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold tracking-tight text-foreground truncate">
                {heading}
              </h4>

              <Badge
                variant={connectionStatus ? 'secondary' : 'outline'}
                className={`px-2 py-0.5 text-[10px] font-medium rounded-full flex items-center gap-1 shrink-0 ${
                  connectionStatus
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40'
                    : 'text-muted-foreground border-slate-200 dark:border-border'
                }`}
              >
                <span
                  className={`size-1 rounded-full ${
                    connectionStatus ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                  }`}
                />
                {connectionStatus ? 'Connected' : 'Not Connected'}
              </Badge>
            </div>

            <p className="text-xs text-muted-foreground truncate max-w-xl">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-border/40">
          {connectionStatus ? (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-4" />
              <span>{connectionText}</span>
            </div>
          ) : (
            <>
              {isLoading ? (
                <Button
                  disabled
                  size="sm"
                  variant='secondary'
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/30 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  <Loader2 className="size-3 animate-spin" />
                  <span>Connecting...</span>
                </Button>
              ) : (
                <Button
                  title={title}
                  size="sm"
                  onClick={(e) => action(e)}
                  variant='secondary'
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/30 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  <span>{text}</span>
                  <ArrowRight className="size-3 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default IntegrationCard;