import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/utils/redux/appStore";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    
    const user = useSelector((store: RootState) => store.auth.authUser);

    if (!user) return <Navigate to="/login" />;

    return children;
};