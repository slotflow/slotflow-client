import { providerFetchServiceDetails } from '@/shared/apis/providerService';
import ProviderServiceDetails from '@/components/profile/ProviderServiceDetails';

const ProviderService: React.FC = () => {

  return (
    <div className="min-h-full flex flex-col w-full space-y-2">
      <ProviderServiceDetails
        fetchApiFunction={providerFetchServiceDetails}
        queryKey="providerService"
      />
    </div>
  )

}

export default ProviderService;