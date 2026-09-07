import appReducer from './slices/appSlice';
import cmsReducer from './slices/cmsSlice';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import userReducer from './slices/userSlice';
import videoReducer from './slices/videoSlice';
import paymentReducer from './slices/paymentSlice';
import localStorage from 'redux-persist/lib/storage';
import providerReducer from './slices/providerSlice';
import { storeConstants } from '@/shared/utils/constants';
import integrationReducer from './slices/integrationSlice';
import notificationReducer from './slices/notificationSlice';
import { persistReducer, persistStore } from 'redux-persist';
import { setupAxiosInterceptors } from '@/lib/axiosInterceptor';
import { combineReducers, configureStore, type Action } from '@reduxjs/toolkit';

const persistConfig = {
  key: storeConstants.storeKey,
  storage: localStorage,
};

const rootReducers = {
  auth: authReducer,
  app: appReducer,
  user: userReducer,
  provider: providerReducer,
  chat: chatReducer,
  video: videoReducer,
  integration: integrationReducer,
  payment: paymentReducer,
  notification: notificationReducer,
  cms: cmsReducer,
};

const rootReducer = combineReducers(rootReducers);

type RootReducerState = ReturnType<typeof rootReducer>;

const baseReducer = (state: RootReducerState | undefined, action: Action) => {
  if (action.type === storeConstants.resetState) {
    const lightTheme = state?.app?.lightTheme;

    const initialState = rootReducer(undefined, action);

    return {
      ...initialState,
      app: {
        ...initialState.app,
        lightTheme: lightTheme !== undefined ? lightTheme : initialState.app.lightTheme,
      },
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
