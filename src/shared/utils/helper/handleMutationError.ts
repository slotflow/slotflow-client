import { toast } from 'react-toastify';
import { appConfig } from '@/config/env';
import { ApiError } from '@/shared/types/common';

export const handleMutationError = (
  error: ApiError | unknown,
  fallbackMessage: string = 'Operation failed. Please try again.',
) => {
  const apiError = error as ApiError;
  const backendMessage = apiError.response?.data?.message;

  if (appConfig.isDevelopment) {
    console.error('[Mutation Error]:', error);
  }

  if (!apiError.response) {
    toast.error(backendMessage || fallbackMessage);
  }
};
