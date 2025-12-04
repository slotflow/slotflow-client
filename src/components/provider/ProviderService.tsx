import { Button } from '../ui/button';
import { SquareChartGantt } from 'lucide-react';
import { providerFetchProviderServiceDetails } from '@/utils/apis/provider.api';
import ProviderServiceDetails from '@/components/common/profile/ProviderServiceDetails';

const ProviderService = () => {

  return (
    <div className="min-h-full flex flex-col w-full">

      <div className='border rounded-md p-2'>
        <div className='flex justify-between items-center'>
          <div className='flex space-x-2'>
            <SquareChartGantt />
            <h2 className="text-xl font-semibold">Service Details</h2>
          </div>
          <Button
            variant="outline"
            // disabled={loading}
            // onClick={}
            className="cursor-pointer"
          >Edit Details</Button>
        </div>
      </div>

      <ProviderServiceDetails fetchApiFunction={providerFetchProviderServiceDetails} queryKey="providerService" />
    </div>
  )

}

export default ProviderService;