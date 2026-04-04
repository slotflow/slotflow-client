import { toast } from "react-toastify";
import { appConfig, serviceConfig } from "../config/env";

export const handleGoogleLogin = ({ e, role }: { e: React.MouseEvent<HTMLButtonElement, MouseEvent>, role: string }) => {
    try {
        e.preventDefault();;
        window.location.href = `${serviceConfig.apiGatewayUrl + appConfig.version}/auth/google?role=${role}`;
    } catch (error) {
        toast.error("Failed to initiate Google login");
        console.error("Google login error:", error);
    }
}