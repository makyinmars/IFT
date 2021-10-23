import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  DefaultStatus,
  DefaultUserAllInfo,
} from "../../../src/constants/constants";
import { Status, UserAllResponse } from "../../../src/interfaces/interfaces";
import { GetUserResponse } from "./user-response";

// Only admin has access to action
export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  // Get token from admin
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(token);
  console.log(config);

  // Expecting an array of Users
  const { data } = await axios.get<UserAllResponse>(
    `${process.env.API_URL}/api/user}`,
    config
  );
  console.log(data);

  return data;
});

export interface UserState {
  userAllInfo: UserAllResponse;
  status: Status;
}

const initialState: UserState = {
  userAllInfo: DefaultUserAllInfo,
  status: DefaultStatus,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.status = DefaultStatus;
    },
    clearUserAllInfo: (state) => {
      state.userAllInfo = DefaultUserAllInfo;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isSuccess = true;
      state.userAllInfo = payload;
    });
    builder.addCase(getAllUsers.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });
  },
});

export const { clearStatus, clearUserAllInfo } = userSlice.actions;
export default userSlice.reducer;
