import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "./sync-storage";

import authSlice from "./features/auth/auth-slice";
import feedSlice from "./features/feed/feed-slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authSlice,
  feed: feedSlice,
  // user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the RootState and AppDispatch types from the store
export type RootState = ReturnType<typeof store.getState>;

// Inferred type
export type AppDispatch = typeof store.dispatch;
