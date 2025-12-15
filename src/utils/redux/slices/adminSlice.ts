import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminState, SetProviderRejectModalType } from "@/utils/interface/sliceInterface";

const initialState: AdminState = {
    rejectProviderId: null,
    isProviderRejectModalOpen: false,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setProviderRejectModal: (state, action: PayloadAction<SetProviderRejectModalType>) => {
            state.isProviderRejectModalOpen = action.payload.modalState;
            state.rejectProviderId = action.payload.providerId;
        },
        clearAdminSlice: () => initialState,
    },
});


export const {
    clearAdminSlice,
    setProviderRejectModal
} = adminSlice.actions;

export default adminSlice.reducer;