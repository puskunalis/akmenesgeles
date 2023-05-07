import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Category, Item, User } from "../../types";
import { AsyncStatus } from "../AsyncStatus";
import { StoreState } from "../store";

export interface UserState {
  user: User | undefined;
  status: AsyncStatus;
  error: SerializedError;
}

export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  const token = localStorage.getItem("authToken");

  const response = axios
    .get("/api/v1/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return response;
});

export const logoutUser = createAsyncThunk("users/logoutUser", () => {
  return undefined;
});

const initialState: UserState = {
  user: undefined,
  status: AsyncStatus.IDLE,
  error: {},
};

export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = AsyncStatus.FETCHING;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = AsyncStatus.SUCCESS;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = AsyncStatus.SUCCESS;
        state.user = action.payload;
      });
  },
});

export const selectUser = (state: StoreState) => state.user.user;
export const selectUserStatus = (state: StoreState) => state.user.status;
export const selectUserError = (state: StoreState) => state.user.error;
