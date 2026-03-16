import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { formateDate } from "@/utils/helper/formatter";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { AppointmentStatus, Role } from "@/utils/interface/enums";
import { Booking } from "@/utils/interface/entityInterface/bookingInterface";
import { Check, MoreHorizontal, NotebookPen, ReceiptText, VideoIcon, X } from "lucide-react";
import { changeAppointmentStatusRequest, FetchBookingsResponse, ValidateRoomId } from "@/utils/interface/api/bookingApiInterface";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { checkJoin } from "@/utils/helper";

export const BookingsTableColumn = (
    handleJoinCall: (data: ValidateRoomId) => void,
    handleNavigateToBookingsDetailPage: (appointmentId: Booking["_id"]) => void,
    role: Role,
    handleReviewAddFormToggle?: (e: React.MouseEvent<HTMLDivElement>, bookingId: string, providerId: string) => void,
    handleUserCancelBooking?: (bookingId: Booking["_id"]) => void,
    handleChangeAppointmentStatus?: (data: changeAppointmentStatusRequest) => void,
): ColumnDef<FetchBookingsResponse>[] => [
        {
            accessorKey: "appointmentDate",
            header: ({ column }) => (<DataTableColumnHeader column={column} title="Date" />),
            cell: ({ row }) => {
                const createdAt = row.getValue("appointmentDate") as Date;
                const formattedDate = formateDate(createdAt)
                return <span>{formattedDate}</span>;
            }
        },
        {
            accessorKey: "appointmentStatus",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }) => {
                const status = row.original.appointmentStatus;
                switch (status) {
                    case AppointmentStatus.BOOKED:
                        return <span className="text-yellow-500 font-semibold">Pending Confirmation</span>;
                    case AppointmentStatus.CANCELLED:
                        return <span className="text-red-500 font-semibold">Cancelled</span>;
                    case AppointmentStatus.CONFIRMED:
                        return <span className="text-green-500 font-semibold">Confirmed</span>;
                    case AppointmentStatus.REJECTED_BY_PROVIDER:
                        return <span className="text-red-500 font-semibold">Rejected By Provider</span>;
                    case AppointmentStatus.NOT_ATTENDED:
                        return <span className="text-orange-500 font-semibold">Not Attended</span>;
                    case AppointmentStatus.COMPLETED:
                        return <span className="text-indigo-500 font-semibold">Completed 🎉</span>;
                    default:
                        return <span>{status}</span>;
                }
            },
        },
        {
            accessorKey: "appointmentTime",
            header: ({ column }) => (<DataTableColumnHeader column={column} title="Slot" />)
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => (<DataTableColumnHeader column={column} title="Paid on" />),
            cell: ({ row }) => {
                const createdAt = row.getValue("createdAt") as Date;
                const formattedDate = formateDate(createdAt)
                return <span>{formattedDate}</span>;
            }
        },
        {
            accessorKey: "actions",
            header: "Actions",
            id: "actions",
            cell: (
                { row }
            ) => {
                const booking = row.original;
                console.log("booking.appointmentDate :",booking.appointmentDate)
                const canJoin = checkJoin(booking.appointmentDate);
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
                            {(booking.appointmentStatus === AppointmentStatus.CONFIRMED && canJoin) && (
                                <DropdownMenuItem
                                    onClick={() => handleJoinCall({ appointmentId: booking._id, roomId: booking.videoCallRoomId })}
                                    className="flex items-center gap-2"
                                >
                                    <VideoIcon /> Join
                                </DropdownMenuItem>
                            )}
                            {role === Role.PROVIDER && handleChangeAppointmentStatus && booking.appointmentStatus === AppointmentStatus.BOOKED && (
                                <>
                                    <DropdownMenuItem
                                        onClick={() => handleChangeAppointmentStatus({ appointmentId: booking._id, appointmentStatus: AppointmentStatus.CONFIRMED })}
                                        className="flex items-center gap-2"
                                    >
                                        {<Check className="w-4 h-4" />}
                                        <span>Confirm</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleChangeAppointmentStatus({ appointmentId: booking._id, appointmentStatus: AppointmentStatus.REJECTED_BY_PROVIDER })}
                                        className="flex items-center gap-2"
                                    >
                                        {<X className="w-4 h-4" />}
                                        <span>Reject</span>
                                    </DropdownMenuItem>
                                </>
                            )}
                            {role === Role.USER && handleUserCancelBooking &&booking.appointmentStatus === AppointmentStatus.BOOKED && (
                                <DropdownMenuItem
                                    onClick={() => handleUserCancelBooking(booking._id)}>
                                    Cancel
                                </DropdownMenuItem>
                            )}
                            {role === Role.USER && handleReviewAddFormToggle && booking.appointmentStatus === AppointmentStatus.COMPLETED && (
                                <DropdownMenuItem
                                    onClick={(e: React.MouseEvent<HTMLDivElement>) => handleReviewAddFormToggle(e, booking._id, booking.serviceProviderId)}
                                    className="flex items-center gap-2"
                                >
                                    <NotebookPen /> Add Review
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                                className="flex items-center gap-2"
                                onClick={() => handleNavigateToBookingsDetailPage(booking._id)}
                            >
                                <ReceiptText /> Details
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        }
    ]