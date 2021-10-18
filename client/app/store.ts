import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./features/auth/registerSlice";
import loginSlice from "./features/auth/loginSlice";
import logoutSlice from "./features/auth/logoutSlice";

export const store = configureStore({
  reducer: {
    register: registerSlice,
    login: loginSlice,
    logout: logoutSlice,
  },
});

// Infer the RootState and AppDispatch types from the store
export type RootState = ReturnType<typeof store.getState>;

// Inferred type
export type AppDispatch = typeof store.dispatch;
