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
import { Check, MoreHorizontal, X } from 'lucide-react';
import { DataTableColumnHeader } from '../DataTableColumnHeader';
import { formatNumberToPrice } from '@/shared/utils/helper/formatter';
import { StripeSyncStatus } from '@/shared/types/entity/planInterface';
import {
  AdminFetchAllPlansResponse,
  ChangePlanBlockStatusRequest,
  ResyncPlanStripeRequest,
} from '@/shared/types/api/plan';

const AdminPlansTableColumns = (
  handleAdminChangePlanStatus: (data: ChangePlanBlockStatusRequest) => void,
  handleresyncPlanStripe: (data: ResyncPlanStripeRequest) => void,
  changeBlockStatusPlanId: string | null,
  resyncingPlanId: string | null,
): ColumnDef<AdminFetchAllPlansResponse>[] => [
  {
    accessorKey: 'slNo',
    header: 'Sl No',
    cell: ({ row }) => {
      return <span>{row.index + 1}</span>;
    },
  },
  {
    accessorKey: 'planName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Plan" />,
  },
  {
    accessorKey: 'maxBookingPerMonth',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Max Booking" />,
  },
  {
    accessorKey: 'adVisibility',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ad Visibility" />,
    cell: ({ row }) => {
      const adVisibility = row.original.adVisibility;
      if (adVisibility) {
        return (
          <span className="text-green-500 font-semibold">
            <Check />
          </span>
        );
      } else {
        return (
          <span className="text-red-500 font-semibold">
            <X />
          </span>
        );
      }
    },
  },
  {
    accessorKey: 'monthlyPrice',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Monthly Price" />,
    cell: ({ row }) => {
      const amount = row.original.monthlyPrice;
      return <span className="">{formatNumberToPrice(amount) || amount}</span>;
    },
  },
  {
    accessorKey: 'yearlyPrice',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Yearly Price" />,
    cell: ({ row }) => {
      const amount = row.original.yearlyPrice;
      return <span className="">{formatNumberToPrice(amount) || amount}</span>;
    },
  },
  {
    accessorKey: 'isBlocked',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const isBlocked = row.original.isBlocked;
      const isThisRowUpdating = changeBlockStatusPlanId === row.original._id;
      if (isThisRowUpdating) {
        return <span className="text-yellow-500 font-semibold animate-pulse">Updating...</span>;
      }
      if (!isBlocked) {
        return <span className="text-green-500 font-semibold">Active</span>;
      } else {
        return <span className="text-red-500 font-semibold">Blocked</span>;
      }
    },
  },
  {
    accessorKey: 'stripeSync',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Stripe sync" />,
    cell: ({ row }) => {
      const syncStatus = row.original.stripeSync;
      const isThisRowResyncing = resyncingPlanId === row.original._id;
      if (isThisRowResyncing) {
        return <span className="text-yellow-500 font-semibold animate-pulse">Syncing...</span>;
      }
      if (syncStatus === StripeSyncStatus.SYNCED) {
        return <span className="text-green-500 font-semibold">Synced</span>;
      } else {
        return <span className="text-red-500 font-semibold">Pending</span>;
      }
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
            <DropdownMenuItem>Details</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                handleAdminChangePlanStatus({ isBlocked: plan.isBlocked, planId: plan._id })
              }
            >
              {plan.isBlocked ? 'Unblock' : 'Block'}
            </DropdownMenuItem>
            {plan.stripeSync === StripeSyncStatus.PENDING && (
              <DropdownMenuItem onClick={() => handleresyncPlanStripe({ planId: plan._id })}>
                Sync
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default AdminPlansTableColumns;
