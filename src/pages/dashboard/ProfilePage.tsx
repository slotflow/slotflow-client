import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const Error404Page = lazy(() => import("../fallbacks/Error404Page"));
const LoadingFallbackPage = lazy(() => import("../fallbacks/LoadingFallbackPage"));
const ProviderProfileWrapper = lazy(() => import("../../containers/provider/ProviderProfileWrapper"));

const ProfilePage = () => {

    const { isProvider, isUser } = useAuth();

    const renderRoleDashboard = () => {
        if (isProvider) return <ProviderProfileWrapper />
        if (isUser) return <Navigate to='/setting/account' />;
        return <Error404Page />;
    };

    return (
        <Suspense fallback={<LoadingFallbackPage />}>
            {renderRoleDashboard()}
        </Suspense>
    );
}

export default ProfilePage;