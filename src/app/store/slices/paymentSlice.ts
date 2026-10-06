import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentSlice } from '@/shared/types/slice';
import { BillingCycle, PaymentProcessStatus, PaymentProcessType } from '@/shared/types/enums';

const initialState: PaymentSlice = {
  type: null,
  isPaymentModalOpen: false,
  subscriptionData: null,
  status: PaymentProcessStatus.IDLE,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentProcessStatus: (state, action: PayloadAction<PaymentProcessStatus>) => {
      state.status = action.payload;
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
  setPaymentSelectionOpen,
  setPaymentSelectionClose,
  setPaymentProcessStatus,
  setSubscriptionData,
} = paymentSlice.actions;

export default paymentSlice.reducer;
