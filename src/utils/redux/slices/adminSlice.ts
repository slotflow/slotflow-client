import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        clearAdminSlice: () => initialState,
    },
});


export const { clearAdminSlice } = adminSlice.actions;

export default adminSlice.reducer;