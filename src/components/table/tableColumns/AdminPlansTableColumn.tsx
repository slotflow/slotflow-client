import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '../../ui/dropdown-menu';
import { Button } from '../../ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../DataTableColumnHeader';
import {
  Ban,
  Check,
  CircleCheck,
  Edit,
  MoreHorizontal,
  ReceiptText,
  RefreshCw,
  X,
} from 'lucide-react';
import { formatNumberToPrice } from '@/shared/utils/helper/formatter';
import { Plan, StripeSyncStatus } from '@/shared/types/entity/planInterface';
import {
  ResyncPlanStripeRequest,
  AdminFetchAllPlansResponse,
  ChangePlanBlockStatusRequest,
} from '@/shared/types/api/plan';

const AdminPlansTableColumns = (
  handleAdminChangePlanStatus: (data: ChangePlanBlockStatusRequest) => void,
  handleresyncPlanStripe: (data: ResyncPlanStripeRequest) => void,
  handleNavigateToPlanDetailPage: (planId: Plan['_id']) => void,
  changeBlockStatusPlanId: string | null,
  resyncingPlanId: string | null,
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
        {row.original.planName}
      </span>
    ),
  },
  {
    accessorKey: 'maxBookingPerMonth',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Max Booking" />,
    cell: ({ row }) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
        {row.original.maxBookingPerMonth} / mo
      </span>
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
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
            Updating...
          </span>
        );
      }

      return !isBlocked ? (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Active
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          Blocked
        </span>
      );
    },
  },
  {
    accessorKey: 'stripeSync',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Stripe Sync" />,
    cell: ({ row }) => {
      const syncStatus = row.original.stripeSync;
      const isThisRowResyncing = resyncingPlanId === row.original._id;

      if (isThisRowResyncing) {
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Syncing...
          </span>
        );
      }

      return syncStatus === StripeSyncStatus.SYNCED ? (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
          <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />
          Synced
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800">
          <X className="w-3 h-3 text-rose-500 stroke-[3]" />
          Pending
        </span>
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
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                handleAdminChangePlanStatus({ isBlocked: plan.isBlocked, planId: plan._id })
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
              <DropdownMenuItem onClick={() => handleresyncPlanStripe({ planId: plan._id })}>
                <RefreshCw /> Sync
              </DropdownMenuItem>
            )}
            {/* // TODO implement */}
            <DropdownMenuItem>
              <Edit />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigateToPlanDetailPage(plan._id)}>
              <ReceiptText />
              Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default AdminPlansTableColumns;
