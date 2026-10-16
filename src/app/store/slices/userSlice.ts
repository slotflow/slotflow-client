import { UserStateVariables } from '@/shared/types/slice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserStateVariables = {
  isReviewCreateFormOpen: false,
  selectedBookingId: null,
  selectedBookingProviderId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleReviewCreateForm: (
      state,
      action: PayloadAction<{ isOpen: boolean; id: string | null; providerId: string | null }>,
    ) => {
      state.isReviewCreateFormOpen = action.payload.isOpen;
      state.selectedBookingId = action.payload.id;
      state.selectedBookingProviderId = action.payload.providerId;
    },
  },
});

export const { toggleReviewCreateForm } = userSlice.actions;

export default userSlice.reducer;
