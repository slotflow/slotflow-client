import { Card, CardContent } from '@/components/ui/card';
import { ExperienceCardProps } from '@/shared/types/component';
import DataFetchingError from '@/components/error/DataFetchingError';

const ExperienceCard = ({ isLoading, isError, data }: ExperienceCardProps) => {
  return (
    <Card className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      <CardContent className="space-y-4">
        {isLoading ? (
          <>
            <div className="p-4 rounded-lg bg-muted/30 border border-muted flex items-center gap-3">
              <div className="w-10/12 shimmer h-8"></div>
            </div>
            <div className="w-ful shimmer h-2"></div>
            <div className="w-ful shimmer h-2"></div>
          </>
        ) : isError ? (
          <DataFetchingError message="No experience found" />
        ) : (
          data && (
            <>
              <div className="p-4 rounded-lg bg-muted/30 border border-muted flex items-center gap-3">
                <div className="text-3xl font-extrabold text-primary leading-none">10+</div>
                <p className="text-sm font-semibold text-foreground">
                  Years of Professional Experience
                </p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{data.description}</p>
            </>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;
