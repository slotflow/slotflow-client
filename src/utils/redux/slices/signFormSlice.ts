import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignUpFormStateVariables } from "@/utils/interface/sliceInterface";
import { resendOtp, signin, signup, verifyOtp, updatePassword } from '../../apis/auth.api'

const initialState: SignUpFormStateVariables = {
    forgotPassword: false,
    otpRemainingTime: 0,
    otpTimerIsRunning: false,
    loading: false,
}

const signFormSlice = createSlice({
    name: "signForm",
    initialState,
    reducers: {
        setForgotPassword: (state: SignUpFormStateVariables, action: PayloadAction<boolean>) => {
            state.forgotPassword = action.payload;
        },
        startTimer: (state: SignUpFormStateVariables, action: PayloadAction<number>) => {
            state.otpRemainingTime = action.payload;
            state.otpTimerIsRunning = true;
        },
        updateTimer: (state: SignUpFormStateVariables) => {
            if (state.otpRemainingTime > 0 && state.otpTimerIsRunning) {
                state.otpRemainingTime -= 1;
            } else {
                state.otpTimerIsRunning = false;
            }
        },
        stopTimer: (state: SignUpFormStateVariables) => {
            state.otpTimerIsRunning = false;
        },
        clearSignFormSlice: (state) => {
            state.forgotPassword = false;
            state.otpRemainingTime = 0;
            state.otpTimerIsRunning = false;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state: SignUpFormStateVariables) => {
                state.loading = true;
            })
            .addCase(signup.fulfilled, (state: SignUpFormStateVariables) => {
                state.loading = false;
            })
            .addCase(signup.rejected, (state: SignUpFormStateVariables) => {
                state.loading = false;
            });

        builder
            .addCase(signin.pending, (state: SignUpFormStateVariables) => {
                state.loading = true;
            })
            .addCase(signin.fulfilled, (state: SignUpFormStateVariables) => {
                state.loading = false;
            })
            .addCase(signin.rejected, (state: SignUpFormStateVariables) => {
                state.loading = false;
            });

        builder
            .addCase(verifyOtp.pending, (state: SignUpFormStateVariables) => {
                state.loading = true;
            })
            .addCase(verifyOtp.fulfilled, (state: SignUpFormStateVariables) => {
                state.loading = false;
            })
            .addCase(verifyOtp.rejected, (state: SignUpFormStateVariables) => {
                state.loading = false;
            });

        builder
            .addCase(resendOtp.pending, (state: SignUpFormStateVariables) => {
                state.loading = true;
            })
            .addCase(resendOtp.fulfilled, (state: SignUpFormStateVariables) => {
                state.loading = false;
            })
            .addCase(resendOtp.rejected, (state: SignUpFormStateVariables) => {
                state.loading = false;
            });

        builder
            .addCase(updatePassword.pending, (state: SignUpFormStateVariables) => {
                state.loading = true;
            })
            .addCase(updatePassword.fulfilled, (state: SignUpFormStateVariables) => {
                state.loading = false;
            })
            .addCase(updatePassword.rejected, (state: SignUpFormStateVariables) => {
                state.loading = false;
            })
    },
});

export const {
    stopTimer,
    startTimer,
    updateTimer,
    setForgotPassword,
    clearSignFormSlice,
} = signFormSlice.actions;

export default signFormSlice.reducer;