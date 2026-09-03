import { appState } from '@/shared/types/slice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { resendOtp, signup, verifyEmail, verifyOtp } from '@/services/apis/auth';

const initialState: appState = {
  lightTheme: true,
  isSidebarOpen: true,
  isFilterSideBarOpen: true,
  isNotificationsOpen: false,
  forgotPassword: false,
  otpTimerIsRunning: false,
  otpExpiresAt: null,
  isLiveChatBubbleOpen: false,
  boardingSteps: 2,
};

const stateSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.lightTheme = !state.lightTheme;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleFilterSideBar: (state) => {
      state.isFilterSideBarOpen = !state.isFilterSideBarOpen;
    },
    toggleNotificationContainer: (state) => {
      state.isNotificationsOpen = !state.isNotificationsOpen;
    },
    setForgotPassword: (state, action: PayloadAction<boolean>) => {
      state.forgotPassword = action.payload;
    },
    toggleLiveChatBubble: (state) => {
      state.isLiveChatBubbleOpen = !state.isLiveChatBubbleOpen;
    },
    updateBoardingStep: (state, action: PayloadAction<number>) => {
      state.boardingSteps = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signup.pending, (state) => {
        state.otpTimerIsRunning = false;
      })
      .addCase(signup.fulfilled, (state) => {
        state.otpExpiresAt = Date.now() + 300000;
        state.otpTimerIsRunning = true;
      })
      .addCase(signup.rejected, (state) => {
        state.otpTimerIsRunning = false;
      });

    builder
      .addCase(verifyOtp.pending, () => {})
      .addCase(verifyOtp.fulfilled, (state) => {
        state.otpExpiresAt = 0;
        state.otpTimerIsRunning = false;
      })
      .addCase(verifyOtp.rejected, () => {});

    builder
      .addCase(resendOtp.pending, (state) => {
        state.otpTimerIsRunning = false;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.otpExpiresAt = Date.now() + 300 * 1000;
        state.otpTimerIsRunning = true;
      })
      .addCase(resendOtp.rejected, (state) => {
        state.otpTimerIsRunning = false;
      });
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.otpTimerIsRunning = false;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.otpExpiresAt = Date.now() + 300000;
        state.otpTimerIsRunning = true;
      })
      .addCase(verifyEmail.rejected, (state) => {
        state.otpTimerIsRunning = false;
      });
  },
});

export const {
  toggleTheme,
  toggleSidebar,
  setForgotPassword,
  updateBoardingStep,
  toggleFilterSideBar,
  toggleLiveChatBubble,
  toggleNotificationContainer,
} = stateSlice.actions;

export default stateSlice.reducer;
