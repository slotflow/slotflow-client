import { ColumnDef } from '@tanstack/react-table';
import { ReferralStatus } from '@/shared/types/enums';
import StatusBadge from '@/components/common/StatusBadge';
import { formateDate } from '@/shared/utils/helper/formatter';
import { DataTableColumnHeader } from '../DataTableColumnHeader';
import { FetchReferralsResponse } from '@/shared/types/api/referral';

const ReferralTableColumn = (): ColumnDef<FetchReferralsResponse>[] => [
  {
    accessorKey: 'slNo',
    header: 'Sl No',
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground font-medium">
        {String(row.index + 1).padStart(2, '0')}
      </span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Referred on" />,
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt') as Date;
      const formattedDate = formateDate(createdAt);
      return <span className="font-medium text-slate-700 dark:text-slate-300">{formattedDate}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      switch (status) {
        case ReferralStatus.COMPLETED:
          return <StatusBadge type="active" label="Completed" />;
        case ReferralStatus.PENDING:
          return <StatusBadge type="pending" label="Pending" />;
        case ReferralStatus.REWARDED:
          return <StatusBadge type="verified" label="Rewarded" />;
        default:
          return <StatusBadge type="standard" label={status} />;
      }
    },
  },
  {
    accessorKey: 'completedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Completed on" />,
    cell: ({ row }) => {
      const completedAt = row.getValue('completedAt') as Date;
      if (!completedAt) {
        return <span className="text-muted-foreground text-xs italic">Not Completed</span>;
      }
      const formattedDate = formateDate(completedAt);
      return <span className="font-medium text-slate-700 dark:text-slate-300">{formattedDate}</span>;
    },
  },
  {
    accessorKey: 'rewardGiven',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Reward Given" />,
    cell: ({ row }) => {
      const rewardGiven = row.original.rewardGiven;
      return rewardGiven ? (
        <StatusBadge type="verified" label="Rewarded" />
      ) : (
        <StatusBadge type="pending" label="Pending" />
      );
    },
  },
];

export default ReferralTableColumn;