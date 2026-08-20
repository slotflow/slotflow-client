import { Separator } from '../ui/separator';
import ProviderPlanList from '../provider/ProviderPlanList';

const SubscribePlan = () => {
  return (
    <>
      <div>
        <h3 className="text-lg font-medium">Security and Privacy</h3>
        <p className="text-muted-foreground text-sm">
          Manage your account details and security and privacy settings
        </p>
      </div>
      <Separator className="my-4 flex-none" />
      <ProviderPlanList />
    </>
  );
};

export default SubscribePlan;
