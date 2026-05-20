import { ProfileDetailsShimmerProps } from "@/shared/interface/shimmerInterface";

const DataFieldShimmer: React.FC<ProfileDetailsShimmerProps> = ({ row }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {Array.from({ length: row }).map((_, index) => (
                <div key={index} className="shimmer h-16 rounded-sm">

                </div>
            ))}
        </div>
    )
}

export default DataFieldShimmer