import { appConfig } from '@/config/env';
import { useDispatch } from 'react-redux';
import { signout } from '@/services/apis/auth';
import { useQueryClient } from '@tanstack/react-query';
import { useSignoutReturn } from '@/shared/types/hooks';
import { AppDispatch, persistAppStore } from '@/app/store/appStore';
import { disconnectEventSocket } from '@/services/socket/eventSocketThunk';

export const useSignout = (): useSignoutReturn => {
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
        console.log('Error in signout: ', error);
      }
      return { success: false, message: 'Signout failed' };
    }
  };

  return { signoutHandler };
};
