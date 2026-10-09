import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CommonIntegrationData,
  IntegrationSliceState,
  SetAllIntegrationsPayload,
  StripeIntegrationData,
} from '@/shared/types/slice';

const initialState: IntegrationSliceState = {
  googleCalendar: {
    isConnected: false,
    isConnecting: false,
  },
  stripe: {
    isConnecting: false,
    status: null,
  },
};

const integrationSlice = createSlice({
  name: 'googleSlice',
  initialState,
  reducers: {
    // google calendar
    setGoogleCalendarConnecting(state, action: PayloadAction<boolean>) {
      state.googleCalendar.isConnecting = action.payload;
    },
    setGoogleCalendarData(state, action: PayloadAction<Partial<CommonIntegrationData>>) {
      state.googleCalendar = {
        ...state.googleCalendar,
        ...action.payload,
      };
    },

    // stripe
    setStripeConnecting(state, action: PayloadAction<boolean>) {
      state.stripe.isConnecting = action.payload;
    },
    setStripeData(state, action: PayloadAction<Partial<StripeIntegrationData>>) {
      state.stripe = {
        ...state.stripe,
        ...action.payload,
      };
    },

    // all data
    setAllIntegrationsLoading(state, action: PayloadAction<boolean>) {
      state.googleCalendar.isConnecting = action.payload;
      state.stripe.isConnecting = action.payload;
    },
    setAllIntegrationsData(state, action: PayloadAction<SetAllIntegrationsPayload>) {
      if (action.payload.googleCalendar) {
        state.googleCalendar = {
          ...state.googleCalendar,
          ...action.payload.googleCalendar,
          isConnecting: false,
        };
      }
      if (action.payload.stripe) {
        state.stripe = {
          ...state.stripe,
          ...action.payload.stripe,
          isConnecting: false,
        };
      }
    },
  },
});

export const {
  setGoogleCalendarConnecting,
  setGoogleCalendarData,
  setStripeConnecting,
  setStripeData,
  setAllIntegrationsLoading,
  setAllIntegrationsData,
} = integrationSlice.actions;

export default integrationSlice.reducer;
