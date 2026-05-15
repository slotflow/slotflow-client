import { Role } from "@/shared/interface/enums";
import { fetchMyServiceAvailability } from "@/shared/apis/serviceAvailability";
import ProviderServiceAvailability from "@/components/profile/ProviderServiceAvailability";

const ProviderAvailability: React.FC = () => {

    return (
        <div className="min-h-full flex flex-col w-full space-y-2">
            <ProviderServiceAvailability
                fetchApiFuntion={fetchMyServiceAvailability}
                queryKey="serviceAvailability"
                role={Role.PROVIDER}
            />
        </div>
    )

}

export default ProviderAvailability;