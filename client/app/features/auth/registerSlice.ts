import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:5000";

export interface RegisterState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  message: string;
}

const initialState: RegisterState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  message: "",
};

interface UserResponse {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async ({ firstName, lastName, email, password }: UserResponse) => {
    const { data } = await axios.post<UserResponse>(
      `${URL}/api/auth/register`,
      { firstName, lastName, email, password }
    );

    return data;
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.email = payload.email;
      state.password = payload.password;
      state.message = "Success";
    });

    builder.addCase(registerUser.pending, (state) => {
      state.message = "Pending";
    });

    builder.addCase(registerUser.rejected, (state, { error }) => {
      state.message = error.message || "";
    });
  },
});

export default registerSlice.reducer;
