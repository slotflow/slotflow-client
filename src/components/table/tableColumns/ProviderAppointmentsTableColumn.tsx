// import { format } from "date-fns";
// import { Button } from "../../ui/button";
// import { ColumnDef } from "@tanstack/react-table";
// import { DataTableColumnHeader } from "../DataTableColumnHeader";
// import { Booking } from "@/utils/interface/entityInterface/bookingInterface";
// import { Check, MoreHorizontal, ReceiptText, VideoIcon, X } from "lucide-react";
// import { FetchBookingsResponse, ValidateRoomId } from "@/utils/interface/api/commonApiInterface";
// import { ProviderChangeAppointmentStatusRequest } from "@/utils/interface/api/providerApiInterface";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
// import { AppointmentStatus } from "@/utils/interface/enums";

// export const ProviderAppointmentsBookingTableColumns = (
//   handleChangeAppointmentStatus: (data: ProviderChangeAppointmentStatusRequest) => void,
//   handleProviderJoinCall: (data: ValidateRoomId) => void,
//   handleNavigateToAppointmentDetailPage: (appointmentId: Booking["_id"]) => void,
// ): ColumnDef<FetchBookingsResponse>[] => [
//     {
//       accessorKey: "createdAt",
//       header: ({ column }) => (<DataTableColumnHeader column={column} title="Booked At" />),
//       cell: ({ row }) => {
//         const createdAt = row.getValue("createdAt");
//         const date = format(new Date(createdAt as Date), "dd MMM yyyy");
//         return <span>{date}</span>;
//       }
//     },
//     {
//       accessorKey: "appointmentMode",
//       header: ({ column }) => (<DataTableColumnHeader column={column} title="Mode" />)
//     },
//     {
//       accessorKey: "appointmentStatus",
//       header: ({ column }) => (
//         <DataTableColumnHeader column={column} title="Status" />
//       ),
//       cell: ({ row }) => {
//         const status = row.original.appointmentStatus;
//         switch (status) {
//           case AppointmentStatus.BOOKED:
//             return <span className="text-yellow-500 font-semibold">Pending Confirmation</span>;
//           case AppointmentStatus.CANCELLED:
//             return <span className="text-red-500 font-semibold">Cancelled</span>;
//           case AppointmentStatus.CONFIRMED:
//             return <span className="text-green-500 font-semibold">Confirmed</span>;
//           case AppointmentStatus.REJECTED_BY_PROVIDER:
//             return <span className="text-red-500 font-semibold">Rejected By Provider</span>;
//           case AppointmentStatus.NOT_ATTENDED:
//             return <span className="text-orange-500 font-semibold">Not Attended</span>;
//           case AppointmentStatus.COMPLETED:
//             return <span className="text-indigo-500 font-semibold">Completed 🎉</span>;
//           default:
//             return <span>{status}</span>;
//         }
//       }
//     },
//     {
//       accessorKey: "appointmentTime",
//       header: ({ column }) => (<DataTableColumnHeader column={column} title="Slot" />)
//     },
//     {
//       accessorKey: "appointmentDate",
//       header: ({ column }) => (<DataTableColumnHeader column={column} title="Booking On" />),
//       cell: ({ row }) => {
//         const createdAt = row.getValue("appointmentDate");
//         const date = format(new Date(createdAt as Date), "dd MMM yyyy");
//         return <span>{date}</span>;
//       }
//     },
//     {
//       accessorKey: "actions",
//       header: "Actions",
//       id: "actions",
//       cell: (
//         { row }
//       ) => {
//         const appointment = row.original;
//         return (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
//                 <span className="sr-only">Open menu</span>
//                 <MoreHorizontal className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Actions</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               {appointment.appointmentStatus === AppointmentStatus.BOOKED && (
//                 <>
//                   <DropdownMenuItem
//                     onClick={() => handleChangeAppointmentStatus({ appointmentId: appointment._id, appointmentStatus: AppointmentStatus.CONFIRMED })}
//                     className="flex items-center gap-2"
//                   >
//                     {<Check className="w-4 h-4" />}
//                     <span>Confirm</span>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     onClick={() => handleChangeAppointmentStatus({ appointmentId: appointment._id, appointmentStatus: AppointmentStatus.REJECTED_BY_PROVIDER })}
//                     className="flex items-center gap-2"
//                   >
//                     {<X className="w-4 h-4" />}
//                     <span>Reject</span>
//                   </DropdownMenuItem>
//                 </>
//               )}
//               {appointment.appointmentStatus === AppointmentStatus.CONFIRMED && (
//                 <DropdownMenuItem
//                   onClick={() => handleProviderJoinCall({ appointmentId: appointment._id, roomId: appointment.videoCallRoomId })}
//                   className="flex items-center gap-2"
//                 >
//                   <VideoIcon /> Join
//                 </DropdownMenuItem>
//               )}
//               <DropdownMenuItem
//                 className="flex items-center gap-2"
//                 onClick={() => handleNavigateToAppointmentDetailPage(appointment._id)}
//               >
//                 <ReceiptText /> Details
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         )
//       },
//     }
//   ]
