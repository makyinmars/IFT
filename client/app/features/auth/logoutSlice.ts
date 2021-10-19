import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import localForage from "localforage";
import { DefaultStatus } from "../../../src/constants/constants";
import { Status } from "../../../src/interfaces/interfaces";

export interface LogoutState {
  status: Status;
}

const initialState: LogoutState = {
  status: DefaultStatus,
};

export const logoutUser = createAsyncThunk("logout/logoutUser", async () => {
  await localForage.removeItem("userInfo");
  await localForage.removeItem("token");
  await localForage.clear();
});

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    clearState: (state) => {
      state.status = DefaultStatus;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.status.isSuccess = true;
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(logoutUser.rejected, (state) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = "Impossible to logout :-0, you are trapped!";
    });
  },
});

export const { clearState } = logoutSlice.actions;
export default logoutSlice.reducer;
