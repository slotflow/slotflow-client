import { Button } from "../../ui/button";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { adminVerificationStatusArray } from "@/utils/constants";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { Provider } from "@/utils/interface/entityInterface/providerInterface";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { AdminChangeProviderBlockStatusRequest, AdminChangeProviderTrustTagRequest, AdminFetchAllProvidersResponse } from "@/utils/interface/api/adminProviderApiInterface";

export const AdminProvidersTableColumns = (
    handleAdminApproveProvider: (providerId: Provider["_id"]) => void,
    handleOpenProviderRejectModal: (providerId: Provider["_id"]) => void,
    hanldeAdminChangeProviderBlockStatus: (data: AdminChangeProviderBlockStatusRequest) => void,
    handleGetProviderDetailPage: (providerId: Provider["_id"]) => void,
    hanldeAdminChangeProviderSlotflowTrustTag: (data: AdminChangeProviderTrustTagRequest) => void,
): ColumnDef<AdminFetchAllProvidersResponse>[] => [
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
            accessorKey: "isAdminVerified",
            header: "Admin Verication",
            cell: ({ row }) => {
                const isVerified = row.original.isAdminVerified;
                if (isVerified) {
                    return <span className="text-green-500 font-semibold">Verified</span>
                } else {
                    return <span className="text-red-500 font-semibold">Pending</span>
                }
            },
        },
        {
            accessorKey: "adminVerificationStatus",
            header: "Verication Status",
            cell: ({ row }) => {
                const status = row.original.adminVerificationStatus;
                switch (status) {
                    case adminVerificationStatusArray[0]:
                        return <span className="font-semibold">Requested By Provider</span>;
                    case adminVerificationStatusArray[1]:
                        return <span className="text-yellow-500 font-semibold">Under Review</span>;
                    case adminVerificationStatusArray[2]:
                        return <span className="text-green-500 font-semibold">Approved</span>;
                    case adminVerificationStatusArray[3]:
                        return <span className="text-red-500 font-semibold">Rejected</span>;
                    case adminVerificationStatusArray[4]:
                        return <span className="font-semibold">ReSubmitted By Provider</span>;
                    case adminVerificationStatusArray[5]:
                        return <span className="text-gray-500 font-semibold">Not Requested</span>;
                    default:
                        return <span>{status}</span>;
                }
            },
        },
        {
            accessorKey: "isEmailVerified",
            header: "Email Verication",
            cell: ({ row }) => {
                const isEmailVerified = row.original.isEmailVerified;
                if (isEmailVerified) {
                    return <span className="text-green-500 font-semibold">Verified</span>
                } else {
                    return <span className="text-red-500 font-semibold">Pending</span>
                }
            },
        },
        {
            accessorKey: "trustedBySlotflow",
            header: ({ column }) => (<DataTableColumnHeader column={column} title="Slotflow Trusted" />),
            cell: ({ row }) => {
                const isTrusted = row.original.trustedBySlotflow;
                if (isTrusted) {
                    return <span className="text-green-500 font-semibold">Verified</span>
                } else {
                    return <span className="text-red-500 font-semibold">Pending</span>
                }
            },
        },
        {
            accessorKey: "actions",
            header: "Actions",
            id: "actions",
            cell: ({ row }) => {
                const provider = row.original;
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
                            <DropdownMenuItem onClick={() => handleGetProviderDetailPage(provider._id)}>
                                Details
                            </DropdownMenuItem>
                            {(!provider.isAdminVerified && 
                            (provider.adminVerificationStatus === adminVerificationStatusArray[0] || provider.adminVerificationStatus === adminVerificationStatusArray[4] || provider.adminVerificationStatus === adminVerificationStatusArray[1])) && (
                                <DropdownMenuItem onClick={() => handleAdminApproveProvider(provider._id)}>
                                    Approve
                                </DropdownMenuItem>
                            )}
                            {(!provider.isAdminVerified &&
                                (provider.adminVerificationStatus === adminVerificationStatusArray[0] || provider.adminVerificationStatus === adminVerificationStatusArray[4] || provider.adminVerificationStatus === adminVerificationStatusArray[1])) && (
                                <DropdownMenuItem onClick={() => handleOpenProviderRejectModal(provider._id)}>
                                    Reject
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => hanldeAdminChangeProviderBlockStatus({ isBlocked: provider.isBlocked, providerId: provider._id })}>
                                {provider.isBlocked ? "Unblock" : "Block"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => hanldeAdminChangeProviderSlotflowTrustTag({ providerId: provider._id, trustedBySlotflow: provider.trustedBySlotflow })}>
                                {provider.trustedBySlotflow ? "Remove Tag" : "Give Tag"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        },
    ]