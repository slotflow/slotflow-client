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
import StatusBadge from '@/components/common/StatusBadge';
import { DataTableColumnHeader } from '../DataTableColumnHeader';
import { Ban, CircleCheck, Edit, MoreHorizontal } from 'lucide-react';
import { FetchServicesResponse, ChangeServiceBlockStatusRequest } from '@/shared/types/api/service';

const AdminAppServicesTableColumns = (
  changeServiceBlockStatus: (data: ChangeServiceBlockStatusRequest) => void,
  handleOpenServiceEditForm: (service: FetchServicesResponse) => void,
  changeBlockStatusServiceId: string | null,
): ColumnDef<FetchServicesResponse>[] => [
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
    accessorKey: 'serviceName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <span className="font-semibold text-slate-900 dark:text-slate-100">
        {row.original.serviceName}
      </span>
    ),
  },
  {
    accessorKey: 'serviceCategory',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => {
      const category = row.original.serviceCategory;
      return <StatusBadge type="normal" label={category} />;
    },
  },
  {
    accessorKey: 'isBlocked',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const isBlocked = row.original.isBlocked;
      const isThisRowUpdating = changeBlockStatusServiceId === row.original._id;

      if (isThisRowUpdating) {
        return <StatusBadge type="updating" />;
      }

      return !isBlocked ? <StatusBadge type="active" /> : <StatusBadge type="blocked" />;
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const service = row.original;
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
                changeServiceBlockStatus({
                  isBlocked: !service.isBlocked,
                  serviceId: service._id,
                })
              }
            >
              {service.isBlocked ? (
                <CircleCheck className="w-3.5 h-3.5" />
              ) : (
                <Ban className="w-3.5 h-3.5" />
              )}
              {service.isBlocked ? 'Unblock' : 'Block'}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleOpenServiceEditForm(service)}>
              <Edit className="w-3.5 h-3.5" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default AdminAppServicesTableColumns;
