import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import LoadingFallbackPage from "../fallbacks/LoadingFallbackPage";

const Error404Page = lazy(() => import("../fallbacks/Error404Page"));
const UserProviderDetails = lazy(() => import("../../containers/user/UserProviderDetails"));
const AdminProviderDetails = lazy(() => import("../../containers/admin/AdminProviderDetails"));

const ServiceProviderDetailsPage = () => {
    const { isAdmin, isUser } = useAuth();

    const renderRoleDashboard = () => {
        if (isAdmin) return <AdminProviderDetails />;
        if (isUser) return <UserProviderDetails />;
        return <Error404Page />
    }

    return (
        <Suspense fallback={<LoadingFallbackPage />}>
            {renderRoleDashboard()}
        </Suspense>
    );
};

export default ServiceProviderDetailsPage;