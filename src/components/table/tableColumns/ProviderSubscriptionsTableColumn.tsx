import {
  Clock,
  XCircle,
  Calendar,
  AlertCircle,
  ReceiptText,
  AlertTriangle,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../../ui/dropdown-menu';
import { Button } from '../../ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { SubscriptionStatus } from '@/shared/types/enums';
import { formateDate } from '@/shared/utils/helper/formatter';
import { DataTableColumnHeader } from '../DataTableColumnHeader';
import { Subscription } from '@/shared/types/entity/subscription';
import { FetchProviderSubscriptionsResponse } from '@/shared/types/api/subscription';

// For admin side view and provider side view of provider subscriptions
const ProvidersSubscriptionsTableColumns = (
  handleAdminGetProviderDetailPage: (subscriptionId: Subscription['_id']) => void,
): ColumnDef<FetchProviderSubscriptionsResponse>[] => [
  {
    accessorKey: 'slNo',
    header: 'Sl No',
    cell: ({ row }) => (
      <span className="font-mono text-xs text-slate-500 font-medium">
        {String(row.index + 1).padStart(2, '0')}
      </span>
    ),
  },
  {
    accessorKey: 'planName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Plan" />,
    cell: ({ row }) => (
      <span className="font-semibold text-slate-900 dark:text-slate-100">
        {row.original.planName}
      </span>
    ),
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Start Date" />,
    cell: ({ row }) => {
      const startDate = row.getValue('startDate') as Date;
      const formattedDate = formateDate(startDate);
      return (
        <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 text-xs">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          {formattedDate}
        </span>
      );
    },
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Expires on" />,
    cell: ({ row }) => {
      const endDate = row.getValue('endDate') as Date;
      const formattedDate = formateDate(endDate);
      return (
        <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 text-xs">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          {formattedDate}
        </span>
      );
    },
  },
  {
    accessorKey: 'subscriptionStatus',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const subscriptionStatus = row.original.subscriptionStatus;

      switch (subscriptionStatus) {
        case SubscriptionStatus.ACTIVE:
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          );
        case SubscriptionStatus.EXPIRED:
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
              <Clock className="w-3 h-3 text-slate-500" />
              Expired
            </span>
          );
        case SubscriptionStatus.CANCELLED:
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800">
              <XCircle className="w-3 h-3 text-rose-500" />
              Cancelled
            </span>
          );
        case SubscriptionStatus.PENDING:
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              Pending
            </span>
          );
        case SubscriptionStatus.PAST_DUE:
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800">
              <AlertTriangle className="w-3 h-3 text-orange-500" />
              Past Due
            </span>
          );
        case SubscriptionStatus.FAILED:
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800">
              <AlertCircle className="w-3 h-3 text-rose-500" />
              Failed
            </span>
          );
        default:
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              {subscriptionStatus}
            </span>
          );
      }
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const subscription = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button title="Open Menu" variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleAdminGetProviderDetailPage(subscription._id)}
              className="cursor-pointer"
            >
              <ReceiptText className="w-3.5 h-3.5" />
              Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default ProvidersSubscriptionsTableColumns;
