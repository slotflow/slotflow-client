import {
  SigninRequest,
  SignupRequest,
  SigninResponse,
  VerifyOtpRequest,
  VerifyEmailRequest,
  ResetPasswordRequest,
} from '../../shared/types/api/auth';
import { axiosInstance } from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { resetAuthSession } from '@/lib/axiosInterceptor';
import { ApiBaseResponse } from '../../shared/types/common';

export const signup = createAsyncThunk<ApiBaseResponse, SignupRequest>(
  'auth/signup',
  async (userData: SignupRequest) => {
    const response = await axiosInstance.post('/auth/signup', userData, {
      skipAuthRefresh: true,
    });
    return response.data;
  },
);

export const verifyOtp = createAsyncThunk<ApiBaseResponse, VerifyOtpRequest>(
  'auth/verify-otp',
  async (authData: VerifyOtpRequest) => {
    const response = await axiosInstance.post('/auth/verify-otp', authData, {
      skipAuthRefresh: true,
    });
    return response.data;
  },
);

export const resendOtp = createAsyncThunk<ApiBaseResponse>('auth/resend-otp', async () => {
  const response = await axiosInstance.post('/auth/resendOtp', undefined, {
    skipAuthRefresh: true,
  });
  return response.data;
});

export const verifyEmail = createAsyncThunk<ApiBaseResponse, VerifyEmailRequest>(
  'auth/verifyEmail',
  async (authData: VerifyEmailRequest) => {
    const response = await axiosInstance.post('/auth/verify-email', authData, {
      skipAuthRefresh: true,
    });
    return response.data;
  },
);

export const verifyResetOtp = createAsyncThunk<ApiBaseResponse, VerifyOtpRequest>(
  'auth/verify-reset-otp',
  async (authData: VerifyOtpRequest) => {
    const response = await axiosInstance.post('/auth/verify-reset-otp', authData, {
      skipAuthRefresh: true,
    });
    return response.data;
  },
);

export const resetPassword = createAsyncThunk<ApiBaseResponse, ResetPasswordRequest>(
  'auth/updatePassword',
  async (authData: ResetPasswordRequest) => {
    const response = await axiosInstance.patch('/auth/password', authData, {
      skipAuthRefresh: true,
    });
    return response.data;
  },
);

export const signin = createAsyncThunk<ApiBaseResponse<SigninResponse>, SigninRequest>(
  'auth/signin',
  async (userData: SigninRequest) => {
    const response = await axiosInstance.post('/auth/signin', userData, {
      skipAuthRefresh: true,
    });
    if (response.data.success) {
      resetAuthSession();
    }
    return response.data;
  },
);

export const signout = async (): Promise<ApiBaseResponse> => {
  const response = await axiosInstance.post('/auth/signout', undefined, {
    skipAuthRefresh: true,
  });
  return response.data;
};
