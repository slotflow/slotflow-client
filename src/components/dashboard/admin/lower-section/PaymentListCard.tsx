import React from 'react';
import { format } from 'date-fns';
import { DollarSign } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchPayments } from '@/shared/apis/payment';
import DashboardDataCard from '../../DashboardDataCard';
import { formatNumberToPrice } from '@/shared/helper/formatter';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const PaymentListCard: React.FC = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-latest-payments'],
    queryFn: () => fetchPayments({ limit: 5, sortBy: 'createdAt', sortOrder: 'desc' }),
  });

  const payments = data?.items || [];

  return (
    <DashboardDataCard
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
          <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
            <TableRow>
              <TableHead className="w-[60px] text-[10px] uppercase font-bold tracking-wider py-3 px-4">#</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider py-3 px-4">Payment For</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider py-3 px-4">Amount</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider py-3 px-4 text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment, index) => (
              <TableRow key={payment._id} className="hover:bg-slate-50/30 dark:hover:bg-slate-900/30 border-slate-100 dark:border-slate-800 transition-colors">
                <TableCell className="text-xs font-medium text-slate-400 py-3 px-4">{index + 1}</TableCell>
                <TableCell className="py-3 px-4">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {payment.paymentFor}
                  </span>
                </TableCell>
                <TableCell className="text-xs font-bold text-emerald-600 dark:text-emerald-400 py-3 px-4">
                  {formatNumberToPrice(payment.totalAmount)}
                </TableCell>
                <TableCell className="text-[10px] text-slate-400 py-3 px-4 text-right">
                  {format(new Date(payment.createdAt), 'MMM dd, HH:mm')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardDataCard>
  );
};

export default PaymentListCard;
