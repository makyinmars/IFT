import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  DefaultStatus,
  DefaultUserAllInfo,
} from "../../../src/constants/constants";
import {
  Status,
  User,
  UserAllResponse,
} from "../../../src/interfaces/interfaces";
import { RootState } from "../../store";

// Only admin has access to action
export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  // Get token from admin
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // Expecting an array of Users
  const { data } = await axios.get<UserAllResponse>(
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
  const { data } = await axios.get<UserAllResponse>(
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
    const id = state.user.userAllInfo.id;

    // Get toke from user
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put<UserAllResponse>(
      `${process.env.API_URL}/api/user/${id}`,
      userResponse,
      config
    );

    return data;
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: number) => {
    // Get token from user
    const token = localStorage.getItem("token");

    // Config for user
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete<any>(
      `${process.env.API_URL}/api/user/${id}`,
      config
    );

    return data;
  }
);

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

    await axios.post<File>(
      `${process.env.API_URL}/api/user/profile-image`,
      formData,
      config
    );

    // Returns file instead of data because data is not a string
    return file.name;
  }
);

export const getUserImage = createAsyncThunk(
  "user/getUserImage",
  async (imageId: any) => {
    // Get token from user
    const token = localStorage.getItem("token");

    // Bearer token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get<string>(
      `${process.env.API_URL}/api/user/profile-image/${imageId}`,
      config
    );

    console.log("data", data);

    return data;
  }
);

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

    builder.addCase(getUser.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isSuccess = true;
      state.userAllInfo = payload;
    });
    builder.addCase(getUser.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });

    builder.addCase(updateUser.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isSuccess = true;
      state.userAllInfo = payload;
    });
    builder.addCase(updateUser.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isSuccess = true;
      state.userAllInfo = payload;
    });
    builder.addCase(deleteUser.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });

    builder.addCase(uploadUserImage.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(uploadUserImage.fulfilled, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isSuccess = true;
      state.userAllInfo.imagePath = payload;
    });
    builder.addCase(uploadUserImage.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });

    builder.addCase(getUserImage.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(getUserImage.fulfilled, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isSuccess = true;
      state.userAllInfo.imagePath = payload;
    });
    builder.addCase(getUserImage.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });
  },
});

export const { clearStatus, clearUserAllInfo } = userSlice.actions;
export default userSlice.reducer;
