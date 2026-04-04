import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { PaymentFor } from "@/shared/interface/enums";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { formateDate, formatNumberToPrice } from "@/shared/helper/formatter";
import { Payment } from "@/shared/interface/entityInterface/paymentInterface";
import { FetchPaymentsResponse } from "@/shared/interface/api/payment";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// for admin side, provider side and user side view of payments table
export const PaymentsTableColumn = (
  handleGetPaymentDetailsPage: (paymentId: Payment["_id"]) => void
): ColumnDef<FetchPaymentsResponse>[] => [
    {
      accessorKey: "createdAt",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Paid on" />),
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt") as Date;
        const formattedDate = formateDate(createdAt);
        return <span>{formattedDate}</span>;
      }
    },
    {
      accessorKey: "totalAmount",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Total" />),
      cell: ({ row }) => {
        const amount = row.original.totalAmount;
        return <span>{formatNumberToPrice(amount) || amount}</span>;
      }
    },
    {
      accessorKey: "discountAmount",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Discont" />),
      cell: ({ row }) => {
        const disAmount = row.original.discountAmount;
        return <span>{formatNumberToPrice(disAmount) || disAmount}</span>;
      }
    },
    {
      accessorKey: "paymentFor",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => {
        const paymentFor = row.original.paymentFor;
        switch (paymentFor) {
          case PaymentFor.PROVIDER_SUBSCRIPTION:
            return <span className="text-yellow-500 font-semibold">Provider Subscription</span>;
          case PaymentFor.APPOINTMENT_BOOKING:
            return <span className="text-green-500 font-semibold">Appointment Booking</span>;
          case PaymentFor.PROVIDER_PAYOUT:
            return <span className="text-red-500 font-semibold">Provider Payout</span>;
          case PaymentFor.CANCEL_BOOKING:
            return <span className="text-orange-500 font-semibold">Cancel Booking</span>;
          default:
            return <span>{paymentFor}</span>;
        }
      }
    },
    {
      accessorKey: "paymentMethod",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Method" />)
    },
    {
      accessorKey: "paymentStatus",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Status" />)
    },
    {
      accessorKey: "actions",
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original;
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
              <DropdownMenuItem onClick={() => handleGetPaymentDetailsPage(payment._id)}>
                Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    }
  ]