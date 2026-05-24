import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IntegrationSliceState {
    googleConnectionLoding: boolean;
    stripeConnectionLoading: boolean;
}

const initialState: IntegrationSliceState = {
    googleConnectionLoding: false,
    stripeConnectionLoading: false,
};

const integrationSlice = createSlice({
    name: "googleSlice",
    initialState,
    reducers: {
        setGoogleConnectionLoading: (state, action: PayloadAction<boolean>) => {
            state.googleConnectionLoding = action.payload;
        },
        setStripeConnectionLoading: (state, action: PayloadAction<boolean>) => {
            state.stripeConnectionLoading = action.payload;
        },
    },
});

export const {
    setGoogleConnectionLoading,
    setStripeConnectionLoading,
} = integrationSlice.actions;

export default integrationSlice.reducer;
