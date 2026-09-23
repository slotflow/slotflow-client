import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table';
import { Briefcase } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/utils/constants';
import { formatDate } from '@/shared/utils/helper/formatDate';
import { fetchSubscriptions } from '@/services/apis/subscription';
import RecentActivityTableCard from '@/components/dashboard/RecentActivityTableCard';

const SubscriptionsListCard = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [queryKeys.LATEST_PROVIDERS],
    queryFn: () => fetchSubscriptions({ limit: 5, sortBy: 'createdAt', sortOrder: 'desc' }),
  });

  const subscriptions = data?.items || [];

  return (
    <RecentActivityTableCard
      title="Latest Subscriprions"
      icon={Briefcase}
      isLoading={isLoading}
      isError={isError}
      onReload={refetch}
      empty={subscriptions.length === 0}
      emptyMessage="No subscription found"
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-[10px] uppercase font-bold tracking-wider py-3 px-4">
                #
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider py-3 px-4">
                Plan
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider py-3 px-4">
                Status
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider py-3 px-4">
                Exoires at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((provider, index) => (
              <TableRow
                key={provider._id}
                className="hover:bg-slate-50/30 dark:hover:bg-slate-900/30 border-slate-100 dark:border-slate-800 transition-colors"
              >
                <TableCell className="text-xs font-medium text-slate-400 py-3 px-4">
                  {index + 1}
                </TableCell>
                <TableCell className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[120px]">
                      {provider.planName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-slate-500 dark:text-slate-400 py-3 px-4 truncate max-w-[150px]">
                  {provider.subscriptionStatus}
                </TableCell>
                <TableCell className="text-xs text-slate-500 dark:text-slate-400 py-3 px-4 truncate max-w-[150px]">
                  {formatDate(provider.endDate)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </RecentActivityTableCard>
  );
};

export default SubscriptionsListCard;
