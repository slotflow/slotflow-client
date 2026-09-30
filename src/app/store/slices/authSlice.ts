import { signin } from '@/services/apis/auth';
import { userUpdateInfo } from '@/services/apis/user';
import { createAddress } from '@/services/apis/address';
import { ApiBaseResponse } from '@/shared/types/common';
import { SigninResponse } from '@/shared/types/api/auth';
import { AuthState, AuthUser } from '@/shared/types/slice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminVerificationStatus } from '@/shared/types/enums';
import { UserUpdateUserInfoResponse } from '@/shared/types/api/user';
import { UserCreateAddressResponse } from '@/shared/types/api/address';
import { SubscriptionActivated } from '@/shared/types/api/subscription';
import { providerCreateServiceDetails } from '@/services/apis/providerService';
import { providerSubmitDetailsForReview } from '@/services/apis/providerProfile';
import { createServiceAvailabilities } from '@/services/apis/serviceAvailability';
import { ProviderSubmitDetailsResponse } from '@/shared/types/api/providerProfile';

const initialState: AuthState = {
  authUser: null,
  isAuthLoading: false,
  eventSocketId: null,
  eventSocketIsConnected: false,
  subscriptionUpdating: false,
  bookingUpdating: false,
  preboardingData: {
    selectedRole: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.authUser = action.payload;
    },
    setProfileImage: (state, action: PayloadAction<string>) => {
      if (state.authUser) {
        state.authUser.profileImage = action.payload;
      }
    },
    setAuthUserName: (state, action: PayloadAction<string>) => {
      if (state.authUser) {
        state.authUser.username = action.payload;
      }
    },
    setIsProofSubmitted: (state) => {
      if (state.authUser) {
        state.authUser.isProofSubmitted = {
          identityProof: true,
          serviceProof: true,
        };
      }
    },
    setAdminVerificationState: (state, action: PayloadAction<AdminVerificationStatus>) => {
      if (state.authUser) {
        state.authUser.adminVerificationStatus = action.payload;
      }
    },
    updateNotificationPreference: (state, action: PayloadAction<boolean>) => {
      if (state.authUser) {
        state.authUser.allowPushNotification = action.payload;
      }
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
        state.authUser.subscriptionStartDate = action.payload.currentPeriodStart;
        state.authUser.subscriptionEndDate = action.payload.currentPeriodEnd;
        state.authUser.subscriptionStatus = action.payload.subscriptionStatus;
        state.authUser.hasUsedTrial = action.payload.hasUsedTrial;
      }
    },
    setSubscriptionUpdating: (state, action: PayloadAction<boolean>) => {
      state.subscriptionUpdating = action.payload;
    },
    setBookingUpdating: (state, action: PayloadAction<boolean>) => {
      state.bookingUpdating = action.payload;
    },
    setBoardingData: (state, action: PayloadAction<Partial<AuthState['preboardingData']>>) => {
      state.preboardingData = { ...state.preboardingData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    // Sign In Api
    builder
      .addCase(signin.pending, () => {})
      .addCase(
        signin.fulfilled,
        (state, action: PayloadAction<ApiBaseResponse<SigninResponse>>) => {
          if (action.payload.data) {
            state.authUser = action.payload.data.user;
          }
        },
      )
      .addCase(signin.rejected, () => {});

    builder
      .addCase(createAddress.pending, (state) => {
        if (state.authUser) {
          state.authUser.isAddressAdded = false;
        }
      })
      .addCase(
        createAddress.fulfilled,
        (state, action: PayloadAction<ApiBaseResponse<UserCreateAddressResponse>>) => {
          if (state.authUser) {
            state.authUser.isAddressAdded = action.payload.success;
          }
        },
      )
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
      .addCase(
        userUpdateInfo.fulfilled,
        (state, action: PayloadAction<ApiBaseResponse<UserUpdateUserInfoResponse>>) => {
          if (state.authUser && action.payload.data) {
            state.authUser.username = action.payload.data.username;
            state.authUser.phone = action.payload.data.phone as string;
          }
        },
      )
      .addCase(userUpdateInfo.rejected, () => {});

    builder
      .addCase(providerSubmitDetailsForReview.pending, () => {})
      .addCase(
        providerSubmitDetailsForReview.fulfilled,
        (state, action: PayloadAction<ApiBaseResponse<ProviderSubmitDetailsResponse>>) => {
          if (state.authUser && action.payload.data) {
            state.authUser.adminVerificationStatus = action.payload.data.adminVerificationStatus;
          }
        },
      )
      .addCase(providerSubmitDetailsForReview.rejected, () => {});
  },
});

export const {
  setAuthUser,
  setProfileImage,
  setAuthUserName,
  setSubscription,
  setBoardingData,
  setIsProofSubmitted,
  setSubscriptionUpdating,
  setBookingUpdating,
  setEventSocketConnected,
  setAdminVerificationState,
  setEventSocketDisconnected,
  updateNotificationPreference,
} = authSlice.actions;

export default authSlice.reducer;
