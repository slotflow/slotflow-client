import DataShimmer from '../shimmers/DataShimmer';
import { DashboardDataCardProps } from '@/shared/types/common';
import { formatNumberToPrice } from '@/shared/utils/helper/formatter';

const DashboardDataCard = ({
  label,
  icon: Icon,
  value,
  status = 'normal',
  price = false,
  suffix = '',
  isLoading = false,
}: DashboardDataCardProps) => {
  const isVerified = status === true || status === 'verified';
  const isUnverified = status === false || status === 'unverified';

  const formattedValue = () => {
    if (value === undefined || value === null) {
      if (isVerified) return 'Verified';
      if (isUnverified) return 'Unverified';
      return 'N/A';
    }

    if (price) {
      const numericVal = typeof value === 'string' ? parseFloat(value) : value;
      return isNaN(numericVal) ? value : formatNumberToPrice(numericVal);
    }

    return value;
  };

  const statusStyles = isVerified
    ? 'text-emerald-600 dark:text-emerald-400 font-semibold text-lg'
    : isUnverified
      ? 'text-rose-600 dark:text-rose-400 font-semibold text-lg'
      : 'text-slate-900 dark:text-slate-50 font-bold text-2xl';

  return (
    <div className="p-5 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/20 shadow-sm space-y-2">
      <div className="flex items-center justify-between text-xs font-medium text-slate-500">
        <span>{label}</span>
        <Icon className="w-4 h-4 text-slate-400" />
      </div>

      <div className="tracking-tight">
        {isLoading ? (
          <DataShimmer w="w-20" h="h-7" />
        ) : (
          <span className={`flex items-baseline gap-1 ${statusStyles}`}>
            {formattedValue()}
            {suffix && <span className="text-xs font-normal text-slate-500">{suffix}</span>}
          </span>
        )}
      </div>
    </div>
  );
};

export default DashboardDataCard;
