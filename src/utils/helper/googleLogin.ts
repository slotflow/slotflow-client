import { toast } from "react-toastify";

export const handleGoogleLogin = ({e, role}:{e: React.MouseEvent<HTMLButtonElement, MouseEvent>,role : string}) => {
    try {
        e.preventDefault();
        const apiUrl = import.meta.env.MODE === "development"
            ? import.meta.env.VITE_BACKEND_DEV_URL
            : import.meta.env.VITE_BACKEND_PRODUCTION_URL;
        window.location.href = `${apiUrl}/v1/auth/google?role=${role}`;
    } catch (error) {
        toast.error("Failed to initiate Google login");
        console.error("Google login error:", error);
    }
}