import { Button } from "../ui/button";
import { BetweenHorizontalStart } from "lucide-react";
import { providerFetchServiceAvailability } from "@/utils/apis/provider.api";
import ProviderServiceAvailability from "@/components/common/profile/ProviderServiceAvailability";

// TODO 

const ProviderAvailability = () => {

    return (
        <div className="min-h-full flex flex-col">

            <div className='border rounded-md p-2'>
                <div className='flex justify-between items-center'>
                    <div className='flex space-x-2'>
                        <BetweenHorizontalStart />
                        <h2 className="text-xl font-semibold">Service Availability</h2>
                    </div>
                    <Button
                        variant="default"
                        // disabled={loading}
                        // onClick={}
                        className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
                    >Edit Details</Button>
                </div>
            </div>
            
            <ProviderServiceAvailability fetchApiFuntion={providerFetchServiceAvailability} queryKey="serviceAvailability" role="Provider" />
        </div>
    )

}

export default ProviderAvailability;