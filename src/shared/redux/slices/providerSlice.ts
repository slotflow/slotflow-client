import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProviderState, SetProofDataProps } from "@/shared/interface/sliceInterface";
import { Availability } from "@/shared/interface/entityInterface/serviceAvailabilityInterface";

const initialState: ProviderState = {
  availabilities: [],
  identityProof: {
    file: null,
    isLoading: false,
  },
  serviceProof: {
    file: null,
    isLoading: false,
  },
  isShowPreview: false,
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
    removeAvailability: (state, action: PayloadAction<string>) => {
      const dayToRemove = action.payload;
      if (!state.availabilities) return;
      state.availabilities = state.availabilities.filter((item) => item.day !== dayToRemove);
    },
    setProviderIdentityProofs: (state, action: PayloadAction<Partial<SetProofDataProps>>) => {
      const { file, isLoading } = action.payload;
      if (file !== undefined) state.identityProof.file = file;
      if (isLoading !== undefined) state.identityProof.isLoading = isLoading;
    },
    setProviderServiceProofs: (state, action: PayloadAction<Partial<SetProofDataProps>>) => {
      const { file, isLoading } = action.payload;
      if (file !== undefined) state.serviceProof.file = file;
      if (isLoading !== undefined) state.serviceProof.isLoading = isLoading;
    },
    setIsShowPreview: (state) => {
      state.isShowPreview = !state.isShowPreview;
    },
  },
});

export const {
  addAvailability,
  setIsShowPreview,
  removeAvailability,
  setProviderServiceProofs,
  setProviderIdentityProofs,
} = providerSlice.actions;

export default providerSlice.reducer;