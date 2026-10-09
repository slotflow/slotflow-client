import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { signout } from '@/services/apis/auth';
import { useAppNavigation } from '../useAppNavigation';
import { useSignoutReturn } from '@/shared/types/hooks';
import { setAuthUser } from '@/app/store/slices/authSlice';
import { handleError } from '@/shared/utils/helper/handleError';
import { ApiBaseResponse, ApiError } from '@/shared/types/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppDispatch, persistAppStore } from '@/app/store/appStore';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';
import { disconnectChatSocket } from '@/services/socket/chatSocketThunk';
import { disconnectEventSocket } from '@/services/socket/eventSocketThunk';

export const useSignout = (): useSignoutReturn => {
  const { goTo } = useAppNavigation();
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const signoutMutation = useMutation<ApiBaseResponse, ApiError, void>({
    mutationFn: signout,
    onSuccess: async (res) => {
      if (res.success) {
        dispatch(disconnectEventSocket());
        dispatch(disconnectChatSocket());
        dispatch({ type: 'RESET_STATE' });
        dispatch(setAuthUser(null));
        await persistAppStore.purge();
        queryClient.clear();
        queryClient.cancelQueries();
        toast.success(res.message);
        goTo(redirectPaths.LOGIN);
      }
    },
    onError: (error) => {
      handleError(error, 'Signout failed.');
    },
  });

  return {
    userSignout: signoutMutation.mutate,
    isSigningOut: signoutMutation.isPending,
  };
};
