import { ColumnDef } from '@tanstack/react-table';
import StatusBadge from '@/components/common/StatusBadge';
import { DataTableColumnHeader } from '../DataTableColumnHeader';
import { PaymentFor, PaymentGateway } from '@/shared/types/enums';
import { AdminFetchRevenueReportRow } from '@/shared/types/api/payment';
import { formateDate, formatNumberToPrice } from '@/shared/utils/helper/formatter';

const AdminRevenueTableColumn = (): ColumnDef<AdminFetchRevenueReportRow>[] => [
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
      const formattedDate = formateDate(createdAt);
      return <span className="font-medium text-slate-700 dark:text-slate-300">{formattedDate}</span>;
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
    accessorKey: 'paymentGateway',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Gateway" />,
    cell: ({ row }) => {
      const paymentGateway = row.original.paymentGateway;
      switch (paymentGateway) {
        case PaymentGateway.STRIPE:
          return <StatusBadge type="verified" label="Stripe" />;
        case PaymentGateway.RAZORPAY:
          return <StatusBadge type="active" label="Razorpay" />;
        case PaymentGateway.PAYPAL:
          return <StatusBadge type="pending" label="PayPal" />;
        default:
          return <StatusBadge type="standard" label={paymentGateway} />;
      }
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
    accessorKey: 'initialAmount',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => {
      const initAmount = row.original.initialAmount;
      return (
        <span className="font-medium text-blue-600 dark:text-blue-400">
          {formatNumberToPrice(initAmount) || initAmount}
        </span>
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
];

export default AdminRevenueTableColumn;