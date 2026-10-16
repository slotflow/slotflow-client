import { appStore } from '@/app/store/appStore';
import { setAuthUser } from '@/app/store/slices/authSlice';
import { setAuthExpiredHandler } from '@/lib/axiosInterceptor';

export const setupAuthInterceptor = () => {
  setAuthExpiredHandler(() => {
    appStore.dispatch(setAuthUser(null));
  });
};
