import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, AuthUser } from "@/utils/interface/sliceInterface";
import { resendOtp, signin, signout, signup } from "@/utils/apis/auth.api";
import { userUpdateInfo, userUpdateProfileImage } from "@/utils/apis/user.api";
import { UserUpdateUserInfoResponse } from "@/utils/interface/api/userApiInterface";
import { ApiBaseResponse } from "@/utils/interface/commonInterface";
import { ResendOtpResponse, SigninResponse, SignupResponse } from "@/utils/interface/api/authApiInterface";
import { ProviderSubmitDetailsResponse, ProviderUpdateProviderInfoResponse } from "@/utils/interface/api/providerApiInterface";
import { providerCreateAddress, providerCreateServiceAvailabilities, providerCreateServiceDetails, providerSubmitDetailsForReview, providerUpdateInfo, providerUpdateProfileImage } from "@/utils/apis/provider.api";
import { AdminVerificationStatus } from "@/utils/interface/enums";

const initialState: AuthState = {
    authUser: null,
    profileImageUpdating: false,
    dataUpdating: false,
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
            }
        },
        setAuthUserName: (state, action: PayloadAction<string>) => {
            if (state.authUser) {
                state.authUser.username = action.payload;
            }
        },
        setProviderSubscription: (state, action: PayloadAction<string>) => {
            if (state.authUser) {
                state.authUser.providerSubscription = action.payload;
            }
        },
        setGoogleConnect: (state) => {
            if (state.authUser) {
                state.authUser.googleConnected = true;
            }
        },
        setIsProofSubmitted: (state) => {
            if(state.authUser) {
                state.authUser.isProofSubmitted = true;
            }
        },
        setAdminVerificationState: (state, action: PayloadAction<AdminVerificationStatus>) => {
            if(state.authUser) {
                state.authUser.adminVerificationStatus = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        // Sign Up Api
        builder
            .addCase(signup.pending, (state: AuthState) => {
                state.authUser = null
            })
            .addCase(signup.fulfilled, (state: AuthState, action: PayloadAction<SignupResponse>) => {
                state.authUser = {
                    ...state.authUser,
                    verificationToken: action.payload.data.verificationToken,
                    role: action.payload.data.role,
                };
            })
            .addCase(signup.rejected, (state: AuthState) => {
                state.authUser = null
            });

        // Sign In Api
        builder
            .addCase(signin.pending, () => { })
            .addCase(signin.fulfilled, (state, action: PayloadAction<SigninResponse>) => {
                state.authUser = action.payload.data;
            })
            .addCase(signin.rejected, () => { });

        // Resend Otp Ap
        builder
            .addCase(resendOtp.pending, () => { })
            .addCase(resendOtp.fulfilled, (state, action: PayloadAction<ResendOtpResponse>) => {
                state.authUser = {
                    ...state.authUser,
                    verificationToken: action.payload.data.verificationToken,
                    role: action.payload.data.role,
                };
            })
            .addCase(resendOtp.rejected, () => { });

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
            .addCase(providerUpdateProfileImage.pending, (state) => {
                state.profileImageUpdating = true;
            })
            .addCase(providerUpdateProfileImage.fulfilled, (state, action) => {
                state.profileImageUpdating = false;
                if (state.authUser) {
                    state.authUser.profileImage = action.payload.data;
                }
            })
            .addCase(providerUpdateProfileImage.rejected, (state) => {
                state.profileImageUpdating = false;
            });

        builder
            .addCase(userUpdateProfileImage.pending, (state) => {
                state.profileImageUpdating = true;
            })
            .addCase(userUpdateProfileImage.fulfilled, (state, action) => {
                state.profileImageUpdating = false;
                if (state.authUser) {
                    state.authUser.profileImage = action.payload.data;
                }
            })
            .addCase(userUpdateProfileImage.rejected, (state) => {
                state.profileImageUpdating = false;
            });

        // Provider address saving api
        builder
            .addCase(providerCreateAddress.pending, (state) => {
                state.dataUpdating = true;
                if (state.authUser) {
                    state.authUser.isAddressAdded = false;
                }
            })
            .addCase(providerCreateAddress.fulfilled, (state, action: PayloadAction<ApiBaseResponse>) => {
                state.dataUpdating = false;
                if (state.authUser) {
                    state.authUser.isAddressAdded = action.payload.success;
                }
            })
            .addCase(providerCreateAddress.rejected, (state) => {
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
            .addCase(providerCreateServiceAvailabilities.pending, (state) => {
                state.dataUpdating = true;
            })
            .addCase(providerCreateServiceAvailabilities.fulfilled, (state, action) => {
                state.dataUpdating = false;
                if (state.authUser) {
                    state.authUser.isServiceAvailabilityAdded = action.payload.success;
                }
            })
            .addCase(providerCreateServiceAvailabilities.rejected, (state) => {
                state.dataUpdating = false;
            });

        builder
            .addCase(providerUpdateInfo.pending, (state) => {
                state.dataUpdating = true;
            })
            .addCase(providerUpdateInfo.fulfilled, (state, action: PayloadAction<ProviderUpdateProviderInfoResponse>) => {
                state.dataUpdating = false;
                if (state.authUser) {
                    state.authUser.username = action.payload.data.username;
                    state.authUser.phone = action.payload.data.phone;
                }
            })
            .addCase(providerUpdateInfo.rejected, (state) => {
                state.dataUpdating = false;
            });

        builder
            .addCase(userUpdateInfo.pending, (state) => {
                state.dataUpdating = true;
            })
            .addCase(userUpdateInfo.fulfilled, (state, action: PayloadAction<UserUpdateUserInfoResponse>) => {
                state.dataUpdating = false;
                if (state.authUser) {
                    state.authUser.username = action.payload.data.username;
                    state.authUser.phone = action.payload.data.phone;
                }
            })
            .addCase(userUpdateInfo.rejected, (state) => {
                state.dataUpdating = false;
            });

        builder
            .addCase(providerSubmitDetailsForReview.pending, () => {})
            .addCase(providerSubmitDetailsForReview.fulfilled, (state, action: PayloadAction<ProviderSubmitDetailsResponse>) => {
                state.dataUpdating = false;
                if (state.authUser) {
                    state.authUser.adminVerificationStatus = action.payload.data.adminVerificationStatus;
                }
            })
            .addCase(providerSubmitDetailsForReview.rejected, () => {});
    },
});

export const {
    setAuthUser,
    setProfileImage,
    setAuthUserName,
    setProviderSubscription,
    setGoogleConnect,
    setIsProofSubmitted,
    setAdminVerificationState
} = authSlice.actions;

export default authSlice.reducer;
