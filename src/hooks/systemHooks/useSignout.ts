import { useDispatch } from "react-redux";
import { signout } from "@/shared/apis/auth";
import { appConfig } from "@/shared/config/env";
import { useQueryClient } from "@tanstack/react-query";
import { ApiBaseResponse } from "@/shared/interface/commonInterface";
import { AppDispatch, persistAppStore } from "@/shared/redux/appStore";
import { disconnectEventSocket } from "@/shared/socket/eventSocketThunk";

export interface useSignoutReturnType {
    signoutHandler: () => Promise<ApiBaseResponse>;
}

export const useSignout = (): useSignoutReturnType => {

    const dispatch = useDispatch<AppDispatch>();
    const queryClient = useQueryClient();

    const signoutHandler = async () => {
        try {
            const res = await dispatch(signout()).unwrap();
            if (res.success) {
                dispatch(disconnectEventSocket());
                dispatch({ type: 'RESET_STATE' });
                await persistAppStore.purge();
                queryClient.clear();
                queryClient.cancelQueries();
            }
            return res;
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.log("Error in signout: ", error);
            }
            return { success: false, message: "Signout failed" };
        }
    };

    return { signoutHandler }
}