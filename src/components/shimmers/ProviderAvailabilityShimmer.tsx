import { Card, CardContent } from "../ui/card";
import { ProviderAvailabilityShimmerProps } from "@/shared/interface/shimmerInterface";

const ProviderAvailabilityShimmer: React.FC<ProviderAvailabilityShimmerProps> = ({
    row,
    slotCount
}) => {
    return (
        <div className="overflow-hidden w-full mt-2 md:mt-0">
            <Card>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {Array.from({ length: row }).map((_, index) => (
                            <div key={index} className="shimmer h-16 rounded-sm"></div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="rounded-md h-12 w-full shimmer"></div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {Array.from({ length: slotCount }).map((_, index) => (
                            <div key={index} className="rounded-md h-12 w-full shimmer"></div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProviderAvailabilityShimmer