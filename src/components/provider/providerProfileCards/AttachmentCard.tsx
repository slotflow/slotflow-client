import DataField from '@/components/app/DataField';
import { FileText, ChevronRight } from 'lucide-react';
import { AttachmentCardProps } from '@/shared/types/component';
import DataFetchingError from '@/components/error/DataFetchingError';
import DataFieldShimmer from '@/components/shimmers/DataFieldShimmer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AttachmentCard = ({ isLoading, isError, data }: AttachmentCardProps) => {

  return (
    <Card className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <FileText className="size-5 text-primary" />
          Attachments & Portfolio
        </CardTitle>
        <CardDescription>Resources, guidelines, and direct project showcase links</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <DataFieldShimmer row={2} />
        ) : isError ? (
          <DataFetchingError message="Attachments fetching error" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* {data.portfolioUrl && ( */}
              <DataField
                label="Portfolio Link"
                value={data?.portfolioUrl}
                Icon={ChevronRight}
                link
              />
            {/* )} */}

            {/* {data.demoVideoUrl && ( */}
              <DataField
                label="Demo video Link"
                value={data?.demoVideoUrl}
                Icon={ChevronRight}
                link
              />
            {/* )} */}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttachmentCard;
