import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import BoardingLayout from "@/layouts/BoardingLayout";
import { useOnboardingMetadata } from "@/hooks/useOnboardingMetadata";
import BoardingLoadingFallback from "@/pages/boarding/BoardingLoadingFallback";

const BoardingLayoutWrapper: React.FC = () => {
    const metadata = useOnboardingMetadata();

    if (!metadata) {
        return (
            <Suspense fallback={<BoardingLoadingFallback />}>
                <Outlet />
            </Suspense>
        );
    }

    return (
        <BoardingLayout
            pageNumber={metadata.pageNumber}
            heading={metadata.heading}
            description={metadata.description}
        >
            <Suspense fallback={<BoardingLoadingFallback />}>
                <Outlet />
            </Suspense>
        </BoardingLayout>
    );
};

export default BoardingLayoutWrapper;
