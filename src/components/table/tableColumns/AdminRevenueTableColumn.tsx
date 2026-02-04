import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { formatNumberToPrice } from "@/utils/helper/formatter";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { AdminFetchRevenueReportRow } from "@/utils/interface/api/adminReportApiInterface";
import { PaymentFor, PaymentGateway } from "@/utils/interface/enums";

export const AdminRevenueTableColumn = (

): ColumnDef<AdminFetchRevenueReportRow>[] => [
    {
      accessorKey: "createdAt",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Paid on" />),
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt");
        const formattedDate = createdAt ? format(new Date(createdAt as Date), "dd MMM yyyy") : "N/A";
        return <span>{formattedDate}</span>;
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
      accessorKey: "paymentGateway",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gateway" />
      ),
      cell: ({ row }) => {
        const paymentGateway = row.original.paymentGateway;
        switch (paymentGateway) {
          case PaymentGateway.STRIPE:
            return <span className="text-indigo-500 font-semibold">Stripe</span>;
          case PaymentGateway.RAZORPAY:
            return <span className="text-blue-800 font-semibold">Razorpay</span>;
          case PaymentGateway.PAYPAL:
            return <span className="text-blue-400 font-semibold">Paypal</span>;
          default:
            return <span>{paymentGateway}</span>;
        }
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
      accessorKey: "initialAmount",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Amount" />),
      cell: ({ row }) => {
        const disAmount = row.original.discountAmount;
        return <span>{formatNumberToPrice(disAmount) || disAmount}</span>;
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
  ]