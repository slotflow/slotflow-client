import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProviderState } from "@/utils/interface/sliceInterface";
import { Availability } from "@/utils/interface/entityInterface/serviceAvailabilityInterface";

const initialState: ProviderState = {
  availabilities: [],
  planId: null,
  planDuration: null,
  paymentSelectionOpen: false,
  isTrialPlan: false,
  paymentPageOpen: false,
  identityProof: null,
  serviceProof: null,
  identityProofLoading: false,
  serviceProofLoading: false,
};

const providerSlice = createSlice({
  name: "providerSlice",
  initialState,
  reducers: {
    addAvailability: (state, action: PayloadAction<Availability | null>) => {
      const newAvailability = action.payload;

      if (newAvailability === null) {
        state.availabilities = null;
        return;
      }

      if (state.availabilities === null) {
        state.availabilities = [];
      }

      const existingIndex = state.availabilities.findIndex(
        (item) => item.day === newAvailability.day
      );

      if (existingIndex !== -1) {
        state.availabilities.splice(existingIndex, 1);
      }

      state.availabilities.push(newAvailability);
    },
    setSubscriptionPlanId: (state, action: PayloadAction<string | null>) => {
      state.planId = action.payload;
    },
    setSubscriptionPlanDuration: (state, action: PayloadAction<string | null>) => {
      state.planDuration = action.payload;
    },
    setSubscriptionIsTrailPlan: (state, action: PayloadAction<boolean>) => {
      state.isTrialPlan = action.payload;
    },
    setPaymentSelectionPage: (state, action: PayloadAction<boolean>) => {
      state.paymentSelectionOpen = action.payload;
    },
    setProviderIdentityProofs: (state, action: PayloadAction<string | null>) => {
      state.identityProof = action.payload
    },
    setProviderServiceProofs: (state, action: PayloadAction<string | null>) => {
      state.serviceProof = action.payload
    },
    setIdentityProofLoading: (state, action: PayloadAction<boolean>) => {
      state.identityProofLoading = action.payload;
    },
    setServiceProofLoading: (state, action: PayloadAction<boolean>) => {
      state.serviceProofLoading = action.payload;
    },
    clearProviderSlice: () => initialState,
  },
});

export const {
  addAvailability,
  setSubscriptionPlanId,
  setSubscriptionPlanDuration,
  setPaymentSelectionPage,
  setSubscriptionIsTrailPlan,
  setProviderIdentityProofs,
  setProviderServiceProofs,
  clearProviderSlice,
  setIdentityProofLoading,
  setServiceProofLoading
} = providerSlice.actions;

export default providerSlice.reducer;