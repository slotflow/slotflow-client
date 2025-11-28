import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiBaseResponse } from "@/utils/interface/commonInterface";
import { AuthState, UserData } from "@/utils/interface/sliceInterface";
import { resendOtp, signin, signout, signup } from "@/utils/apis/auth.api";
import { UserUpdateUserInfoResponse } from "@/utils/interface/api/userApiInterface";
import { userUpdateUserInfo, userUpdateUserProfileImage } from "@/utils/apis/user.api";
import { ProviderUpdateProviderInfoResponse } from "@/utils/interface/api/providerApiInterface";
import { ResendOtpResponse, SigninResponse, SignupResponse } from "@/utils/interface/api/authApiInterface";
import { providerAddProviderAddress, providerAddProviderServiceAvailabilities, providerAddProviderServiceDetails, providerUpdateProviderInfo, providerUpdateProviderProfileImage } from "@/utils/apis/provider.api";

const initialState: AuthState = {
    authUser: null,
    profileImageUpdating: false,
    dataUpdating: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<UserData | null>) => {
            state.authUser = action.payload;
        },
        setProfileImage: (state, action: PayloadAction<string>) => {
            if (state.authUser) {
                state.authUser.profileImage = action.payload;
            }
        },
        updateAuthUserName: (state, action: PayloadAction<string>) => {
            if (state.authUser) {
                state.authUser.username = action.payload;
            }
        },
        updateProviderSubscription: (state, action: PayloadAction<string>) => {
            if (state.authUser) {
                state.authUser.providerSubscription = action.payload;
            }
        },
        updateGoogleConnect: (state) => {
            if (state.authUser) {
                state.authUser.googleConnected = true;
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
                    verificationToken: action.payload.authUser.verificationToken,
                    role: action.payload.authUser.role,
                };
            })
            .addCase(signup.rejected, (state: AuthState) => {
                state.authUser = null
            });

        // Sign In Api
        builder
            .addCase(signin.pending, () => { })
            .addCase(signin.fulfilled, (state, action: PayloadAction<SigninResponse>) => {
                state.authUser = action.payload.authUser;
            })
            .addCase(signin.rejected, () => { });

        // Resend Otp Ap
        builder
            .addCase(resendOtp.pending, () => { })
            .addCase(resendOtp.fulfilled, (state, action: PayloadAction<ResendOtpResponse>) => {
                state.authUser = {
                    ...state.authUser,
                    verificationToken: action.payload.authUser.verificationToken,
                    role: action.payload.authUser.role,
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
            .addCase(providerUpdateProviderProfileImage.pending, (state) => {
                state.profileImageUpdating = true;
            })
            .addCase(providerUpdateProviderProfileImage.fulfilled, (state, action) => {
                state.profileImageUpdating = false;
                if (state.authUser) {
                    state.authUser.profileImage = action.payload.data;
                }
            })
            .addCase(providerUpdateProviderProfileImage.rejected, (state) => {
                state.profileImageUpdating = false;
            });

        builder
            .addCase(userUpdateUserProfileImage.pending, (state) => {
                state.profileImageUpdating = true;
            })
            .addCase(userUpdateUserProfileImage.fulfilled, (state, action) => {
                state.profileImageUpdating = false;
                if (state.authUser) {
                    state.authUser.profileImage = action.payload.data;
                }
            })
            .addCase(userUpdateUserProfileImage.rejected, (state) => {
                state.profileImageUpdating = false;
            });

        // Provider address saving api
        builder
            .addCase(providerAddProviderAddress.pending, (state) => {
                state.dataUpdating = true;
                if (state.authUser) {
                    state.authUser.isAddressAdded = false;
                }
            })
            .addCase(providerAddProviderAddress.fulfilled, (state, action: PayloadAction<ApiBaseResponse>) => {
                state.dataUpdating = false;
                if (state.authUser) {
                    state.authUser.isAddressAdded = action.payload.success;
                }
            })
            .addCase(providerAddProviderAddress.rejected, (state) => {
                state.dataUpdating = false;
                if (state.authUser) {
                    state.authUser.isAddressAdded = false;
                }
            });

        builder
            .addCase(providerAddProviderServiceDetails.pending, (state) => {
                state.dataUpdating = true;
            })
            .addCase(providerAddProviderServiceDetails.fulfilled, (state, action) => {
                state.dataUpdating = false;
                if (state.authUser) {
                    state.authUser.isServiceDetailsAdded = action.payload.success;
                }
            })
            .addCase(providerAddProviderServiceDetails.rejected, (state) => {
                state.dataUpdating = false;
            });

        builder
            .addCase(providerAddProviderServiceAvailabilities.pending, (state) => {
                state.dataUpdating = true;
            })
            .addCase(providerAddProviderServiceAvailabilities.fulfilled, (state, action) => {
                state.dataUpdating = false;
                if (state.authUser) {
                    state.authUser.isServiceAvailabilityAdded = action.payload.success;
                }
            })
            .addCase(providerAddProviderServiceAvailabilities.rejected, (state) => {
                state.dataUpdating = false;
            });

        builder
            .addCase(providerUpdateProviderInfo.pending, (state) => {
                state.dataUpdating = true;
            })
            .addCase(providerUpdateProviderInfo.fulfilled, (state, action: PayloadAction<ProviderUpdateProviderInfoResponse>) => {
                state.dataUpdating = false;
                if (state.authUser) {
                    state.authUser.username = action.payload.data.username;
                    state.authUser.phone = action.payload.data.phone;
                }
            })
            .addCase(providerUpdateProviderInfo.rejected, (state) => {
                state.dataUpdating = false;
            });

        builder
            .addCase(userUpdateUserInfo.pending, (state) => {
                state.dataUpdating = true;
            })
            .addCase(userUpdateUserInfo.fulfilled, (state, action: PayloadAction<UserUpdateUserInfoResponse>) => {
                state.dataUpdating = false;
                if (state.authUser) {
                    state.authUser.username = action.payload.data.username;
                    state.authUser.phone = action.payload.data.phone;
                }
            })
            .addCase(userUpdateUserInfo.rejected, (state) => {
                state.dataUpdating = false;
            });
    },
});

export const {
    setAuthUser,
    setProfileImage,
    updateAuthUserName,
    updateProviderSubscription,
    updateGoogleConnect,
} = authSlice.actions;

export default authSlice.reducer;
