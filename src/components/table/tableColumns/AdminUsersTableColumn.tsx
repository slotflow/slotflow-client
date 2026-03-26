import { Button } from "../../ui/button";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { User } from "@/utils/interface/entityInterface/userInterface";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { AdminChangeUserStatusRequest, AdminfetchAllUsersResponse } from "@/utils/interface/api/user";

export const AdminUsersTableColumns = (
    handleAdminChangeUserBlockStatus: (data: AdminChangeUserStatusRequest) => void,
    handleGetUserDetailPage: (e: React.MouseEvent<HTMLDivElement>, userId: User["_id"]) => void,
): ColumnDef<AdminfetchAllUsersResponse>[] => [
        {
            accessorKey: "username",
            header: ({ column }) => (<DataTableColumnHeader column={column} title="Username" />)
        },
        {
            accessorKey: "email",
            header: ({ column }) => (<DataTableColumnHeader column={column} title="Email" />)
        },
        {
            accessorKey: "isBlocked",
            header: ({ column }) => (<DataTableColumnHeader column={column} title="Account Status" />),
            cell: ({ row }) => {
                const isBlocked = row.original.isBlocked;
                if (isBlocked) {
                    return <span className="text-red-500 font-semibold">Blocked</span>
                } else {
                    return <span className="text-green-500 font-semibold">Active</span>
                }
            },
        },
        {
            accessorKey: "isVerified",
            header: "Email Verication",
            cell: ({ row }) => {
                const isVerified = row.original.isEmailVerified;
                if (isVerified) {
                    return <span className="text-green-500 font-semibold">Verified</span>
                } else {
                    return <span className="text-red-500 font-semibold">Pending</span>
                }
            }
        },
        {
            accessorKey: "actions",
            header: "Actions",
            id: "actions",
            cell: ({ row }) => {
                const user = row.original;
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
                            <DropdownMenuItem onClick={(e: React.MouseEvent<HTMLDivElement>) => handleGetUserDetailPage(e, user._id)}
                            >Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAdminChangeUserBlockStatus({ isBlocked: user.isBlocked, userId: user._id })}>
                                {user.isBlocked ? "Unblock" : "Block"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        }
    ]