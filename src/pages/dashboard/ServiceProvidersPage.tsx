import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import LoadingFallbackPage from "../fallbacks/LoadingFallbackPage";

const Error404Page = lazy(() => import("../fallbacks/Error404Page"));
const AdminListProviders = lazy(() => import("../../containers/admin/AdminListProviders"));
const UserListProvidersCardsPage = lazy(() => import("../user/UserListProvidersCardsPage"));

const ServiceProvidersPage = () => {
    const { isUser, isAdmin } = useAuth();

    const renderRoleDashboard = () => {
        if (isAdmin) return <AdminListProviders />;
        if (isUser) return <UserListProvidersCardsPage />;
        return <Error404Page />;
    };

    return (
        <Suspense fallback={<LoadingFallbackPage />}>
            {renderRoleDashboard()}
        </Suspense>
    );
}

export default ServiceProvidersPage;