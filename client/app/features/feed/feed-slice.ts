import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  DefaultFeedPosts,
  DefaultStatus,
} from "../../../src/constants/constants";
import { FeedResponse, Status } from "../../../src/interfaces/interfaces";
import { RootState } from "../../store";
import { CreateResponse, UpdateResponse } from "./feed-response";

export const getPosts = createAsyncThunk("feed/getPosts", async () => {
  const { data } = await axios.get<FeedResponse>(
    `${process.env.API_URL}/api/feed`
  );

  return data;
});

export const getPost = createAsyncThunk("feed/getPost", async (id: number) => {
  // Get token from localStorage
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get<FeedResponse>(
    `${process.env.API_URL}/api/feed/${id}`,
    config
  );

  return data;
});

export const createPost = createAsyncThunk(
  "feed/createPost",
  async (createResponse: CreateResponse) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    const { imagePath, body } = createResponse;

    // Form data for imagePath and body - file
    const formData = new FormData();
    formData.append("file", imagePath);
    formData.append("name", imagePath.name);
    formData.append("body", body);

    const config = {
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post<FeedResponse>(
      `${process.env.API_URL}/api/feed`,
      formData,
      config
    );

    return data;
  }
);

export const updatePost = createAsyncThunk(
  "feed/updatePost",
  async (updateResponse: UpdateResponse, thunkAPI) => {
    // Get post id getState()
    const state = thunkAPI.getState() as RootState;
    const id = state.feed.feedPosts.id;

    const token = localStorage.getItem("token");

    const { imagePath, body } = updateResponse;

    const formData = new FormData();
    if (imagePath) {
      formData.append("file", imagePath);
    }
    formData.append("body", body);

    const config = {
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put<FeedResponse>(
      `${process.env.API_URL}/api/feed/${id}`,
      formData,
      config
    );

    return data;
  }
);

export const deletePost = createAsyncThunk(
  "feed/deletePost",
  async (_, thunkAPI) => {
    // Get post id getState()
    const state = thunkAPI.getState() as RootState;
    const id = state.feed.feedPosts.id;

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete<any>(`${process.env.API_URL}/api/feed/${id}`, config);
  }
);

export interface FeedState {
  posts: Array<FeedResponse>;
  feedPosts: FeedResponse;
  status: Status;
}

const initialState: FeedState = {
  posts: [DefaultFeedPosts],
  feedPosts: DefaultFeedPosts,
  status: DefaultStatus,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.status = DefaultStatus;
    },
    clearFeedPost: (state) => {
      state.feedPosts = DefaultFeedPosts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(getPosts.fulfilled, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isSuccess = true;
      // Fills empty array with new posts
      state.posts.fill(payload);
    });

    builder.addCase(getPosts.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });

    builder.addCase(getPost.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(getPost.fulfilled, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isSuccess = true;
      state.feedPosts = payload;
    });
    builder.addCase(getPost.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });
    builder.addCase(createPost.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(createPost.fulfilled, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isSuccess = true;
      state.feedPosts = payload;
    });
    builder.addCase(createPost.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });

    builder.addCase(updatePost.pending, (state) => {
      state.status.isFetching = false;
    });

    builder.addCase(updatePost.fulfilled, (state, { payload }) => {
      state.status.isSuccess = true;
      state.status.isFetching = false;
      state.feedPosts = payload;
    });
    builder.addCase(updatePost.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });

    builder.addCase(deletePost.pending, (state) => {
      state.status.isFetching = false;
    });

    builder.addCase(deletePost.fulfilled, (state) => {
      state.status.isSuccess = true;
      state.status.isFetching = false;
    });
    builder.addCase(deletePost.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message || "";
    });
  },
});

export const { clearStatus, clearFeedPost } = feedSlice.actions;
export default feedSlice.reducer;
