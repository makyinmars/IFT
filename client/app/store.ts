import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./features/auth/registerSlice";

export const store = configureStore({
  reducer: {
    register: registerSlice,
  },
});

// Infer the RootState and AppDispatch types from the store
export type RootState = ReturnType<typeof store.getState>;

// Inferred type
export type AppDispatch = typeof store.dispatch;
