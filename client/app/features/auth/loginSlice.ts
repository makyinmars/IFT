import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../constants";

export interface LoginState {
  email: string;
  password: string;
  message: string;
}

const initialState: LoginState = {
  email: "",
  password: "",
  message: "",
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
      state.message = "Success";
    });

    builder.addCase(loginUser.pending, (state) => {
      state.message = "Pending";
    });

    builder.addCase(loginUser.rejected, (state, { error }) => {
      state.message = error.message || "";
    });
  },
});

export default loginSlice.reducer;
