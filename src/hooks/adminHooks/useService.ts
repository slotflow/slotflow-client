import { appConfig } from '@/config/env';
import { useQueryClient } from '@tanstack/react-query';
import { ApiBaseResponse } from '@/shared/types/common';
import { UseAdminServiceReturn } from '@/shared/types/hooks';
import { changeServiceBlockStatus } from '@/services/apis/service';
import { ChangeServiceBlockStatusRequest } from '@/shared/types/api/service';

export const useAdminService = (): UseAdminServiceReturn => {
  const queryClient = useQueryClient();

  const changeServiceStatus = async (
    data: ChangeServiceBlockStatusRequest,
  ): Promise<ApiBaseResponse> => {
    try {
      const res = await changeServiceBlockStatus(data);
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['appServices'] });
      }
      return res;
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log('Error while changing service status:', error);
      }
      return { success: false, message: 'Please try again' };
    }
  };

  return {
    changeServiceStatus,
  };
};
