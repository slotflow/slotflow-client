import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStateVariables } from "@/utils/interface/sliceInterface";

const initialState: UserStateVariables = {
  selectedServices: null,
  isReviewCreateFormOpen: false,
  selectedBookingId: null,
  selectedBookingProviderId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    pushService: (state, action: PayloadAction<Array<string> | null>) => {
      state.selectedServices = action.payload;
    },
    clearUserSlice: (state) => {
      state.selectedServices = null;
    },
    toggleReviewCreateForm: (state, action: PayloadAction<{ isOpen: boolean, id: string| null, providerId: string| null }>) => {
      state.isReviewCreateFormOpen = action.payload.isOpen;
      state.selectedBookingId = action.payload.id;
      state.selectedBookingProviderId = action.payload.providerId;
    }
  },

});

export const {
  pushService,
  clearUserSlice,
  toggleReviewCreateForm
} = userSlice.actions;

export default userSlice.reducer;