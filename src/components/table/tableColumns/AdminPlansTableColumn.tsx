import {
  X,
  Ban,
  Check,
  Edit,
  RefreshCw,
  CircleCheck,
  ReceiptText,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '../../ui/dropdown-menu';
import {
  ResyncPlanStripeRequest,
  AdminFetchAllPlansResponse,
  ChangePlanBlockStatusRequest,
} from '@/shared/types/api/plan';
import { Button } from '../../ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { StripeSyncStatus } from '@/shared/types/enums';
import StatusBadge from '@/components/common/StatusBadge';
import { Plan } from '@/shared/types/entity/planInterface';
import { DataTableColumnHeader } from '../DataTableColumnHeader';
import { formatString } from '@/shared/utils/helper/formatString';
import { formatNumberToPrice } from '@/shared/utils/helper/formatNumberToPrice';

const AdminPlansTableColumns = (
  changePlanBlockStatus: (data: ChangePlanBlockStatusRequest) => void,
  resyncPlanWithStripe: (data: ResyncPlanStripeRequest) => void,
  toPlanDetailsPage: (planId: Plan['_id'], replace?: boolean) => void,
  handleOpenPlanEditForm: (planId: string) => void,
  changeBlockStatusPlanId: string | null | undefined,
  resyncingPlanId: string | null | undefined,
): ColumnDef<AdminFetchAllPlansResponse>[] => [
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
        {formatString(row.original.planName)}
      </span>
    ),
  },
  {
    accessorKey: 'maxBookingPerMonth',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Max Booking" />,
    cell: ({ row }) => (
      <StatusBadge type="standard" label={`${row.original.maxBookingPerMonth} / mo`} />
    ),
  },
  {
    accessorKey: 'adVisibility',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ad Visibility" />,
    cell: ({ row }) => {
      const adVisibility = row.original.adVisibility;
      return adVisibility ? (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        </span>
      ) : (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-500 dark:text-rose-400">
          <X className="w-3.5 h-3.5 stroke-[2.5]" />
        </span>
      );
    },
  },
  {
    accessorKey: 'monthlyPrice',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Monthly Price" />,
    cell: ({ row }) => {
      const amount = row.original.monthlyPrice;
      return (
        <span className="font-medium text-slate-700 dark:text-slate-300">
          {formatNumberToPrice(amount) || amount}
        </span>
      );
    },
  },
  {
    accessorKey: 'yearlyPrice',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Yearly Price" />,
    cell: ({ row }) => {
      const amount = row.original.yearlyPrice;
      return (
        <span className="font-medium text-slate-700 dark:text-slate-300">
          {formatNumberToPrice(amount) || amount}
        </span>
      );
    },
  },
  {
    accessorKey: 'isBlocked',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const isBlocked = row.original.isBlocked;
      const isThisRowUpdating = changeBlockStatusPlanId === row.original._id;

      if (isThisRowUpdating) {
        return <StatusBadge type="updating" label="Updating" />;
      }

      return !isBlocked ? <StatusBadge type="active" /> : <StatusBadge type="blocked" />;
    },
  },
  {
    accessorKey: 'stripeSync',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Stripe Sync" />,
    cell: ({ row }) => {
      const syncStatus = row.original.stripeSync;
      const isThisRowResyncing = resyncingPlanId === row.original._id;

      if (isThisRowResyncing) {
        return <StatusBadge type="updating" label="Syncing" />;
      }

      return syncStatus === StripeSyncStatus.SYNCED ? (
        <StatusBadge type="verified" label="Synced" />
      ) : (
        <StatusBadge type="verified" />
      );
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const plan = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button title="Open Menu" variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                changePlanBlockStatus({ isBlocked: !plan.isBlocked, planId: plan._id })
              }
            >
              {plan.isBlocked ? (
                <CircleCheck className="w-3.5 h-3.5" />
              ) : (
                <Ban className="w-3.5 h-3.5" />
              )}
              {plan.isBlocked ? 'Unblock' : 'Block'}
            </DropdownMenuItem>
            {plan.stripeSync === StripeSyncStatus.PENDING && (
              <DropdownMenuItem onClick={() => resyncPlanWithStripe({ planId: plan._id })}>
                <RefreshCw className="w-3.5 h-3.5" /> Sync
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => handleOpenPlanEditForm(plan._id)}>
              <Edit className="w-3.5 h-3.5" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toPlanDetailsPage(plan._id)}>
              <ReceiptText className="w-3.5 h-3.5" />
              Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default AdminPlansTableColumns;
