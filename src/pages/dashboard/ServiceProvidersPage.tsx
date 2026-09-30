import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import LoadingFallbackPage from "../fallbacks/LoadingFallbackPage";

const Error404Page = lazy(() => import("../fallbacks/Error404Page"));
const UserListProvidersCards = lazy(() => import("../../containers/user/UserListProvidersCards"));
const AdminListProviders = lazy(() => import("../../containers/admin/AdminListProviders"));

const ServiceProvidersPage = () => {
    const { isUser, isAdmin } = useAuth();

    const renderRoleDashboard = () => {
        if (isAdmin) return <AdminListProviders />;
        if (isUser) return <UserListProvidersCards />;
        return <Error404Page />;
    };

    return (
        <Suspense fallback={<LoadingFallbackPage />}>
            {renderRoleDashboard()}
        </Suspense>
    );
}

export default ServiceProvidersPage;