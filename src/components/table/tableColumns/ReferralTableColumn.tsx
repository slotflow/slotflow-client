import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { formateDate } from "@/shared/helper/formatter";
import { ReferralStatus } from "@/shared/interface/enums";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { FetchReferralsResponse } from "@/shared/interface/api/referral";

const ReferralTableColumn = (

): ColumnDef<FetchReferralsResponse>[] => [
        {
            accessorKey: "createdAt",
            header: ({ column }) => (<DataTableColumnHeader column={column} title="Referred on" />),
            cell: ({ row }) => {
                const createdAt = row.getValue("createdAt") as Date;
                const formattedDate = formateDate(createdAt);
                return <span>{formattedDate}</span>;
            }
        },
        {
            accessorKey: "status",
            header: ({ column }) => (<DataTableColumnHeader column={column} title="Status" />),
            cell: ({ row }) => {
                const type = row.original.status;
                switch (type) {
                    case ReferralStatus.COMPLETED:
                        return <Badge variant="outline" className="text-green-500 font-semibold bg-green-50 border-green-50">Completed</Badge>;
                    case ReferralStatus.PENDING:
                        return <Badge variant="outline" className="text-red-500 font-semibold bg-red-50 border-red-50">Pending</Badge>;
                    case ReferralStatus.REWARDED:
                        return <Badge variant="outline" className="text-red-500 font-semibold bg-red-50 border-red-50">Rewarded</Badge>;
                    default:
                        return <span>{type}</span>;
                }
            }
        },
        {
            accessorKey: "completedAt",
            header: ({ column }) => (<DataTableColumnHeader column={column} title="Completed on" />),
            cell: ({ row }) => {
                const completedAt = row.getValue("completedAt") as Date;
                if (completedAt === null) {
                    return <span>Not Completed</span>;
                } else {
                    const formattedDate = formateDate(completedAt);
                    return <span>{formattedDate}</span>;
                }
            }
        },
        {
            accessorKey: "rewardGiven",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Reward Given" />
            ),
            cell: ({ row }) => {
                const rewardGiven = row.original.rewardGiven;
                switch (rewardGiven) {
                    case rewardGiven:
                        return <Badge variant="outline" className="text-green-500 font-semibold bg-green-50 border-green-50">Rewarded</Badge>;
                    case !rewardGiven:
                        return <Badge variant="outline" className="text-red-500 font-semibold bg-red-50 border-red-50">Pending</Badge>;
                    default:
                        return <span>{rewardGiven}</span>;
                }
            }
        },
    ]

export default ReferralTableColumn;