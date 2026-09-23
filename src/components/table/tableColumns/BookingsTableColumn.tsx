import React from 'react';
import {
  ValidateRoomIdRequest,
  FetchBookingsResponse,
  ChangeAppointmentStatusRequest,
} from '@/shared/types/api/booking';
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
import { Booking } from '@/shared/types/entity/booking';
import StatusBadge from '@/components/common/StatusBadge';
import { checkJoin } from '@/shared/utils/helper/checkJoin';
import { formatDate } from '@/shared/utils/helper/formatDate';
import { AppointmentStatus, Role } from '@/shared/types/enums';
import { DataTableColumnHeader } from '../DataTableColumnHeader';
import { Check, MoreHorizontal, NotebookPen, ReceiptText, VideoIcon, X } from 'lucide-react';

const BookingsTableColumn = (
  JoinCallLobby: (data: ValidateRoomIdRequest) => void,
  handleNavigateToBookingsDetailPage: (appointmentId: Booking['_id']) => void,
  role: Role,
  handleReviewAddFormToggle?: (
    e: React.MouseEvent<HTMLDivElement>,
    bookingId: string,
    providerId: string,
  ) => void,
  handleUserCancelBooking?: (bookingId: Booking['_id']) => void,
  changeAppointmentStatus?: (data: ChangeAppointmentStatusRequest) => void,
  statusChangingAppointmentId?: string | null,
): ColumnDef<FetchBookingsResponse>[] => [
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
      accessorKey: 'appointmentDate',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
      cell: ({ row }) => {
        const createdAt = row.getValue('appointmentDate') as Date;
        const formattedDate = formatDate(createdAt);
        return <span className="font-medium text-slate-700 dark:text-slate-300">{formattedDate}</span>;
      },
    },
    {
      accessorKey: 'appointmentStatus',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.original.appointmentStatus;
        const isThisRowUpdating = statusChangingAppointmentId === row.original._id;
        if (isThisRowUpdating) {
          return <StatusBadge type="updating" label="Updating" />;
        }
        switch (status) {
          case AppointmentStatus.BOOKED:
            return <StatusBadge type="pending" label="Pending Confirmation" />;
          case AppointmentStatus.CANCELLED:
            return <StatusBadge type="blocked" label="Cancelled" />;
          case AppointmentStatus.CONFIRMED:
            return <StatusBadge type="active" label="Confirmed" />;
          case AppointmentStatus.REJECTED_BY_PROVIDER:
            return <StatusBadge type="blocked" label="Rejected By Provider" />;
          case AppointmentStatus.NOT_ATTENDED:
            return <StatusBadge type="updating" label="Not Attended" />;
          case AppointmentStatus.COMPLETED:
            return <StatusBadge type="verified" label="Completed 🎉" />;
          default:
            return <StatusBadge type="standard" label={status} />;
        }
      },
    },
    {
      accessorKey: 'appointmentTime',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Slot" />,
      cell: ({ row }) => {
        const slot = row.getValue('appointmentTime') as string;
        return <StatusBadge type="standard" label={slot} />;
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Paid on" />,
      cell: ({ row }) => {
        const createdAt = row.getValue('createdAt') as Date;
        const formattedDate = formatDate(createdAt);
        return <span className="font-medium text-slate-700 dark:text-slate-300">{formattedDate}</span>;
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => {
        const booking = row.original;
        const canJoin = checkJoin(booking.appointmentDate);
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button title="Open Menu" variant="ghost" className="h-8 w-8 p-0 cursor-pointer hover:bg-muted">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {booking.appointmentStatus === AppointmentStatus.CONFIRMED && canJoin && (
                <DropdownMenuItem
                  onClick={() =>
                    JoinCallLobby({ appointmentId: booking._id, roomId: booking.videoCallRoomId })
                  }
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <VideoIcon className="w-3.5 h-3.5" /> Join
                </DropdownMenuItem>
              )}
              {role === Role.PROVIDER &&
                changeAppointmentStatus &&
                booking.appointmentStatus === AppointmentStatus.BOOKED && (
                  <>
                    <DropdownMenuItem
                      onClick={() =>
                        changeAppointmentStatus({
                          appointmentId: booking._id,
                          appointmentStatus: AppointmentStatus.CONFIRMED,
                        })
                      }
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Confirm</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        changeAppointmentStatus({
                          appointmentId: booking._id,
                          appointmentStatus: AppointmentStatus.REJECTED_BY_PROVIDER,
                        })
                      }
                      className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </DropdownMenuItem>
                  </>
                )}
              {role === Role.USER &&
                handleUserCancelBooking &&
                booking.appointmentStatus === AppointmentStatus.BOOKED && (
                  <DropdownMenuItem
                    onClick={() => handleUserCancelBooking(booking._id)}
                    className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                  >
                    <X className="w-3.5 h-3.5" /> Cancel
                  </DropdownMenuItem>
                )}
              {role === Role.USER &&
                handleReviewAddFormToggle &&
                booking.appointmentStatus === AppointmentStatus.COMPLETED && (
                  <DropdownMenuItem
                    onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                      handleReviewAddFormToggle(e, booking._id, booking.serviceProviderId)
                    }
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <NotebookPen className="w-3.5 h-3.5" /> Add Review
                  </DropdownMenuItem>
                )}
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleNavigateToBookingsDetailPage(booking._id)}
              >
                <ReceiptText className="w-3.5 h-3.5" /> Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

export default BookingsTableColumn;