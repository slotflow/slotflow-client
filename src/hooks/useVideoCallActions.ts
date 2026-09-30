import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useAppNavigation } from "./useAppNavigation";
import { validateRoomId } from "@/services/apis/booking";
import { handleError } from "@/shared/utils/helper/handleError";
import { useVideoCallActionsReturn } from "@/shared/types/hooks";
import { ApiBaseResponse, ApiError } from "@/shared/types/common";
import { ValidateRoomIdRequest } from "@/shared/types/api/booking";


export const useJVideoCallActions = (): useVideoCallActionsReturn => {

    const { goTo } = useAppNavigation();

    const JoinCallLobbyMutation = useMutation<
        ApiBaseResponse,
        ApiError,
        ValidateRoomIdRequest
    >({
        mutationFn: async (data: ValidateRoomIdRequest) => {
            return await validateRoomId(data);
        },
        onSuccess: (res, variables) => {
            if (res.success) {
                toast.success(res.message || 'Redirecting to video call...');
                goTo(`/video-call-lobby/${variables.roomId}`);
            } else {
                toast.error(res.message || 'Invalid Room ID');
            }
        },
        onError: (error: ApiError) => {
            handleError(error, 'Invalid Request, please try again after sometimes.');
        },
    });

    return {
        JoinCallLobby: JoinCallLobbyMutation.mutate,
    };
};
