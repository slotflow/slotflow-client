import { signin, signout } from "@/shared/apis/auth";
import { createAddress } from "@/shared/apis/address";
import { SigninResponse } from "@/shared/interface/api/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminVerificationStatus, StripeAccountStatus } from "@/shared/interface/enums";
import { ApiBaseResponse } from "@/shared/interface/commonInterface";
import { AuthState, AuthUser } from "@/shared/interface/sliceInterface";
import { userUpdateInfo, userUpdateProfileImage } from "@/shared/apis/user";
import { SubscriptionActivated } from "@/shared/interface/api/subscription";
import { providerCreateServiceDetails } from "@/shared/apis/providerService";
import { providerSubmitDetailsForReview } from "@/shared/apis/providerProfile";
import { createServiceAvailabilities } from "@/shared/apis/serviceAvailability";
import { ProviderSubmitDetailsResponse } from "@/shared/interface/api/providerProfile";
import { UserUpdateProfileImageResponse, UserUpdateUserInfoResponse } from "@/shared/interface/api/user";

const initialState: AuthState = {
    authUser: null,
    isAuthLoading: false,
    profileImageUpdating: false,
    eventSocketId: null,
    eventSocketIsConnected: false,
    subscriptionUpdating: false,
    boardingData: {
        selectedRole: null,
        hearAboutUsOption: null,
        referralCode: null,
    },
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
        setStripeAccountId: (state, action: PayloadAction<string>) => {
            if (state.authUser) {
                state.authUser.stripeAccountId = action.payload;
            };
        },
        setStripeAccountStatus: (state, action: PayloadAction<StripeAccountStatus>) => {
            if (state.authUser) {
                state.authUser.stripeAccountStatus = action.payload;
            };
        },
        setIsProofSubmitted: (state) => {
            if (state.authUser) {
                state.authUser.isProofSubmitted = {
                    identityProof: true,
                    serviceProof: true
                };
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
        },
        setBoardingData: (state, action: PayloadAction<Partial<AuthState["boardingData"]>>) => {
            state.boardingData = { ...state.boardingData, ...action.payload };
        },
    },
    extraReducers: (builder) => {

        // Sign In Api
        builder
            .addCase(signin.pending, () => { })
            .addCase(signin.fulfilled, (state, action: PayloadAction<ApiBaseResponse<SigninResponse>>) => {
                if(action.payload.data) {
                    state.authUser = action.payload.data.user;
                }
            })
            .addCase(signin.rejected, () => { });

        // Sign Out Api
        builder
            .addCase(signout.pending, () => { })
            .addCase(signout.fulfilled, (state) => {
                state.authUser = null;
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
                if (state.authUser) {
                    state.authUser.isAddressAdded = false;
                }
            })
            .addCase(createAddress.fulfilled, (state, action: PayloadAction<ApiBaseResponse<any>>) => {
                if (state.authUser) {
                    state.authUser.isAddressAdded = action.payload.success;
                }
            })
            .addCase(createAddress.rejected, (state) => {
                if (state.authUser) {
                    state.authUser.isAddressAdded = false;
                }
            });

        builder
            .addCase(providerCreateServiceDetails.pending, () => {})
            .addCase(providerCreateServiceDetails.fulfilled, (state, action) => {
                if (state.authUser) {
                    state.authUser.isServiceDetailsAdded = action.payload.success;
                }
            })
            .addCase(providerCreateServiceDetails.rejected, () => {});

        builder
            .addCase(createServiceAvailabilities.pending, () => {})
            .addCase(createServiceAvailabilities.fulfilled, (state, action) => {
                if (state.authUser) {
                    state.authUser.isServiceAvailabilityAdded = action.payload.success;
                }
            })
            .addCase(createServiceAvailabilities.rejected, () => {});

        builder
            .addCase(userUpdateInfo.pending, () => {})
            .addCase(userUpdateInfo.fulfilled, (state, action: PayloadAction<ApiBaseResponse<UserUpdateUserInfoResponse>>) => {
                if (state.authUser && action.payload.data) {
                    state.authUser.username = action.payload.data.username;
                    state.authUser.phone = action.payload.data.phone as string;
                }
            })
            .addCase(userUpdateInfo.rejected, () => {});

        builder
            .addCase(providerSubmitDetailsForReview.pending, () => { })
            .addCase(providerSubmitDetailsForReview.fulfilled, (state, action: PayloadAction<ApiBaseResponse<ProviderSubmitDetailsResponse>>) => {
                if (state.authUser && action.payload.data) {
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
    setBoardingData,
    setGoogleConnect,
    setStripeAccountId,
    setIsProofSubmitted,
    setStripeAccountStatus,
    setSubscriptionUpdating,
    setEventSocketConnected,
    setAdminVerificationState,
    setEventSocketDisconnected,
    updateNotificationPreference,
} = authSlice.actions;

export default authSlice.reducer;
