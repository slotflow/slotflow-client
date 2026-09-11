import {
  CreditTransactionType,
  CreditTransactionSource,
  CreditTransactionStatus,
} from '@/shared/types/enums';
import { ColumnDef } from '@tanstack/react-table';
import StatusBadge from '@/components/common/StatusBadge';
import { DataTableColumnHeader } from '../DataTableColumnHeader';
import { FetchCreditTransactionsResponse } from '@/shared/types/api/credit';

const CreditTransactionTableColumn = (): ColumnDef<FetchCreditTransactionsResponse>[] => [
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
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const type = row.original.type;
      switch (type) {
        case CreditTransactionType.CREDIT:
          return <StatusBadge type="verified" label="Credit" />;
        case CreditTransactionType.DEBIT:
          return <StatusBadge type="blocked" label="Debit" />;
        default:
          return <StatusBadge type="standard" label={type} />;
      }
    },
  },
  {
    accessorKey: 'credits',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Credits" />,
    cell: ({ row }) => {
      const credits = row.original.credits;
      const isCredit = row.original.type === CreditTransactionType.CREDIT;
      return (
        <span
          className={`font-semibold ${
            isCredit
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-rose-600 dark:text-rose-400'
          }`}
        >
          {isCredit ? `+${credits}` : `-${credits}`}
        </span>
      );
    },
  },
  {
    accessorKey: 'balanceAfter',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Balance" />,
    cell: ({ row }) => {
      const balanceAfter = row.original.balanceAfter;
      return (
        <span className="font-medium text-slate-700 dark:text-slate-300">
          {balanceAfter}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      switch (status) {
        case CreditTransactionStatus.SUCCESS:
          return <StatusBadge type="verified" label="Success" />;
        case CreditTransactionStatus.FAILED:
          return <StatusBadge type="blocked" label="Failed" />;
        default:
          return <StatusBadge type="standard" label={status} />;
      }
    },
  },
  {
    accessorKey: 'source',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Source" />,
    cell: ({ row }) => {
      const source = row.original.source;
      switch (source) {
        case CreditTransactionSource.ADMIN:
          return <StatusBadge type="standard" label="Admin" />;
        case CreditTransactionSource.BOOKING_DISCOUNT:
          return <StatusBadge type="active" label="Booking Discount" />;
        case CreditTransactionSource.PROMOTION:
          return <StatusBadge type="verified" label="Promotion" />;
        case CreditTransactionSource.REFERRAL:
          return <StatusBadge type="pending" label="Referral" />;
        case CreditTransactionSource.SUBSCRIPTION_DISCOUNT:
          return <StatusBadge type="updating" label="Subscription Discount" />;
        default:
          return <StatusBadge type="standard" label={source} />;
      }
    },
  },
];

export default CreditTransactionTableColumn;