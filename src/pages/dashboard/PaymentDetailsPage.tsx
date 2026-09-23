import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import PlanGuard from "@/router/PlanGuard";
import LoadingFallbackPage from "../fallbacks/LoadingFallbackPage";
import { RouteNames } from "@/shared/utils/constants/routeConstants";

const Error404Page = lazy(() => import("../fallbacks/Error404Page"));
const PaymentDetails = lazy(() => import("../../containers/dashboard/PaymentDetails"));

const PaymentDetailsPage = () => {
    const { isUser, isProvider, isAdmin } = useAuth();

    const renderRoleDashboard = () => {
        if (isProvider) {
            return (
                <PlanGuard routeName={RouteNames.PAYMENTS}>
                    <PaymentDetails />
                </PlanGuard>
            )
        }
        if (isUser || isAdmin) {
            return <PaymentDetails />;
        } else {
            return <Error404Page />
        }
    }

    return (
        <Suspense fallback={<LoadingFallbackPage />}>
            {renderRoleDashboard()}
        </Suspense>
    );
};

export default PaymentDetailsPage;