import appReducer from './slices/appSlice';
import authReducer from "./slices/authSlice";
import chatReducer from './slices/chatSlice';
import userReducer from './slices/userSlice';
import adminReducer from './slices/adminSlice';
import videoReducer from './slices/videoSlice';
import { storeConstants } from '../utils/constants';
import localStorage from 'redux-persist/lib/storage';
import providerReducer from './slices/providerSlice';
import integrationReducer from './slices/integrationSlice';
import { persistReducer, persistStore } from 'redux-persist';
import { setupAxiosInterceptors } from "@/lib/axiosInterceptor";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const persistConfig = {
    key: storeConstants.storeKey,
    storage: localStorage,
};

const rootReducers = {
    auth: authReducer,
    app: appReducer,
    admin: adminReducer,
    user: userReducer,
    provider: providerReducer,
    chat: chatReducer,
    video: videoReducer,
    integration: integrationReducer,
};

const rootReducer = combineReducers(rootReducers);
const baseReducer = (state: any, action: any) => {
    if (action.type === storeConstants.resetState) {
        const lightTheme = state?.app?.lightTheme;
                
        const initialState = rootReducer(undefined, action);
                
        return {
            ...initialState,
            app: {
                ...initialState.app,
                lightTheme: lightTheme !== undefined ? lightTheme : initialState.app.lightTheme
            }
        };
    }
    return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, baseReducer);

export const appStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});


export const persistAppStore = persistStore(appStore);

setupAxiosInterceptors();

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;