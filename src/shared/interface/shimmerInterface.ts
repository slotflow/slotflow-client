// Shimmer for provider profile Details compoenent interface
export interface ProfileDetailsShimmerProps {
    row: number;
    className?: string;
}

// Shimmer for provider availability compoenent interface
export interface ProviderAvailabilityShimmerProps {
    slotCount: number;
}

// Shimmer for table
export interface TableShimmerProps {
    columnsCount?: number;
}

// Shimmer for dashboard stats
export interface DashboardStatsShimmerProps {
    count: number;
}

// No chat selected shimmer interface
export interface NoChatSelectedSShimmerProps {
    className: string;
}