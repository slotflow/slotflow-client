import { appState } from "@/shared/interface/sliceInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resendOtp, signup, verifyEmail, verifyOtp } from "@/shared/apis/auth";

const initialState: appState = {
    lightTheme: true,
    sidebarOpen: true, // TODO make it starting with is
    filterSideBarOpen: true, // TODO make it starting with is
    isNotificationsOpen: false,
    forgotPassword: false,
    otpRemainingTime: 0,
    otpTimerIsRunning: false,
}

const stateSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.lightTheme = !state.lightTheme;
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        toggleFilterSideBar: (state) => {
            state.filterSideBarOpen = !state.filterSideBarOpen;
        },
        toggleNotificationContainer: (state) => {
            state.isNotificationsOpen = !state.isNotificationsOpen;
        },
        setForgotPassword: (state, action: PayloadAction<boolean>) => {
            state.forgotPassword = action.payload;
        },
        updateTimer: (state) => {
            if (state.otpRemainingTime > 0 && state.otpTimerIsRunning) {
                state.otpRemainingTime -= 1;
            } else {
                state.otpTimerIsRunning = false;
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(signup.pending, (state) => {
            state.otpRemainingTime = 0;
            state.otpTimerIsRunning = false;
        })
            .addCase(signup.fulfilled, (state) => {
                state.otpRemainingTime = 300;
                state.otpTimerIsRunning = true;
            })
            .addCase(signup.rejected, (state) => {
                state.otpRemainingTime = 0;
                state.otpTimerIsRunning = false;
            });

        builder.addCase(verifyOtp.pending, () => { })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.otpRemainingTime = 0;
                state.otpTimerIsRunning = false;
            })
            .addCase(verifyOtp.rejected, () => { });

        builder.addCase(resendOtp.pending, (state) => {
            state.otpRemainingTime = 0;
            state.otpTimerIsRunning = false;
        })
            .addCase(resendOtp.fulfilled, (state) => {
                state.otpRemainingTime = 300;
                state.otpTimerIsRunning = true;
            })
            .addCase(resendOtp.rejected, (state) => {
                state.otpRemainingTime = 0;
                state.otpTimerIsRunning = false;
            })
        builder.addCase(verifyEmail.pending, (state) => {
            state.otpRemainingTime = 0;
            state.otpTimerIsRunning = false;
        })
            .addCase(verifyEmail.fulfilled, (state) => {
                state.otpRemainingTime = 300;
                state.otpTimerIsRunning = true;
            })
            .addCase(verifyEmail.rejected, (state) => {
                state.otpRemainingTime = 0;
                state.otpTimerIsRunning = false;
            })
    },
});

export const {
    updateTimer,
    toggleTheme,
    toggleSidebar,
    setForgotPassword,
    toggleFilterSideBar,
    toggleNotificationContainer
} = stateSlice.actions;

export default stateSlice.reducer;