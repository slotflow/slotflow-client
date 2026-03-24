import { Button } from "../../ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Check, MoreHorizontal, X } from "lucide-react";
import { formatNumberToPrice } from "@/utils/helper/formatter";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { ChangePlanBlockStatusRequest, AdminFetchAllPlansResponse } from "@/utils/interface/api/planApiInterface";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";

export const AdminPlansTableColumns = (
  handleAdminChangePlanStatus: (data: ChangePlanBlockStatusRequest) => void,
): ColumnDef<AdminFetchAllPlansResponse>[] => [
    {
      accessorKey: "_id",
      header: "id",
      cell: ({ row }) => {
        const id = row.original._id;
        return <span>{id.toString().slice(-4)}</span>;
      },
    },
    {
      accessorKey: "planName",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Plan" />)
    },
    {
      accessorKey: "maxBookingPerMonth",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Max Booking" />)
    },
    {
      accessorKey: "adVisibility",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="ad Visibility" />),
      cell: ({ row }) => {
        const adVisibility = row.original.adVisibility;
        if (adVisibility) {
          return <span className="text-green-500 font-semibold"><Check /></span>
        } else {
          return <span className="text-red-500 font-semibold"><X /></span>
        }
      }
    },
    {
      accessorKey: "price",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Price" />),
      cell: ({ row }) => {
        const amount = row.original.price;
        return <span className="">{formatNumberToPrice(amount) || amount}</span>
      }
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
        const plan = row.original;
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
              <DropdownMenuItem>Details</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAdminChangePlanStatus({ isBlocked: plan.isBlocked, planId: plan._id })}>
                {plan.isBlocked ? "Unblock" : "Block"}
              </DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    }
  ]


