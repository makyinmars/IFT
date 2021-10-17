import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DefaultStatus, URL } from "../../constants";
import { Status } from "../../interfaces";

export interface LoginState {
  email: string;
  password: string;
  status: Status;
}

const initialState: LoginState = {
  email: "",
  password: "",
  status: DefaultStatus,
};

interface UserResponse {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ email, password }: UserResponse) => {
    const { data } = await axios.post<UserResponse>(`${URL}/api/auth/login`, {
      email,
      password,
    });

    return data;
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.email = payload.email;
      state.password = payload.password;

      state.status.isSuccess = true;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(loginUser.rejected, (state, { error }) => {
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });
  },
});

export default loginSlice.reducer;
