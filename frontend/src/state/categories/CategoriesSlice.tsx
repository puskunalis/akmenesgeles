import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit"
import axios from "axios"
import { Category, Item } from "../../types"
import { AsyncStatus } from "../AsyncStatus"
import { StoreState } from "../store"

export interface CategoryState {
    categories: Category[],
    status: AsyncStatus,
    error: SerializedError
}

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
        const response = axios
        .get("/api/v1/category")
        .then(res => res.data)
        .catch(err => console.log(err));

        return response;
    }
)

const initialState: CategoryState = {
    categories: [],
    status: AsyncStatus.IDLE,
    error: {}
}

export const CategoriesSlice = createSlice({
    name:"todos",
    initialState,
    reducers:{
        setTodos: (state, action) => {
            state.categories = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.status = AsyncStatus.FETCHING
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = AsyncStatus.SUCCESS;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = AsyncStatus.FAILED;
                state.error = action.error;
            });
    }
});

export const selectCategories = (state: StoreState) => state.category.categories;
export const selectCategoriesStatus = (state: StoreState) => state.category.status;
export const selectCategoriesError = (state: StoreState) => state.category.error;