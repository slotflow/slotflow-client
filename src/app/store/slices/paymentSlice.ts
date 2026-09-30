import { PaymentSlice } from '@/shared/types/slice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BillingCycle, PaymentProcessStatus, PaymentProcessType } from '@/shared/types/enums';

const initialState: PaymentSlice = {
  type: null,
  isPaymentModalOpen: false,
  bookingData: null,
  subscriptionData: null,
  status: PaymentProcessStatus.IDLE,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setBookingData: (
      state,
      action: PayloadAction<{
        providerId: string;
        slotId: string;
        slot: string;
        date: Date;
        selectedServiceMode: string;
      } | null>,
    ) => {
      state.bookingData = action.payload;
    },
    setPaymentSelectionOpen: (state, action: PayloadAction<PaymentProcessType>) => {
      state.type = action.payload;
      state.isPaymentModalOpen = true;
      state.status = PaymentProcessStatus.IDLE;
    },
    setPaymentSelectionClose: (state) => {
      state.type = null;
      state.isPaymentModalOpen = false;
      state.status = PaymentProcessStatus.IDLE;
    },
    setPaymentProcessStatus: (state, action: PayloadAction<PaymentProcessStatus>) => {
      state.status = action.payload;
    },
    setSubscriptionData: (
      state,
      action: PayloadAction<{
        planId: string;
        billingCycle: BillingCycle;
      } | null>,
    ) => {
      state.type = PaymentProcessType.SUBSCRIPTION;
      state.subscriptionData = action.payload;
    },
  },
});

export const {
  setBookingData,
  setPaymentSelectionOpen,
  setPaymentSelectionClose,
  setPaymentProcessStatus,
  setSubscriptionData,
} = paymentSlice.actions;

export default paymentSlice.reducer;
