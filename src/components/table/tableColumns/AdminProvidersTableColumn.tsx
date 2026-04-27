import { Button } from "../../ui/button";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { AdminVerificationStatus } from "@/shared/interface/enums";
import { User } from "@/shared/interface/entityInterface/userInterface";
import { AdminRejectProviderModalState } from "@/shared/interface/commonInterface";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { AdminChangeProviderBlockStatusRequest, AdminChangeProviderTrustTagRequest, AdminFetchAllProvidersResponse } from "@/shared/interface/api/providerProfile";

export const AdminProvidersTableColumns = (
    handleAdminApproveProvider: (providerId: User["_id"]) => void,
    handleProviderRejectModal: (data: AdminRejectProviderModalState) => void,
    hanldeAdminChangeProviderBlockStatus: (data: AdminChangeProviderBlockStatusRequest) => void,
    handleGetProviderDetailPage: (providerId: User["_id"]) => void,
    handleAdminChangeProviderSlotflowTrustTag: (data: AdminChangeProviderTrustTagRequest) => void,
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
                    case AdminVerificationStatus.REQUESTED:
                        return <span className="font-semibold">Requested By Provider</span>;
                    case AdminVerificationStatus.UNDER_REVIEW:
                        return <span className="text-yellow-500 font-semibold">Under Review</span>;
                    case AdminVerificationStatus.APPROVED:
                        return <span className="text-green-500 font-semibold">Approved</span>;
                    case AdminVerificationStatus.REJECTED:
                        return <span className="text-red-500 font-semibold">Rejected</span>;
                    case AdminVerificationStatus.RESUBMITTED:
                        return <span className="font-semibold">ReSubmitted By Provider</span>;
                    case AdminVerificationStatus.NOT_REQUESTED:
                        return <span className="text-gray-500 font-semibold">Not Requested</span>;
                    default:
                        return <span>{status}</span>;
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
                            <Button title="Open Menu" variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
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
                                (provider.adminVerificationStatus === AdminVerificationStatus.REQUESTED || provider.adminVerificationStatus === AdminVerificationStatus.RESUBMITTED || provider.adminVerificationStatus === AdminVerificationStatus.UNDER_REVIEW)) && (
                                    <DropdownMenuItem onClick={() => handleAdminApproveProvider(provider._id)}>
                                        Approve
                                    </DropdownMenuItem>
                                )}
                            {(!provider.isAdminVerified &&
                                (provider.adminVerificationStatus === AdminVerificationStatus.REQUESTED || provider.adminVerificationStatus === AdminVerificationStatus.RESUBMITTED || provider.adminVerificationStatus === AdminVerificationStatus.UNDER_REVIEW)) && (
                                    <DropdownMenuItem onClick={() => handleProviderRejectModal({ modalState: true, providerId: provider._id })}>
                                        Reject
                                    </DropdownMenuItem>
                                )}
                            <DropdownMenuItem onClick={() => hanldeAdminChangeProviderBlockStatus({ isBlocked: provider.isBlocked, providerId: provider._id })}>
                                {provider.isBlocked ? "Unblock" : "Block"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAdminChangeProviderSlotflowTrustTag({ providerId: provider._id, trustedBySlotflow: provider.trustedBySlotflow })}>
                                {provider.trustedBySlotflow ? "Remove Tag" : "Give Tag"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        },
    ]