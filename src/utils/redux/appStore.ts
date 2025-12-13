import appReducer from './slices/appSlice';
import authReducer from "./slices/authSlice";
import chatReducer from './slices/chatSlice';
import userReducer from './slices/userSlice';
import adminReducer from './slices/adminSlice';
import videoReducer from './slices/videoSlice';
import localStorage from 'redux-persist/lib/storage';
import providerReducer from './slices/providerSlice';
import integrationReducer from './slices/integrationSlice';
import { persistReducer, persistStore } from 'redux-persist';
import { setupAxiosInterceptors } from "@/lib/axiosInterceptor";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const persistConfig = {
    key: "slotflow",
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

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducers));

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