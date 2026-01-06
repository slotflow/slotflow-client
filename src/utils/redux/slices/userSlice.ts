import { ServiceCategory } from "@/utils/interface/enums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStateVariables } from "@/utils/interface/sliceInterface";
import { UserViewProviderCardComponentProps } from "@/utils/interface/componentInterface/commonComponentInterface";

const initialState: UserStateVariables = {
  isReviewCreateFormOpen: false,
  selectedBookingId: null,
  selectedBookingProviderId: null,
  providers: null,
  selectedCategories: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    pushServiceCategory: (state, action: PayloadAction<Array<ServiceCategory> | []>) => {
      state.selectedCategories = action.payload;
    },
    toggleReviewCreateForm: (state, action: PayloadAction<{ isOpen: boolean, id: string | null, providerId: string | null }>) => {
      state.isReviewCreateFormOpen = action.payload.isOpen;
      state.selectedBookingId = action.payload.id;
      state.selectedBookingProviderId = action.payload.providerId;
    },
    setProviders: (state, action: PayloadAction<Array<UserViewProviderCardComponentProps>>) => {
      state.providers = action.payload;
    },
    clearUserSlice: () => initialState,
  },

});

export const {
  clearUserSlice,
  toggleReviewCreateForm,
  setProviders,
  pushServiceCategory
} = userSlice.actions;

export default userSlice.reducer;