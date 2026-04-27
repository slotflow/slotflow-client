import ProfileDetailsShimmer from "./ProfileDetailsShimmer";
import { ProviderAvailabilityShimmerProps } from "@/shared/interface/shimmerInterface";

const ProviderAvailabilityShimmer: React.FC<ProviderAvailabilityShimmerProps> = ({ slotCount }) => {
    return (
        <div className="w-full mx-auto md:flex justify-between flex-grow space-x-1">
            <div className="w-full">
                <ProfileDetailsShimmer row={5} />
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Array.from({ length: slotCount }).map((_, index) => (
                        <div key={index} className="rounded-md h-8 w-full shimmer"></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProviderAvailabilityShimmer