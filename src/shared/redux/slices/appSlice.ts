import { appState } from "@/shared/interface/sliceInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resendOtp, signup, verifyEmail, verifyOtp } from "@/shared/apis/auth";

const initialState: appState = {
    lightTheme: true,
    sidebarOpen: true, // TODO make it starting with is
    filterSideBarOpen: true, // TODO make it starting with is
    isNotificationsOpen: false,
    forgotPassword: false,
    otpTimerIsRunning: false,
    otpExpiresAt: null,
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
    },
    extraReducers(builder) {
        builder.addCase(signup.pending, (state) => {
            state.otpTimerIsRunning = false;
        })
            .addCase(signup.fulfilled, (state) => {
                state.otpExpiresAt = Date.now() + 300000;
                state.otpTimerIsRunning = true;
            })
            .addCase(signup.rejected, (state) => {
                state.otpTimerIsRunning = false;
            });

        builder.addCase(verifyOtp.pending, () => { })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.otpExpiresAt = 0;
                state.otpTimerIsRunning = false;
            })
            .addCase(verifyOtp.rejected, () => { });

        builder.addCase(resendOtp.pending, (state) => {
            state.otpTimerIsRunning = false;
        })
            .addCase(resendOtp.fulfilled, (state) => {
                state.otpExpiresAt = Date.now() + 300 * 1000;
                state.otpTimerIsRunning = true;
            })
            .addCase(resendOtp.rejected, (state) => {
                state.otpTimerIsRunning = false;
            })
        builder.addCase(verifyEmail.pending, (state) => {
            state.otpTimerIsRunning = false;
        })
            .addCase(verifyEmail.fulfilled, (state) => {
                state.otpExpiresAt = Date.now() + 300000;
                state.otpTimerIsRunning = true;
            })
            .addCase(verifyEmail.rejected, (state) => {
                state.otpTimerIsRunning = false;
            })
    },
});

export const {
    toggleTheme,
    toggleSidebar,
    setForgotPassword,
    toggleFilterSideBar,
    toggleNotificationContainer
} = stateSlice.actions;

export default stateSlice.reducer;