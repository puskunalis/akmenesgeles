import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { Category } from "../../types";
import { AsyncStatus } from "../AsyncStatus";
import { store, StoreState } from "../store";
import { axiosGet, axiosPost, axiosPut, axiosDelete } from "../AxiosRequests";

export interface CategoryState {
  addStatus: AsyncStatus;
  categories: Category[];
  status: AsyncStatus;
  error: SerializedError;
}

export interface NewCategory {
  name: string;
  description: string;
}

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axiosGet("/api/v1/category");
    return response;
  }
);

const initialState: CategoryState = {
  addStatus: AsyncStatus.IDLE,
  categories: [],
  status: AsyncStatus.IDLE,
  error: {},
};

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (newCategory: NewCategory) => {
    const response = await axiosPost("/api/v1/category", newCategory);
    await store.dispatch(fetchCategories());
    return response;
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category: Category) => {
    const response = await axiosPut(`/api/v1/category/${category.id}`, category);
    await store.dispatch(fetchCategories());
    return response;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId: string) => {
    const response = await axiosDelete(`/api/v1/category/${categoryId}`);
    await store.dispatch(fetchCategories());
    return response;
  }
);

export const CategoriesSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state, _) => {
        state.status = AsyncStatus.FETCHING;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
          state.status = AsyncStatus.SUCCESS;
          state.categories = action.payload.data;
        }
        else {
          state.status = AsyncStatus.BADREQUEST;
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
      })
      .addCase(createCategory.pending, (state, _) => {
        state.addStatus = AsyncStatus.FETCHING;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
          state.addStatus = AsyncStatus.SUCCESS;
        }
        else {
          state.addStatus = AsyncStatus.BADREQUEST;
        }
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.addStatus = AsyncStatus.FAILED;
        state.error = action.error;
      })
      .addCase(updateCategory.pending, (state, _) => {
        state.addStatus = AsyncStatus.FETCHING;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
          state.addStatus = AsyncStatus.SUCCESS;
        }
        else {
          state.addStatus = AsyncStatus.BADREQUEST;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.addStatus = AsyncStatus.FAILED;
        state.error = action.error;
      })
      .addCase(deleteCategory.pending, (state, _) => {
        state.status = AsyncStatus.FETCHING;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
          state.status = AsyncStatus.SUCCESS;
        }
        else {
          state.status = AsyncStatus.BADREQUEST;
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
      });
  },
});

export const selectAddCategoryStatus = (state: StoreState) =>
  state.category.addStatus;
export const selectCategories = (state: StoreState) =>
  state.category.categories;
export const selectCategoriesStatus = (state: StoreState) =>
  state.category.status;
export const selectCategoriesError = (state: StoreState) =>
  state.category.error;
