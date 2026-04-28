import { Role } from "@/shared/interface/enums";
import { BetweenHorizontalStart } from "lucide-react";
import { fetchMyServiceAvailability } from "@/shared/apis/serviceAvailability";
import ProviderServiceAvailability from "@/components/profile/ProviderServiceAvailability";

const ProviderAvailability: React.FC = () => {

    return (
        <div className="min-h-full flex flex-col w-full space-y-2">

            <div className='border rounded-md p-2'>
                <div className='flex justify-between items-center'>
                    <div className='flex space-x-2'>
                        <BetweenHorizontalStart />
                        <h2 className="text-xl font-semibold">Service Availability</h2>
                    </div>
                </div>
            </div>

            <ProviderServiceAvailability
                fetchApiFuntion={fetchMyServiceAvailability}
                queryKey="serviceAvailability"
                role={Role.PROVIDER}
            />
        </div>
    )

}

export default ProviderAvailability;