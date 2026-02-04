import { Button } from "../../ui/button";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { AdminChangeServiceBlockStatusRequest, AdminFetchAllServicesResponse } from "@/utils/interface/api/adminServiceApiInterface";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";

export const AdminAppServicesTableColumns = (
    handleAdminChangeServiceStatus: (data: AdminChangeServiceBlockStatusRequest) => void,
): ColumnDef<AdminFetchAllServicesResponse>[] => [
        {
            accessorKey: "_id",
            header: "id",
            cell: ({ row }) => {
                const id = row.original._id;
                return <span>{id.toString().slice(-4)}</span>;
            },
        },
        {
            accessorKey: "serviceName",
            header: ({ column }) => (<DataTableColumnHeader column={column} title="Name" />)
        },
        {
            accessorKey: "serviceCategory",
            header: ({ column }) => (<DataTableColumnHeader column={column} title="Category" />)
        },
        {
            accessorKey: "isBlocked",
            header: ({ column }) => (<DataTableColumnHeader column={column} title="Status" />),
            cell: ({ row }) => {
                const isBlocked = row.original.isBlocked;
                if (!isBlocked) {
                    return <span className="text-green-500 font-semibold">Active</span>
                } else {
                    return <span className="text-red-500 font-semibold">Blocked</span>
                }
            }
        },
        {
            accessorKey: "actions",
            header: "Actions",
            id: "actions",
            cell: ({ row }) => {
                const service = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleAdminChangeServiceStatus({ isBlocked: service.isBlocked, serviceId: service._id })}>
                                {service.isBlocked ? "Unblock" : "Block"}
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        }
    ]