import { ServiceCategory } from "@/utils/interface/enums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStateVariables } from "@/utils/interface/sliceInterface";
import { ProviderCardsFilters } from "@/utils/interface/commonInterface";
import { UserViewProviderCardComponentProps } from "@/utils/interface/componentInterface/commonComponentInterface";

const initialState: UserStateVariables = {
  isReviewCreateFormOpen: false,
  selectedBookingId: null,
  selectedBookingProviderId: null,
  providers: null,
  selectedCategories: [],
  providerCardsfFlter: {
    appServiceIds: [] as string[],
    maxPrice: 0,
    minPrice: 0,
    slotflowTrusted: false,
    categories: [] as ServiceCategory[],
    location: undefined,
    skip: 0,
    limit: 12,
  },
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
    setProviderCardsFilter: (state, action: PayloadAction<ProviderCardsFilters>) => {
      state.providerCardsfFlter = action.payload;
    },
  },

});

export const {
  toggleReviewCreateForm,
  setProviders,
  pushServiceCategory,
  setProviderCardsFilter
} = userSlice.actions;

export default userSlice.reducer;