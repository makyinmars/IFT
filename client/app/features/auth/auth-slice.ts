import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

import {
  DefaultStatus,
  DefaultUserInfo,
} from "../../../src/constants/constants";
import { Status, User, UserResponse } from "../../../src/interfaces/interfaces";
import { RootState } from "../../store";
import { LoginResponse, RegisterResponse } from "./auth-response";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (registerResponse: RegisterResponse) => {
    const { data } = await axios.post<{ token: string }>(
      `${process.env.API_URL}/api/auth/register`,
      registerResponse
    );

    localStorage.setItem("token", data.token);

    return data.token;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginResponse: LoginResponse) => {
    const { data } = await axios.post<{ token: string }>(
      `${process.env.API_URL}/api/auth/login`,
      loginResponse
    );

    localStorage.setItem("token", data.token);

    return data.token;
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
});

// Only admin has access to this action/reducer
export const getAllUsers = createAsyncThunk("auth/getAllUsers", async () => {
  // Get token from admin
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Expecting an array of Users
  const { data } = await axios.get<User>(
    `${process.env.API_URL}/api/user}`,
    config
  );

  return data;
});

export const getUser = createAsyncThunk("user/getUser", async (id: number) => {
  // Get token from user
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Expecting a single user
  const { data } = await axios.get<User>(
    `${process.env.API_URL}/api/user/${id}`,
    config
  );

  return data;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userResponse: User, thunkAPI) => {
    // Get current user id
    const state = thunkAPI.getState() as RootState;
    const id = state.auth.userInfo.user.id;

    // Get toke from user
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put<User>(
      `${process.env.API_URL}/api/user/${id}`,
      userResponse,
      config
    );

    return data;
  }
);

// TODO : Fix in the server
// export const deleteUser = createAsyncThunk(
//   "user/deleteUser",
//   async (id: number) => {
//     // Get token from user
//     const token = localStorage.getItem("token");

//     // Config for user
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const { data } = await axios.delete<any>(
//       `${process.env.API_URL}/api/user/${id}`,
//       config
//     );

//     return data;
//   }
// );

export const uploadUserImage = createAsyncThunk(
  "user/uploadUserImage",
  async (file: any) => {
    // Get token from user
    const token = localStorage.getItem("token");

    // Form Data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);

    // Config for user
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post<any>(
      `${process.env.API_URL}/api/user/profile-upload`,
      formData,
      config
    );

    // Returns file instead of data because data is not a string
    return data;
  }
);

export const findUserImage = createAsyncThunk(
  "user/findUserImage",
  async (id: number) => {
    // Get token from user
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get<string>(
      `${process.env.API_URL}/api/user/profile-upload/${id}`,
      config
    );

    return data;
  }
);

export interface AuthState {
  userInfo: UserResponse;
  status: Status;
}

const initialState: AuthState = {
  userInfo: DefaultUserInfo,
  status: DefaultStatus,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.status = DefaultStatus;
    },
    clearUserInfo: (state) => {
      state.userInfo = DefaultUserInfo;
    },
  },
  extraReducers: (builder) => {
    // registerUser - Reducers
    builder.addCase(registerUser.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      const decodedToken = jwtDecode<UserResponse>(payload);
      state.userInfo = decodedToken;
      state.status.isSuccess = true;
      state.status.isFetching = false;
    });

    builder.addCase(registerUser.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });

    // loginUser - Reducers
    builder.addCase(loginUser.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      const decodedToken = jwtDecode<UserResponse>(payload);
      state.userInfo = decodedToken;
      state.status.isSuccess = true;
      state.status.isFetching = false;
    });

    builder.addCase(loginUser.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });

    // logoutUser - Reducers
    builder.addCase(logoutUser.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      // Setting isSuccess to false to log out
      state.status.isSuccess = false;
      state.status.isFetching = false;
    });

    builder.addCase(logoutUser.rejected, (state) => {
      state.status.isError = true;
      state.status.errorMessage = "Unable to log out";
    });

    // Get all users - only for admin access
    builder.addCase(getAllUsers.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isSuccess = true;
      state.userInfo.user = payload;
    });
    builder.addCase(getAllUsers.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });

    // Get single/current user
    builder.addCase(getUser.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isSuccess = true;
      state.userInfo.user = payload;
    });
    builder.addCase(getUser.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });

    // Update user
    builder.addCase(updateUser.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isSuccess = true;
      state.userInfo.user = payload;
    });
    builder.addCase(updateUser.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });

    // TODO: Fix in the server
    // builder.addCase(deleteUser.pending, (state) => {
    //   state.status.isFetching = true;
    // });

    // builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
    //   state.status.isFetching = false;
    //   state.status.isSuccess = true;
    //   state.userInfo.user = payload;
    // });
    // builder.addCase(deleteUser.rejected, (state, { error }) => {
    //   state.status.isFetching = false;
    //   state.status.isError = true;
    //   state.status.errorMessage = error.message || "";
    // });

    builder.addCase(uploadUserImage.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(uploadUserImage.fulfilled, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isSuccess = true;
      state.userInfo.user.imagePath = payload;
    });
    builder.addCase(uploadUserImage.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });

    builder.addCase(findUserImage.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(findUserImage.fulfilled, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isSuccess = true;
      state.userInfo.user.imagePath = payload;
    });
    builder.addCase(findUserImage.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });
  },
});

export const { clearStatus, clearUserInfo } = authSlice.actions;
export default authSlice.reducer;
