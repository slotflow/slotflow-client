import { signin, signout } from "@/shared/apis/auth";
import { SigninResponse } from "@/shared/interface/api/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminVerificationStatus } from "@/shared/interface/enums";
import { AuthState, AuthUser } from "@/shared/interface/sliceInterface";
import { UserUpdateProfileImageResponse, UserUpdateUserInfoResponse } from "@/shared/interface/api/user";
import { userUpdateInfo, userUpdateProfileImage } from "@/shared/apis/user";
import { SubscriptionActivated } from "@/shared/interface/api/subscription";
import { providerCreateServiceDetails } from "@/shared/apis/providerService";
import { createServiceAvailabilities } from "@/shared/apis/serviceAvailability";
import { ProviderSubmitDetailsResponse } from "@/shared/interface/api/provider";
import { providerSubmitDetailsForReview } from "@/shared/apis/providerProfile";
import { createAddress } from "@/shared/apis/address";
import { ApiBaseResponse } from "@/shared/interface/commonInterface";

const initialState: AuthState = {
    authUser: null,
    profileImageUpdating: false,
    dataUpdating: false,
    eventSocketId: null,
    eventSocketIsConnected: false,
    subscriptionUpdating: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<AuthUser | null>) => {
            state.authUser = action.payload;
        },
        setProfileImage: (state, action: PayloadAction<string>) => {
            if (state.authUser) {
                state.authUser.profileImage = action.payload;
            };
        },
        setAuthUserName: (state, action: PayloadAction<string>) => {
            if (state.authUser) {
                state.authUser.username = action.payload;
            };
        },
        setGoogleConnect: (state) => {
            if (state.authUser) {
                state.authUser.googleConnected = true;
            };
        },
        setStripeConnect: (state) => {
            if (state.authUser) {
                state.authUser.stripeConnected = true;
            };
        },
        setIsProofSubmitted: (state) => {
            if (state.authUser) {
                state.authUser.isProofSubmitted = true;
            };
        },
        setAdminVerificationState: (state, action: PayloadAction<AdminVerificationStatus>) => {
            if (state.authUser) {
                state.authUser.adminVerificationStatus = action.payload;
            };
        },
        updateNotificationPreference: (state, action: PayloadAction<boolean>) => {
            if (state.authUser) {
                state.authUser.allowPushNotification = action.payload;
            };
        },
        setEventSocketConnected: (state, action: PayloadAction<{ socketId: string }>) => {
            state.eventSocketId = action.payload.socketId;
            state.eventSocketIsConnected = true;
        },
        setEventSocketDisconnected: (state) => {
            state.eventSocketId = null;
            state.eventSocketIsConnected = false;
        },
        setSubscription: (state, action: PayloadAction<SubscriptionActivated>) => {
            if (state.authUser) {
                state.authUser.providerSubscription = action.payload.subscribedPlan;
                state.authUser.subscriptionStartDate = action.payload.startDate,
                    state.authUser.subscriptionEndDate = action.payload.endDate,
                    state.authUser.subscriptionStatus = action.payload.subscriptionStatus
            }
        },
        setSubscriptionUpdating: (state, action: PayloadAction<boolean>) => {
            state.subscriptionUpdating = action.payload;
        }
    },
    extraReducers: (builder) => {

        // Sign In Api
        builder
            .addCase(signin.pending, () => { })
            .addCase(signin.fulfilled, (state, action: PayloadAction<ApiBaseResponse<SigninResponse>>) => {
                state.authUser = action.payload.data;
            })
            .addCase(signin.rejected, () => { });

        // Sign Out Api
        builder
            .addCase(signout.pending, () => { })
            .addCase(signout.fulfilled, (state) => {
                state.authUser = null;
                state.dataUpdating = false;
                state.profileImageUpdating = false;
            })
            .addCase(signout.rejected, () => { });

        builder
            .addCase(userUpdateProfileImage.pending, (state) => {
                state.profileImageUpdating = true;
            })
            .addCase(userUpdateProfileImage.fulfilled, (state, action: PayloadAction<ApiBaseResponse<UserUpdateProfileImageResponse>>) => {
                state.profileImageUpdating = false;
                if (state.authUser) {
                    state.authUser.profileImage = action.payload.data as string;
                }
            })
            .addCase(userUpdateProfileImage.rejected, (state) => {
                state.profileImageUpdating = false;
            });

        builder
            .addCase(createAddress.pending, (state) => {
                state.dataUpdating = true;
                if (state.authUser) {
                    state.authUser.isAddressAdded = false;
                }
            })
            .addCase(createAddress.fulfilled, (state, action: PayloadAction<ApiBaseResponse<any>>) => {
                state.dataUpdating = false;
                if (state.authUser) {
                    state.authUser.isAddressAdded = action.payload.success;
                }
            })
            .addCase(createAddress.rejected, (state) => {
                state.dataUpdating = false;
                if (state.authUser) {
                    state.authUser.isAddressAdded = false;
                }
            });

        builder
            .addCase(providerCreateServiceDetails.pending, (state) => {
                state.dataUpdating = true;
            })
            .addCase(providerCreateServiceDetails.fulfilled, (state, action) => {
                state.dataUpdating = false;
                if (state.authUser) {
                    state.authUser.isServiceDetailsAdded = action.payload.success;
                }
            })
            .addCase(providerCreateServiceDetails.rejected, (state) => {
                state.dataUpdating = false;
            });

        builder
            .addCase(createServiceAvailabilities.pending, (state) => {
                state.dataUpdating = true;
            })
            .addCase(createServiceAvailabilities.fulfilled, (state, action) => {
                state.dataUpdating = false;
                if (state.authUser) {
                    state.authUser.isServiceAvailabilityAdded = action.payload.success;
                }
            })
            .addCase(createServiceAvailabilities.rejected, (state) => {
                state.dataUpdating = false;
            });

        builder
            .addCase(userUpdateInfo.pending, (state) => {
                state.dataUpdating = true;
            })
            .addCase(userUpdateInfo.fulfilled, (state, action: PayloadAction<ApiBaseResponse<UserUpdateUserInfoResponse>>) => {
                state.dataUpdating = false;
                if (state.authUser) {
                    state.authUser.username = action.payload.data.username;
                    state.authUser.phone = action.payload.data.phone as string;
                }
            })
            .addCase(userUpdateInfo.rejected, (state) => {
                state.dataUpdating = false;
            });

        builder
            .addCase(providerSubmitDetailsForReview.pending, () => { })
            .addCase(providerSubmitDetailsForReview.fulfilled, (state, action: PayloadAction<ApiBaseResponse<ProviderSubmitDetailsResponse>>) => {
                state.dataUpdating = false;
                if (state.authUser) {
                    state.authUser.adminVerificationStatus = action.payload.data.adminVerificationStatus;
                }
            })
            .addCase(providerSubmitDetailsForReview.rejected, () => { });
    },
});

export const {
    setAuthUser,
    setProfileImage,
    setAuthUserName,
    setSubscription,
    setStripeConnect,
    setGoogleConnect,
    setIsProofSubmitted,
    setSubscriptionUpdating,
    setEventSocketConnected,
    setAdminVerificationState,
    setEventSocketDisconnected,
    updateNotificationPreference,
} = authSlice.actions;

export default authSlice.reducer;
