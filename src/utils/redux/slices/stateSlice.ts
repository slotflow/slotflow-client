import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appStateVariables } from "@/utils/interface/sliceInterface";

const initialState: appStateVariables = {
    lightTheme: true,
    sidebarOpen: true,
    filterSideBarOpen: true,
    authModal: false,
}

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.lightTheme = !state.lightTheme;
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        toggleFilterSideBar: (state) => {
            state.filterSideBarOpen = !state.filterSideBarOpen;
        },
        setAuthModal: (state, action: PayloadAction<boolean>) => {
            state.authModal = action.payload;
        }
    }
});

export const {
    toggleTheme,
    toggleSidebar,
    toggleFilterSideBar,
    setAuthModal,
} = stateSlice.actions;

export default stateSlice.reducer;