import { useSelector } from "react-redux";
import { Role } from "@/shared/types/enums";
import { RootState } from "@/app/store/appStore";
import { UseAuthReturn } from "@/shared/types/hooks";

export const useAuth = (): UseAuthReturn => {

    const { authUser } = useSelector((state: RootState) => state.auth);
    console.log("authUser : ",authUser);
    const isLoggedIn = Boolean(authUser?.isLoggedIn || authUser);
    const userRole = authUser?.role ?? null;

    return {
        user: authUser ?? null,
        role: userRole,
        isLoggedIn,
        isAdmin: authUser?.role === Role.ADMIN,
        isProvider: authUser?.role === Role.PROVIDER,
        isUser: authUser?.role === Role.USER,
    }
}