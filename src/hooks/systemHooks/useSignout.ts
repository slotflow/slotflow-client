import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { signout } from '@/services/apis/auth';
import { useNavigate } from 'react-router-dom';
import { useSignoutReturn } from '@/shared/types/hooks';
import { redirectPaths } from '@/shared/utils/constants';
import { setAuthUser } from '@/app/store/slices/authSlice';
import { ApiBaseResponse, ApiError } from '@/shared/types/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppDispatch, persistAppStore } from '@/app/store/appStore';
import { disconnectEventSocket } from '@/services/socket/eventSocketThunk';
import { handleMutationError } from '@/shared/utils/helper/handleMutationError';

export const useSignout = (): useSignoutReturn => {

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const signoutMutation = useMutation<
    ApiBaseResponse,
    ApiError,
    void
  >({
    mutationFn: signout,
    onSuccess: async (res) => {
      if (res.success) {
        dispatch(disconnectEventSocket());
        dispatch({ type: 'RESET_STATE' });
        dispatch(setAuthUser(null));
        await persistAppStore.purge();
        queryClient.clear();
        queryClient.cancelQueries();
        toast.success(res.message);
        navigate(redirectPaths.LOGIN);
      }
    },
    onError: (error) => {
      handleMutationError(error, 'Signout failed.');
    },
  });

  return {
    userSignout: signoutMutation.mutate,
    isSigningOut: signoutMutation.isPending,
  };
};
