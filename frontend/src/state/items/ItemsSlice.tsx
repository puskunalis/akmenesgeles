import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit"
import axios from "axios"
import { Item } from "../../types"
import { AsyncStatus } from "../AsyncStatus"
import { StoreState } from "../store"

export interface ItemState{
    items: Item[],
    status: AsyncStatus,
    error: SerializedError
}

export const fetchItems = createAsyncThunk(
    "items/fetchItems",
    async () => {
        const response = axios
        .get("/api/v1/item")
        .then(res => {console.log(res.data); return res.data})
        .catch(err => console.log(err));

        return response;
    }
)

const initialState: ItemState = {
    items: [],
    status: AsyncStatus.IDLE,
    error: {}
}

export const ItemsSlice = createSlice({
    name:"todos",
    initialState,
    reducers:{
        setTodos: (state, action) => {
            state.items = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchItems.pending, (state, action) => {
                state.status = AsyncStatus.FETCHING
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = AsyncStatus.SUCCESS;
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = AsyncStatus.FAILED;
                state.error = action.error;
            });
    }
});

export const selectItems = (state: StoreState) => state.item.items;
export const selectItemsStatus = (state: StoreState) => state.item.status;
export const selectItemsError = (state: StoreState) => state.item.error;