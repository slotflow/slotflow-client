import { axiosInstance } from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiBaseResponse } from "../interface/commonInterface";
import { ProviderSubscriptionUpdatedPayload, ResendOtpRequest, ResendOtpResponse, SigninRequest, SigninResponse, SignupRequest, SignupResponse, UpdatePasswordRequest, VerifyOtpRequest } from "../interface/api/authApiInterface";
import { RootState } from "../redux/appStore";
import { createEventSocket, destroyEventSocket } from "@/lib/socketService";
import { serviceConfig } from "../env";
import { setEventSocketConnected, setEventSocketDisconnected, setSubscription } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

export const signup = createAsyncThunk<SignupResponse, SignupRequest>('auth/signup',
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

export const signin = createAsyncThunk<SigninResponse, SigninRequest>("auth/signin",
    async (userData: SigninRequest) => {
        console.log("auth singin api calling");
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

export const resendOtp = createAsyncThunk<ResendOtpResponse, ResendOtpRequest>("auth/resendOtp",
    async (authData: ResendOtpRequest) => {
        const response = await axiosInstance.post("/auth/resendOtp", authData);
        return response.data;
    }
)

export const updatePassword = createAsyncThunk<ApiBaseResponse, UpdatePasswordRequest>("auth/updatePassword",
    async (authData: UpdatePasswordRequest) => {
        const response = await axiosInstance.patch("/auth/password", authData);
        return response.data;
    }
)

export const connectEventSocket = createAsyncThunk<void, void, { state: RootState }>("event/connectSocket",
    async (_, { getState, dispatch }) => {

        console.log("Connecting event socket");
        const authUser = getState().auth.authUser;
        if (!authUser) return;
        console.log("url : ", serviceConfig.apiGatewayUrl);
        const eventSocket = createEventSocket("http://localhost:3000");
        console.log("eventSocket : ",eventSocket);
        console.log("eventSocket.listeners : ",eventSocket.listeners);

        if (!eventSocket.hasListeners("connect")) {
            eventSocket.on("connect", () => {
                console.log("Event eventSocket connected");
                dispatch(setEventSocketConnected({ socketId: eventSocket.id as string }));
            });
        }

        if (!eventSocket.hasListeners("disconnect")) {
            eventSocket.on("disconnect", () => {
                console.log("Event eventSocket disconnected");
                dispatch(setEventSocketDisconnected());
            });
        }

        if (authUser && !eventSocket.hasListeners("connect")) {
            eventSocket.io.on("reconnect", () => {
                console.log("Event eventSocket reconnected");
                dispatch(setEventSocketConnected({ socketId: eventSocket.id as string }));
            });
        }

        if (!eventSocket.hasListeners("subscription:activated")) {
            eventSocket.on("subscription:activated", (payload: ProviderSubscriptionUpdatedPayload) => {
                console.log("Event eventSocket subscription activated");
                const isOwner = payload.providerId === authUser.uid;
                const isExpired = new Date(payload.endDate) < new Date();

                if (isOwner && isExpired) {
                    toast.error("Your subscription has expired.");
                } else if (isOwner) {
                    toast.success("Subscription Activated!");
                }
                dispatch(setSubscription(payload));
            });
        }

    }
);

export const disconnectEventSocket = createAsyncThunk<void>("event/disconnectSocket",
    async (_, { dispatch }) => {
        console.log("Disconnecting event socket");
        destroyEventSocket();
        dispatch(setEventSocketDisconnected());
    }
);