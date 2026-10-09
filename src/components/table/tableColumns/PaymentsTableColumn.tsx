import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Eye } from 'lucide-react';
import { Payment } from '@/shared/types/entity/payment';
import StatusBadge from '@/components/common/StatusBadge';
import { PaymentFor, PaymentStatus } from '@/shared/types/enums';
import { DataTableColumnHeader } from '../DataTableColumnHeader';
import { FetchPaymentsResponse } from '@/shared/types/api/payment';
import { formatDate } from '@/shared/utils/helper/formatDate';
import { formatNumberToPrice } from '@/shared/utils/helper/formatNumberToPrice';
import { formatString } from '@/shared/utils/helper/formatString';

const PaymentsTableColumn = (
  toPaymentDetailsPage: (paymentId: Payment['_id'], replace?: boolean) => void,
): ColumnDef<FetchPaymentsResponse>[] => [
  {
    accessorKey: 'slNo',
    header: 'Sl No',
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground font-medium">
        {String(row.index + 1).padStart(2, '0')}
      </span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Paid on" />,
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt') as Date;
      const formattedDate = formatDate(createdAt);
      return (
        <span className="font-medium text-slate-700 dark:text-slate-300">{formattedDate}</span>
      );
    },
  },
  {
    accessorKey: 'totalAmount',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }) => {
      const amount = row.original.totalAmount;
      return (
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          {formatNumberToPrice(amount) || amount}
        </span>
      );
    },
  },
  {
    accessorKey: 'discountAmount',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Discount" />,
    cell: ({ row }) => {
      const disAmount = row.original.discountAmount;
      return (
        <span className="font-medium text-amber-600 dark:text-amber-400">
          {formatNumberToPrice(disAmount) || disAmount}
        </span>
      );
    },
  },
  {
    accessorKey: 'paymentFor',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => {
      const paymentFor = row.original.paymentFor;
      switch (paymentFor) {
        case PaymentFor.SUBSCRIPTION:
          return <StatusBadge type="pending" label="Provider Subscription" />;
        case PaymentFor.APPOINTMENT_BOOKING:
          return <StatusBadge type="active" label="Appointment Booking" />;
        case PaymentFor.PROVIDER_PAYOUT:
          return <StatusBadge type="blocked" label="Provider Payout" />;
        case PaymentFor.CANCEL_BOOKING:
          return <StatusBadge type="updating" label="Cancel Booking" />;
        default:
          return <StatusBadge type="standard" label={paymentFor} />;
      }
    },
  },
  {
    accessorKey: 'paymentStatus',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.paymentStatus;
      const label = formatString(status);
      switch (status) {
        case PaymentStatus.PAID:
          return <StatusBadge type="verified" label={label} />;
        case PaymentStatus.PENDING:
          return <StatusBadge type="pending" label={label} />;
        case PaymentStatus.FAILED:
          return <StatusBadge type="blocked" label={label} />;
        case PaymentStatus.CANCELLED:
          return <StatusBadge type="blocked" label={label} />;
        case PaymentStatus.REFUNDED:
          return <StatusBadge type="updating" label={label} />;
        default:
          return <StatusBadge type="standard" label={status} />;
      }
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              title="Open Menu"
              variant="ghost"
              className="h-8 w-8 p-0 cursor-pointer hover:bg-muted"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => toPaymentDetailsPage(payment._id)}
              className="cursor-pointer gap-2"
            >
              <Eye className="w-3.5 h-3.5 text-muted-foreground" />
              Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default PaymentsTableColumn;
