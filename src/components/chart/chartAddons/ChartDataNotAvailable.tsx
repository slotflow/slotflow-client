import { AlertCircle } from 'lucide-react';

const ChartDataNotAvailable = () => {
  return (
    <div className="flex min-h-[250px] w-full flex-col items-center justify-center text-center">
      <AlertCircle className="mb-3 h-8 w-8 text-muted-foreground" />

      <h2 className="text-lg font-semibold text-foreground">No Data Available</h2>

      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        We couldn’t find any data to display. Once your account is active with operations, this
        chart will update.
      </p>
    </div>
  );
};

export default ChartDataNotAvailable;
