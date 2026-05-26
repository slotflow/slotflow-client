import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { FetchCreditTransactionsResponse } from "@/shared/interface/api/credit";
import { CreditTransactionSource, CreditTransactionStatus, CreditTransactionType } from "@/shared/interface/enums";

const CreditTransactionTableColumn = (

): ColumnDef<FetchCreditTransactionsResponse>[] => [
    {
      accessorKey: "type",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Type" />),
      cell: ({ row }) => {
        const type = row.original.type;
        switch (type) {
          case CreditTransactionType.CREDIT:
            return <Badge variant="outline" className="text-green-500 font-semibold bg-green-50 border-green-50">Credit</Badge>;
          case CreditTransactionType.DEBIT:
            return <Badge variant="outline" className="text-red-500 font-semibold bg-red-50 border-red-50">Debit</Badge>;
          default:
            return <span>{type}</span>;
        }
      }
    },
    {
      accessorKey: "credits",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Credits" />),
      cell: ({ row }) => {
        const credits = row.original.credits;
        return <span>{credits}</span>;
      }
    },
    {
      accessorKey: "balanceAfter",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Balance" />),
      cell: ({ row }) => {
        const balanceAfter = row.original.balanceAfter;
        return <span>{balanceAfter}</span>;
      }
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        switch (status) {
          case CreditTransactionStatus.SUCCESS:
            return <Badge variant="outline" className="text-green-500 font-semibold bg-green-50 border-green-50">Success</Badge>;
          case CreditTransactionStatus.FAILED:
            return <Badge variant="outline" className="text-red-500 font-semibold bg-red-50 border-red-50">Failed</Badge>;
          default:
            return <span>{status}</span>;
        }
      }
    },
    {
      accessorKey: "source",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Source" />
      ),
      cell: ({ row }) => {
        const source = row.original.source;
        switch (source) {
          case CreditTransactionSource.ADMIN:
            return <span className="text-indigo-500 font-semibold">Admin</span>;
          case CreditTransactionSource.BOOKING_DISCOUNT:
            return <span className="text-blue-800 font-semibold">Booking Discount</span>;
          case CreditTransactionSource.PROMOTION:
            return <span className="text-green-800 font-semibold">Promotion</span>;
          case CreditTransactionSource.REFERRAL:
            return <span className="text-yellow-800 font-semibold">Referral</span>;
          case CreditTransactionSource.SUBSCRIPTION_DISCOUNT:
            return <span className="text-purple-800 font-semibold">Subscription Discount</span>;
          default:
            return <span>{source}</span>;
        }
      }
    },
  ]

export default CreditTransactionTableColumn;