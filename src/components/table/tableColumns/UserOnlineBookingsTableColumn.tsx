// import { format } from "date-fns";
// import { Button } from "@/components/ui/button";
// import { ColumnDef } from "@tanstack/react-table";
// import { DataTableColumnHeader } from "../DataTableColumnHeader";
// import { MoreHorizontal, ReceiptText, VideoIcon } from "lucide-react";
// import { Booking } from "@/utils/interface/entityInterface/bookingInterface";
// import { FetchOnlineBookingsForUserResponse, ValidateRoomId } from "@/utils/interface/api/commonApiInterface";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { AppointmentStatus } from "@/utils/interface/enums";

// export const UserOnlineBookingTableColumn = (
//     handleUserJoinCall: (data: ValidateRoomId) => void,
//     handleNavigateToBookingDetailPage: (appointmentId: Booking["_id"]) => void,
// ): ColumnDef<FetchOnlineBookingsForUserResponse>[] => [
//         {
//             accessorKey: "appointmentDate",
//             header: ({ column }) => (<DataTableColumnHeader column={column} title="Date" />),
//             cell: ({ row }) => {
//                 const createdAt = row.getValue("appointmentDate");
//                 const formattedDate = createdAt ? format(new Date(createdAt as Date), "dd MMM yyyy") : "N/A";
//                 return <span>{formattedDate}</span>;
//             }
//         },
//         {
//             accessorKey: "appointmentStatus",
//             header: ({ column }) => (
//                 <DataTableColumnHeader column={column} title="Status" />
//             ),
//             cell: ({ row }) => {
//                 const status = row.original.appointmentStatus;
//                 switch (status) {
//                     case AppointmentStatus.BOOKED:
//                         return <span className="text-yellow-500 font-semibold">Pending Confirmation</span>;
//                     case AppointmentStatus.CANCELLED:
//                         return <span className="text-red-500 font-semibold">Cancelled</span>;
//                     case AppointmentStatus.CONFIRMED:
//                         return <span className="text-green-500 font-semibold">Confirmed</span>;
//                     case AppointmentStatus.REJECTED_BY_PROVIDER:
//                         return <span className="text-red-500 font-semibold">Rejected By Provider</span>;
//                     case AppointmentStatus.NOT_ATTENDED:
//                         return <span className="text-orange-500 font-semibold">Not Attended</span>;
//                     case AppointmentStatus.COMPLETED:
//                         return <span className="text-indigo-500 font-semibold">Completed 🎉</span>;
//                     default:
//                         return <span>{status}</span>;
//                 }
//             },
//         },
//         {
//             accessorKey: "appointmentTime",
//             header: ({ column }) => (<DataTableColumnHeader column={column} title="Slot" />)
//         },
//         {
//             accessorKey: "serviceProviderId.username",
//             header: ({ column }) => (<DataTableColumnHeader column={column} title="Provider" />)
//         },
//         {
//             accessorKey: "createdAt",
//             header: ({ column }) => (<DataTableColumnHeader column={column} title="Paid on" />),
//             cell: ({ row }) => {
//                 const createdAt = row.getValue("createdAt");
//                 const formattedDate = createdAt ? format(new Date(createdAt as Date), "dd MMM yyyy") : "N/A";
//                 return <span>{formattedDate}</span>;
//             }
//         },
//         {
//             accessorKey: "actions",
//             header: "Actions",
//             id: "actions",
//             cell: (
//                 { row }
//             ) => {
//                 const appointment = row.original;
//                 return (
//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
//                                 <span className="sr-only">Open menu</span>
//                                 <MoreHorizontal className="h-4 w-4" />
//                             </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                             <DropdownMenuSeparator />
//                             {appointment.appointmentStatus === AppointmentStatus.CONFIRMED && (
//                                 <DropdownMenuItem
//                                     onClick={() => handleUserJoinCall({ appointmentId: appointment._id, roomId: appointment.videoCallRoomId })}
//                                     className="flex items-center gap-2"
//                                 >
//                                     <VideoIcon /> Join
//                                 </DropdownMenuItem>
//                             )}
//                             <DropdownMenuItem
//                                 className="flex items-center gap-2"
//                                 onClick={() => handleNavigateToBookingDetailPage(appointment._id)}
//                             >
//                                 <ReceiptText /> Details
//                             </DropdownMenuItem>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 )
//             },
//         }
//     ]