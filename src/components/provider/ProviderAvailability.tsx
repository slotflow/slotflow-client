import { Button } from "../ui/button";
import { BetweenHorizontalStart } from "lucide-react";
import ProviderServiceAvailability from "@/components/profile/ProviderServiceAvailability";
import { Role } from "@/shared/interface/enums";
import { fetchMyServiceAvailability } from "@/shared/apis/serviceAvailability";

// TODO 

const ProviderAvailability = () => {

    return (
        <div className="min-h-full flex flex-col w-full space-y-2">

            <div className='border rounded-md p-2'>
                <div className='flex justify-between items-center'>
                    <div className='flex space-x-2'>
                        <BetweenHorizontalStart />
                        <h2 className="text-xl font-semibold">Service Availability</h2>
                    </div>
                    <Button
                        title="Edit Details"
                        variant="default"
                        // disabled={loading}
                        // onClick={}
                        className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
                    >Edit Details</Button>
                </div>
            </div>

            <ProviderServiceAvailability fetchApiFuntion={fetchMyServiceAvailability} queryKey="serviceAvailability" role={Role.PROVIDER} />
        </div>
    )

}

export default ProviderAvailability;