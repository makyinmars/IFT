import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import localForage from "localforage";

import {
  URL,
  DefaultStatus,
  DefaultUserInfo,
} from "../../../src/constants/constants";
import { Status, UserResponse } from "../../../src/interfaces/interfaces";

export interface RegisterState {
  userInfo: UserResponse;
  status: Status;
}

const initialState: RegisterState = {
  userInfo: DefaultUserInfo,
  status: DefaultStatus,
};

interface RegisterResponse {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async ({ firstName, lastName, email, password }: RegisterResponse) => {
    const { data } = await axios.post<UserResponse>(
      `${URL}/api/auth/register`,
      { firstName, lastName, email, password }
    );

    try {
      await localForage.setItem("userInfo", data);
    } catch (err) {
      console.log(err);
    }

    return data;
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.userInfo = payload;

      state.status.isSuccess = true;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(registerUser.rejected, (state, { error }) => {
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });
  },
});

export default registerSlice.reducer;
