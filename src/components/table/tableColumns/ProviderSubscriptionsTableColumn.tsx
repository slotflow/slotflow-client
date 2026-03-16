import { Button } from "../../ui/button";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { formateDate } from "@/utils/helper/formatter";
import { SubscriptionStatus } from "@/utils/interface/enums";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { Subscription } from "@/utils/interface/entityInterface/subscriptionInterface";
import { FetchProviderSubscriptionsResponse } from "@/utils/interface/api/subscriptionApiInterface";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";

// For admin side view and provider side view of provider subscriptions
export const ProvidersSubscriptionsTableColumns = (
    handleAdminGetProviderDetailPage: (subscriptionId: Subscription["_id"]) => void,
): ColumnDef<FetchProviderSubscriptionsResponse>[] => [
        {
            accessorKey: "planName",
            header: ({ column }) => (<DataTableColumnHeader column={column} title="Plan" />)
        },
        {
            accessorKey: "startDate",
            header: ({ column }) => (<DataTableColumnHeader column={column} title="Start Date" />),
            cell: ({ row }) => {
                const startDate = row.getValue("startDate") as Date;
                const formattedDate = formateDate(startDate);
                return <span>{formattedDate}</span>;
            }

        },
        {
            accessorKey: "endDate",
            header: ({ column }) => (<DataTableColumnHeader column={column} title="Expires on" />),
            cell: ({ row }) => {
                const endDate = row.getValue("endDate") as Date;
                const formattedDate = formateDate(endDate);
                return <span>{formattedDate}</span>;
            }

        },
        {
            accessorKey: "subscriptionStatus",
            header: ({ column }) => (<DataTableColumnHeader column={column} title="Status" />),
            cell: ({ row }) => {
                const subscriptionStatus = row.original.subscriptionStatus;
                switch (subscriptionStatus) {
                    case SubscriptionStatus.ACTIVE:
                        return <span className="text-green-500 font-semibold">Active</span>;
                    case SubscriptionStatus.EXPIRED:
                        return <span className="text-red-500 font-semibold">Expired</span>;
                    case SubscriptionStatus.CANCELLED:
                        return <span className="text-gray-500 font-semibold">Cancelled</span>;
                    case SubscriptionStatus.PENDING:
                        return <span className="text-yellow-500 font-semibold">Pending</span>;
                    case SubscriptionStatus.PAST_DUE:
                        return <span className="text-orange-500 font-semibold">Past Due</span>;
                    case SubscriptionStatus.FAILED:
                        return <span className="text-red-600 font-semibold">Failed</span>;
                    default:
                        return <span className="font-semibold">{subscriptionStatus}</span>;
                }
            }
        },
        {
            accessorKey: "actions",
            header: "Actions",
            id: "actions",
            cell: ({ row }) => {
                const subscription = row.original;
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
                            <DropdownMenuItem onClick={() => handleAdminGetProviderDetailPage(subscription._id)}>
                                Details
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        }
    ]