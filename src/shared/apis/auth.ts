import { axiosInstance } from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiBaseResponse } from "../interface/commonInterface";
import { SigninRequest, SigninResponse, SignupRequest, UpdatePasswordRequest, VerifyEmailRequest, VerifyOtpRequest } from "../interface/api/auth";

export const signup = createAsyncThunk<ApiBaseResponse, SignupRequest>('auth/signup',
    async (userData: SignupRequest) => {
        const response = await axiosInstance.post("/auth/signup", userData);
        return response.data;
    }
);

export const verifyOtp = createAsyncThunk<ApiBaseResponse, VerifyOtpRequest>("auth/verify-otp",
    async (authData: VerifyOtpRequest) => {
        const response = await axiosInstance.post('/auth/verify-otp', authData);
        return response.data;
    }
)

export const resendOtp = createAsyncThunk<ApiBaseResponse>("auth/resendOtp",
    async () => {
        const response = await axiosInstance.post("/auth/resendOtp");
        return response.data;
    }
)

export const signin = createAsyncThunk<ApiBaseResponse<SigninResponse>, SigninRequest>("auth/signin",
    async (userData: SigninRequest) => {
        const response = await axiosInstance.post('/auth/signin', userData);
        return response.data;
    }
)

export const signout = createAsyncThunk<ApiBaseResponse>("auth/signOut",
    async () => {
        const response = await axiosInstance.post('/auth/signout');
        return response.data;
    }
)

export const verifyEmail = createAsyncThunk<ApiBaseResponse, VerifyEmailRequest>("auth/verifyEmail",
    async (authData: VerifyEmailRequest) => {
        const response = await axiosInstance.post('/auth/verify-email', authData);
        return response.data;
    }
)

export const updatePassword = createAsyncThunk<ApiBaseResponse, UpdatePasswordRequest>("auth/updatePassword",
    async (authData: UpdatePasswordRequest) => {
        const response = await axiosInstance.patch("/auth/password", authData);
        return response.data;
    }
)
