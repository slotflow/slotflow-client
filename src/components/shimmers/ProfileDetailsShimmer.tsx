import { ProfileDetailsShimmerProps } from "@/shared/interface/componentInterface/shimmerInterface"

const ProfileDetailsShimmer: React.FC<ProfileDetailsShimmerProps> = ({ row, className }) => {
    return (
        <div className={`w-full ${className}`}>
            {Array.from({ length: row }).map((_, index) => (
                <div key={index} className="flex w-full space-x-2 items-center">
                    <label className="flex items-center mb-3 shimmer h-12 w-4/12 rounded-md"></label>
                    <p className="mb-3 shimmer h-12 w-8/12 rounded-md"></p>
                </div>
            ))}
        </div>
    )
}

export default ProfileDetailsShimmer