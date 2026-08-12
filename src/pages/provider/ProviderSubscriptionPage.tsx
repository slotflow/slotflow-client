import ProviderPlanList from '@/components/provider/ProviderPlanList';
import ProviderSubscriptionHistory from '@/components/provider/ProviderSubscriptionHistory';

// TODO move the providerplan list to settings subscription page
const ProviderSubscriptionPage = () => {
  return (
    <div className="p-4">
      <ProviderSubscriptionHistory />
      <ProviderPlanList />
    </div>
  );
};

export default ProviderSubscriptionPage;
