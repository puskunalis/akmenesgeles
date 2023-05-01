import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit"
import axios from "axios"
import { Item } from "../../types"
import { AsyncStatus } from "../AsyncStatus"
import { StoreState } from "../store"

export interface ItemState{
    allItems: Item[],
    categoryItems: Item[],
    status: AsyncStatus,
    error: SerializedError
}

export interface NewItem {
    title: string,
    description: string,
    price: number,
    categoryIds: string[]
}

export const fetchItems = createAsyncThunk(
    "items/fetchItems",
    async () => {
        const response = axios
        .get("/api/v1/item")
        .then(res => res.data)
        .catch(err => console.log(err));

        return response;
    }
)

export const fetchItemsByCategoryId = createAsyncThunk(
    "items/fetchItemsByCategoryId",
    async (categoryId: string) => {
        const response = axios
        .get(`/api/v1/item/category/${categoryId}`)
        .then(res => res.data)
        .catch(err => console.log(err));

        return response;
    }
)

// export const createReservation = createAsyncThunk(
//     "items/createItem",
//     async (newItem: NewItem) => {
//         const {title, description, price, categoryIds} = newItem;
//         const response = await axios
//         .post("/api/reservation", data)
//         .then(res => res.data)
//         .catch(err => {
//             errorAlert(err.response.data.message);
//         })

//         store.dispatch(fetchReservations(data.activity_id));
//         return response;
//     },
// )

const initialState: ItemState = {
    allItems: [],
    categoryItems: [],
    status: AsyncStatus.IDLE,
    error: {}
}

export const ItemsSlice = createSlice({
    name:"items",
    initialState,
    reducers:{
        setItems: (state, action) => {
            state.allItems = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchItems.pending, (state, action) => {
                state.status = AsyncStatus.FETCHING
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = AsyncStatus.SUCCESS;
                state.allItems = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = AsyncStatus.FAILED;
                state.error = action.error;
            })
            .addCase(fetchItemsByCategoryId.pending, (state, action) => {
                state.status = AsyncStatus.FETCHING
            })
            .addCase(fetchItemsByCategoryId.fulfilled, (state, action) => {
                state.status = AsyncStatus.SUCCESS;
                state.categoryItems = action.payload;
            })
            .addCase(fetchItemsByCategoryId.rejected, (state, action) => {
                state.status = AsyncStatus.FAILED;
                state.error = action.error;
            });;
    }
});

export const selectAllItems = (state: StoreState) => state.item.allItems;
export const selectCategoryItems = (state: StoreState) => state.item.categoryItems;
export const selectItemsStatus = (state: StoreState) => state.item.status;
export const selectItemsError = (state: StoreState) => state.item.error;