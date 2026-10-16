import { Button } from '@/components/ui/button';
import DataField from '@/components/app/DataField';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { formatDate } from '@/shared/utils/helper/formatDate';
import { formatString } from '@/shared/utils/helper/formatString';
import { CreditCard, Calendar, Activity, Zap } from 'lucide-react';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';
import { ProviderSubscriptionInfoProps } from '@/shared/types/component';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProviderSubscriptionInfo = ({
  providerSubscription,
  subscriptionStartDate,
  subscriptionEndDate,
  subscriptionStatus,
}: ProviderSubscriptionInfoProps) => {
  const { goTo } = useAppNavigation();

  return (
    <Card className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="flex flex-row space-x-2 items-center">
          <CreditCard className="size-4 text-indigo-500" />
          <span>Subscription Details</span>
        </CardTitle>
        <Button
          title="Manage Plan"
          variant={'secondary'}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/30 shadow-sm transition-all cursor-pointer disabled:opacity-50"
          onClick={(e) => {
            e.preventDefault();
            goTo(redirectPaths.UPGRADE);
          }}
        >
          {'Manage Plan'}
        </Button>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DataField label="Current Plan" value={formatString(providerSubscription)} Icon={Zap} />
        <DataField
          label="Subscription Status"
          value={formatString(subscriptionStatus)}
          Icon={Activity}
        />
        <DataField
          label="Subscribed on"
          value={formatDate(subscriptionStartDate)}
          Icon={Calendar}
          isDate
        />
        <DataField
          label="Renewal / Expiry Date"
          value={formatDate(subscriptionEndDate)}
          Icon={Calendar}
          isDate
        />
      </CardContent>
    </Card>
  );
};

export default ProviderSubscriptionInfo;
