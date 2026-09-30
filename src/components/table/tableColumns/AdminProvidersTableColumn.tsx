import {
  X,
  Ban,
  Check,
  Award,
  ShieldX,
  ReceiptText,
  CheckCircle2,
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
import { Button } from '../../ui/button';
import {
  AdminApproveProviderRequest,
  AdminFetchAllProvidersResponse,
  AdminChangeProviderTrustTagRequest,
  AdminChangeProviderBlockStatusRequest,
} from '@/shared/types/api/providerProfile';
import { User } from '@/shared/types/entity/user';
import { ColumnDef } from '@tanstack/react-table';
import StatusBadge from '@/components/common/StatusBadge';
import { AdminVerificationStatus } from '@/shared/types/enums';
import { DataTableColumnHeader } from '../DataTableColumnHeader';
import { adminVerificationStatusConfig } from '@/shared/utils/constants/statusConstants';

const AdminProvidersTableColumns = (
  approveProvider: (data: AdminApproveProviderRequest) => void,
  approvingProviderId: string | null | undefined,
  changeProviderBlockStatus: (data: AdminChangeProviderBlockStatusRequest) => void,
  changeBlockStatusProviderId: string | null | undefined,
  changeProviderSlotflowTrustTag: (data: AdminChangeProviderTrustTagRequest) => void,
  changeTrustTagProviderId: string | null | undefined,
  toProviderDetailsPage: (providerId: User['_id'], replace?: boolean) => void,
  handleProviderRejectOpen: (data: { providerId: User['_id'] }) => void,
): ColumnDef<AdminFetchAllProvidersResponse>[] => [
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
    accessorKey: 'username',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
    cell: ({ row }) => (
      <span className="font-semibold text-slate-900 dark:text-slate-100">
        {row.original.username}
      </span>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => (
      <span className="font-medium text-slate-600 dark:text-slate-400 text-xs">
        {row.original.email}
      </span>
    ),
  },
  {
    accessorKey: 'isBlocked',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Account Status" />,
    cell: ({ row }) => {
      const isBlocked = row.original.isBlocked;
      const isThisRowUpdating = changeBlockStatusProviderId === row.original._id;

      if (isThisRowUpdating) {
        return <StatusBadge type="updating" />;
      }

      return !isBlocked ? <StatusBadge type="active" /> : <StatusBadge type="blocked" />;
    },
  },
  {
    accessorKey: 'isAdminVerified',
    header: 'Admin Verification',
    cell: ({ row }) => {
      const isVerified = row.original.isAdminVerified;
      const isThisRowUpdating = approvingProviderId === row.original._id;

      if (isThisRowUpdating) {
        return <StatusBadge type="updating" />;
      }

      return isVerified ? <StatusBadge type="verified" /> : <StatusBadge type="pending" />;
    },
  },
  {
    accessorKey: 'adminVerificationStatus',
    header: 'Verification Status',
    cell: ({ row }) => {
      const status = row.original.adminVerificationStatus;
      const config = adminVerificationStatusConfig[status];
      const isThisRowUpdating = approvingProviderId === row.original._id;

      if (isThisRowUpdating) {
        return <StatusBadge type="updating" />;
      }

      return <StatusBadge type={config.type} label={config.label} />;
    },
  },
  {
    accessorKey: 'trustedBySlotflow',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Slotflow Trusted" />,
    cell: ({ row }) => {
      const isTrusted = row.original.trustedBySlotflow;
      const isThisRowUpdating = changeTrustTagProviderId === row.original._id;

      if (isThisRowUpdating) {
        return <StatusBadge type="updating" />;
      }

      return isTrusted ? (
        <StatusBadge type="verified" label="Trusted" />
      ) : (
        <StatusBadge type="standard" label="Standard" />
      );
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const provider = row.original;
      const canApproveOrReject =
        !provider.isAdminVerified &&
        (provider.adminVerificationStatus === AdminVerificationStatus.REQUESTED ||
          provider.adminVerificationStatus === AdminVerificationStatus.RESUBMITTED ||
          provider.adminVerificationStatus === AdminVerificationStatus.UNDER_REVIEW);

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
              onClick={() => toProviderDetailsPage(provider._id)}
              className="cursor-pointer"
            >
              <ReceiptText className="w-3.5 h-3.5" />
              Details
            </DropdownMenuItem>

            {canApproveOrReject && (
              <>
                <DropdownMenuItem
                  onClick={() => approveProvider({ providerId: provider._id })}
                  className="cursor-pointer text-emerald-600 focus:text-emerald-600"
                >
                  <Check className="w-3.5 h-3.5" />
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleProviderRejectOpen({ providerId: provider._id })}
                  className="cursor-pointer text-rose-600 focus:text-rose-600"
                >
                  <X className="w-3.5 h-3.5" />
                  Reject
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuItem
              onClick={() =>
                changeProviderBlockStatus({
                  isBlocked: !provider.isBlocked,
                  providerId: provider._id,
                })
              }
              className="cursor-pointer"
            >
              {provider.isBlocked ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <Ban className="w-3.5 h-3.5" />
              )}
              {provider.isBlocked ? 'Unblock' : 'Block'}
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                changeProviderSlotflowTrustTag({
                  providerId: provider._id,
                  trustedBySlotflow: !provider.trustedBySlotflow,
                })
              }
              className="cursor-pointer"
            >
              {provider.trustedBySlotflow ? (
                <ShieldX className="w-3.5 h-3.5 text-rose-500" />
              ) : (
                <Award className="w-3.5 h-3.5 text-blue-500" />
              )}
              {provider.trustedBySlotflow ? 'Remove Trust Tag' : 'Give Trust Tag'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default AdminProvidersTableColumns;
