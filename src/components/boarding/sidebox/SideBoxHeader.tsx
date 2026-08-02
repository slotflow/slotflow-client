import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/shared/config/env";
import { RootState } from "@/shared/redux/appStore";
import { LoaderCircle, LogOut } from "lucide-react";
import ThemeToggler from "@/components/common/ThemeToggler";
import { useSignout } from "@/hooks/systemHooks/useSignout";
import { defaultButtonClassName, redirectPaths } from "@/shared/utils/constants";

const SideBoxHeader = () => {

    const navigate = useNavigate();
    const { signoutHandler } = useSignout();
    const user = useSelector((store: RootState) => store.auth.authUser);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignout = async () => {
        setIsLoading(true);
        try {
            const res = await signoutHandler();
            if (res.success) {
                toast.success(res.message);
                navigate(redirectPaths.LOGIN);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.error("Error during signout:", error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-3xl font-black text-[var(--mainColor)] italic">
                    Slotflow
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                    onboarding
                </p>
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggler />
                {user && (
                    <Button
                        title="Logout"
                        variant="default"
                        onClick={handleSignout}
                        className={defaultButtonClassName}
                        disabled={isLoading}
                    >{isLoading ?
                        <LoaderCircle className="animate-spin w-4 h-4" />
                        :
                        <LogOut className="w-4 h-4" />
                        }
                        Logout
                    </Button>
                )}
            </div>
        </div>
    )
}

export default SideBoxHeader;