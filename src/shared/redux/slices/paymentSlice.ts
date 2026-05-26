import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentSlice } from "@/shared/interface/sliceInterface";
import { PaymentProcessStatus, PaymentProcessType } from "@/shared/interface/enums";

const initialState: PaymentSlice = {
    type: PaymentProcessType.NULL,
    isOpen: false,
    bookingData: null,
    subscriptionData: null,
    status: PaymentProcessStatus.IDLE,
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setBookingPyamentData: (state, action: PayloadAction<{ providerId: string, slotId: string, slot: string, date: Date, selectedServiceMode: string } | null>) => {
            state.type = PaymentProcessType.BOOKING;
            state.bookingData = action.payload;
        },
        setPaymentSelectionOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setPaymentProcessStatus: (state, action: PayloadAction<PaymentProcessStatus>) => {
            state.status = action.payload;
        },
        setSubscriptionPaymentData: (state, action: PayloadAction<{ planId: string, planDuration: number, isTrialPlan: boolean } | null>) => {
            state.type = PaymentProcessType.SUBSCRIPTION;
            state.subscriptionData = action.payload;
        }
    },
});


export const {
    setBookingPyamentData,
    setPaymentSelectionOpen,
    setPaymentProcessStatus,
    setSubscriptionPaymentData
} = paymentSlice.actions;

export default paymentSlice.reducer;