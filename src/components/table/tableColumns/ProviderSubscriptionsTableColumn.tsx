import { Calendar, ReceiptText, MoreHorizontal } from 'lucide-react';
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
import StatusBadge from '@/components/common/StatusBadge';
import { SubscriptionStatus } from '@/shared/types/enums';
import { formatDate } from '@/shared/utils/helper/formatDate';
import { DataTableColumnHeader } from '../DataTableColumnHeader';
import { Subscription } from '@/shared/types/entity/subscription';
import { formatString } from '@/shared/utils/helper/formatString';
import { FetchProviderSubscriptionsResponse } from '@/shared/types/api/subscription';

const ProvidersSubscriptionsTableColumns = (
  toSubscriptionDetailsPage: (subscriptionId: Subscription['_id'], replace?: boolean) => void,
): ColumnDef<FetchProviderSubscriptionsResponse>[] => [
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
    accessorKey: 'planName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Plan" />,
    cell: ({ row }) => (
      <span className="font-semibold text-slate-900 dark:text-slate-100">
        {row.original.planName}
      </span>
    ),
  },
  {
    accessorKey: 'currentPeriodStart',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Start Date" />,
    cell: ({ row }) => {
      const currentPeriodStart = row.getValue('currentPeriodStart') as Date;
      const formattedDate = formatDate(currentPeriodStart);
      return (
        <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 text-xs">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          {formattedDate}
        </span>
      );
    },
  },
  {
    accessorKey: 'currentPeriodEnd',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Expires on" />,
    cell: ({ row }) => {
      const currentPeriodEnd = row.getValue('currentPeriodEnd') as Date;
      const formattedDate = formatDate(currentPeriodEnd);
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
      const label = formatString(subscriptionStatus);
      switch (subscriptionStatus) {
        case SubscriptionStatus.ACTIVE:
          return <StatusBadge type="active" label={label} />;
        case SubscriptionStatus.EXPIRED:
          return <StatusBadge type="standard" label={label} />;
        case SubscriptionStatus.CANCELLED:
          return <StatusBadge type="blocked" label={label} />;
        case SubscriptionStatus.INCOMPLETE:
          return <StatusBadge type="pending" label={label} />;
        case SubscriptionStatus.PAST_DUE:
          return <StatusBadge type="blocked" label={label} />;
        default:
          return <StatusBadge type="standard" label={subscriptionStatus} />;
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
              onClick={() => toSubscriptionDetailsPage(subscription._id)}
              className="cursor-pointer gap-2"
            >
              <ReceiptText className="w-3.5 h-3.5 text-muted-foreground" />
              Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default ProvidersSubscriptionsTableColumns;
