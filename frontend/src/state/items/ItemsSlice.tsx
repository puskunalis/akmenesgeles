import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { Item } from "../../types";
import { AsyncStatus } from "../AsyncStatus";
import { store, StoreState } from "../store";
import { axiosGet, axiosPost, axiosDelete, axiosPut } from "../AxiosRequests";

export interface ItemState {
  allItems: Item[];
  categoryItems: Item[];
  status: AsyncStatus;
  error: SerializedError;
  addStatus: AsyncStatus;
  singleItem: Item | undefined;
  singleItemStatus: AsyncStatus;
  singleItemError: SerializedError;
}

export interface NewItem {
  title: string;
  description: string;
  price: number;
  categoryIds: string[];
  imageUrl: string;
}

export interface UpdateItemData {
  itemId: string;
  item: Item;
}

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async () => {
    return axiosGet("/api/v1/item");
  }
);

export const fetchItemsByCategoryId = createAsyncThunk(
  "items/fetchItemsByCategoryId",
  async (categoryId: string) => {
    return axiosGet(`/api/v1/item/category/${categoryId}`);
  }
);

export const fetchItemById = createAsyncThunk(
  "items/fetchItemById",
  async (itemId: string) => {
    return axiosGet(`/api/v1/item/${itemId}`);
  }
);

export const createItem = createAsyncThunk(
  "items/createItem",
  async (newItem: NewItem) => {
    const response = axiosPost("/api/v1/item", newItem);
    store.dispatch(fetchItems());
    return response;
  }
);

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (itemId: string) => {
    const response = axiosDelete("/api/v1/item/" + itemId);
    store.dispatch(fetchItems());
    return response;
  }
);

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async (data: UpdateItemData) => {
    const {itemId, item} = data;
    const response = axiosPut(`/api/v1/item/${itemId}`, item);
    store.dispatch(fetchItems());
    return response;
  }
)

const initialState: ItemState = {
  allItems: [],
  categoryItems: [],
  status: AsyncStatus.IDLE,
  error: {},
  addStatus: AsyncStatus.IDLE,
  singleItem: undefined,
  singleItemStatus: AsyncStatus.IDLE,
  singleItemError: {},
};

export const ItemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.allItems = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchItems.pending, (state, _) => {
        state.status = AsyncStatus.FETCHING;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
          state.status = AsyncStatus.SUCCESS;
          state.allItems = action.payload.data;
        }
        else {
          state.status = AsyncStatus.BADREQUEST;
        }
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
      })
      .addCase(fetchItemsByCategoryId.pending, (state, _) => {
        state.status = AsyncStatus.FETCHING;
      })
      .addCase(fetchItemsByCategoryId.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
          state.status = AsyncStatus.SUCCESS;
          state.categoryItems = action.payload.data;
        }
        else {
          state.status = AsyncStatus.BADREQUEST;
        }
      })
      .addCase(fetchItemsByCategoryId.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
      })
      .addCase(createItem.pending, (state, _) => {
        state.addStatus = AsyncStatus.FETCHING;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
          state.addStatus = AsyncStatus.SUCCESS;
          state.categoryItems = action.payload.data;
        }
        else {
          state.addStatus = AsyncStatus.BADREQUEST;
        }
      })
      .addCase(createItem.rejected, (state, action) => {
        state.addStatus = AsyncStatus.FAILED;
        state.error = action.error;
      })
      .addCase(fetchItemById.pending, (state, _) => {
        state.singleItemStatus = AsyncStatus.FETCHING;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
          state.singleItemStatus = AsyncStatus.SUCCESS;
          state.singleItem = action.payload.data;
        }
        else {
          state.singleItemStatus = AsyncStatus.BADREQUEST;
        }
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.singleItemStatus = AsyncStatus.FAILED;
        state.singleItemError = action.error;
      })
      .addCase(updateItem.pending, (state, _) => {
        state.singleItemStatus = AsyncStatus.FETCHING;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
          state.singleItemStatus = AsyncStatus.SUCCESS;
        }
        else {
          state.singleItemStatus = AsyncStatus.BADREQUEST;
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.singleItemStatus = AsyncStatus.FAILED;
        state.singleItemError = action.error;
      });
  },
});

export const selectAllItems = (state: StoreState) => state.item.allItems;
export const selectAddItemStatus = (state: StoreState) => state.item.addStatus;
export const selectCategoryItems = (state: StoreState) => state.item.categoryItems;
export const selectItemsStatus = (state: StoreState) => state.item.status;
export const selectItemsError = (state: StoreState) => state.item.error;
export const selectSingleItem = (state: StoreState) => state.item.singleItem;
export const selectSingleItemStatus = (state: StoreState) => state.item.singleItemStatus;
export const selectSingleItemError = (state: StoreState) => state.item.singleItemError;
