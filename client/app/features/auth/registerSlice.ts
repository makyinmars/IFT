import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL, DefaultStatus } from "../../../src/constants/constants";
import { Status } from "../../../src/interfaces/interfaces";

export interface RegisterState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: Status;
}

const initialState: RegisterState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  status: DefaultStatus,
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
