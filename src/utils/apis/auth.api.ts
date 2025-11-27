import { axiosInstance } from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiBaseResponse } from "../interface/commonInterface";
import { ResendOtpRequest, ResendOtpResponse, SigninRequest, SigninResponse, SignupRequest, SignupResponse, UpdatePasswordRequest, VerifyOtpRequest } from "../interface/api/authApiInterface";

export const signup = createAsyncThunk<SignupResponse, SignupRequest>('auth/signup',
    async (userData: SignupRequest) => {
            const response = await axiosInstance.post("/auth/signup", userData);
            return response.data;
    }
);

export const verifyOtp = createAsyncThunk<ApiBaseResponse,VerifyOtpRequest>("auth/verify-otp",
    async (authData: VerifyOtpRequest) => {
        const response = await axiosInstance.post('/auth/verify-otp', authData);
        return response.data;
    }
)

export const signin = createAsyncThunk<SigninResponse, SigninRequest>("auth/signin",
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

export const resendOtp = createAsyncThunk<ResendOtpResponse,ResendOtpRequest>("auth/resendOtp",
    async (authData: ResendOtpRequest) => {
        const response = await axiosInstance.post("/auth/resendOtp", authData);
        return response.data;
    }
)

export const updatePassword = createAsyncThunk<ApiBaseResponse,UpdatePasswordRequest>("auth/updatePassword",
    async (authData: UpdatePasswordRequest) => {
        const response = await axiosInstance.patch("/auth/password", authData);
        return response.data;
    }
)

export const checkUserStatus = createAsyncThunk("auth/checkUserStatus",
    async () => {
        await axiosInstance.post("/auth/status");
    }
);

// export const handleGoogleLogin = async () : Promise<any> => {
//     const response = axiosInstance.get()
// }