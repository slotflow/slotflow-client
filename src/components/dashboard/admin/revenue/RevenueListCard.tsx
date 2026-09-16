import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table';
import { DollarSign } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/utils/constants';
import { fetchPayments } from '@/services/apis/payment';
import { formatDate, formatNumberToPrice } from '@/shared/utils/helper/formatter';
import RecentActivityTableCard from '@/components/dashboard/RecentActivityTableCard';

const RevenueListCard = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [queryKeys.LATEST_PAYMENTS],
    queryFn: () => fetchPayments({ limit: 5, sortBy: 'createdAt', sortOrder: 'desc' }),
  });

  const payments = data?.items || [];

  return (
    <RecentActivityTableCard
      title="Recent Payments"
      icon={DollarSign}
      isLoading={isLoading}
      isError={isError}
      onReload={refetch}
      empty={payments.length === 0}
      emptyMessage="No payments found"
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-[10px] uppercase font-bold tracking-wider py-3 px-4">
                #
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider py-3 px-4">
                Payment For
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider py-3 px-4">
                Amount
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider py-3 px-4 text-right">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment, index) => (
              <TableRow
                key={payment._id}
                className="hover:bg-slate-50/30 dark:hover:bg-slate-900/30 border-slate-100 dark:border-slate-800 transition-colors"
              >
                <TableCell className="text-xs font-medium text-slate-400 py-3 px-4">
                  {index + 1}
                </TableCell>
                <TableCell className="py-3 px-4">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {payment.paymentFor}
                  </span>
                </TableCell>
                <TableCell className="text-xs font-bold text-emerald-600 dark:text-emerald-400 py-3 px-4">
                  {formatNumberToPrice(payment.totalAmount)}
                </TableCell>
                <TableCell className="text-[10px] text-slate-400 py-3 px-4 text-right">
                  {formatDate(payment.createdAt.toDateString())}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </RecentActivityTableCard>
  );
};

export default RevenueListCard;
