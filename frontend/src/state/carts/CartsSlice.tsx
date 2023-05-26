import {
    createAsyncThunk,
    createSlice,
    SerializedError,
} from "@reduxjs/toolkit";
import { Cart } from "../../types";
import { AsyncStatus } from "../AsyncStatus";
import { StoreState } from "../store";
import { axiosGet, axiosPost, axiosDelete, axiosPatch } from "../AxiosRequests";
  
export interface CartState {
  cart: Cart | undefined;
  status: AsyncStatus;
  error: SerializedError;
}

export interface AddItemToCartData {
  cartId: string,
  item: CartItemForAddToCart
}

export interface CartItemForAddToCart {
  itemId: string,
  quantity: number
}

export interface DeleteItemFromCartData {
  cartId: string,
  itemId: string
}

export interface ChangeCartItemQuantityData {
  cartId: string,
  itemId: string,
  quantity: number
}

export const fetchCart = createAsyncThunk(
  "carts/fetchCart",
  async (userId: string) => {
    const response = await axiosGet(`/api/v1/carts/user/${userId}`);

    return response;
  }
);

export const fetchCartByCartId = createAsyncThunk(
  "carts/fetchCartById",
  async (cartId: string) => {
    const response = await axiosGet(`/api/v1/carts/${cartId}`);

    return response;
  }
);

export const addItemToCart = createAsyncThunk(
  "carts/addItemToCart",
  async (data: AddItemToCartData) => {
    const {cartId, item} = data;
    const response = await axiosPost(`/api/v1/carts/${cartId}/item`, item);
      
    return response;
  }
);

export const deleteItemFromCart = createAsyncThunk(
  "carts/deleteItemFromCart",
  async (data: DeleteItemFromCartData) => {
    const {cartId, itemId} = data;
    const response = await axiosDelete(`/api/v1/carts/${cartId}/items/${itemId}`);
    return response;
  }
);

export const changeCartItemQuantity = createAsyncThunk(
  "carts/changeCartItemQuantity",
  async (data: ChangeCartItemQuantityData) => {
    const {itemId, cartId, quantity} = data;
    const response = await axiosPatch(`/api/v1/carts/${cartId}/items/${itemId}/${quantity}`);
    return response;
  }
);

export const deleteCart = createAsyncThunk(
  "carts/deleteCart",
  async (cartId: string) => {
    const response = await axiosDelete(`/api/v1/carts/${cartId}`);
    return response;
  }
);

const initialState: CartState = {
  cart: undefined,
  status: AsyncStatus.IDLE,
  error: {},
};

export const CartsSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCart.pending, (state, _) => {
        state.status = AsyncStatus.FETCHING;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
          state.status = AsyncStatus.SUCCESS;
          state.cart = action.payload.data;
        }
        else {
          state.status = AsyncStatus.BADREQUEST;
        }
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
      })
      .addCase(fetchCartByCartId.pending, (state, _) => {
        state.status = AsyncStatus.FETCHING;
      })
      .addCase(fetchCartByCartId.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
          state.status = AsyncStatus.SUCCESS;
          state.cart = action.payload.data;
        }
        else {
          state.status = AsyncStatus.BADREQUEST;
        }
      })
      .addCase(fetchCartByCartId.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
      })
      .addCase(addItemToCart.pending, (state, _) => {
        state.status = AsyncStatus.FETCHING;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
          state.status = AsyncStatus.SUCCESS;
          state.cart = action.payload.data;
        }
        else {
          state.status = AsyncStatus.BADREQUEST;
        }
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
      })
      .addCase(deleteItemFromCart.pending, (state, _) => {
        state.status = AsyncStatus.FETCHING;
      })
      .addCase(deleteItemFromCart.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
          state.status = AsyncStatus.SUCCESS;
        }
        else {
          state.status = AsyncStatus.BADREQUEST;
        }
      })
      .addCase(deleteItemFromCart.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
      })
      .addCase(changeCartItemQuantity.pending, (state, _) => {
        state.status = AsyncStatus.FETCHING;
      })
      .addCase(changeCartItemQuantity.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
          state.status = AsyncStatus.SUCCESS;
        }
        else {
          state.status = AsyncStatus.BADREQUEST;
        }
      })
      .addCase(changeCartItemQuantity.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
      })
      .addCase(deleteCart.pending, (state, _) => {
        state.status = AsyncStatus.FETCHING;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
          state.status = AsyncStatus.SUCCESS;
        }
        else {
          state.status = AsyncStatus.BADREQUEST;
        }
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
      });
  },
});

export const selectCart = (state: StoreState) =>
  state.cart.cart;
export const selectCartStatus = (state: StoreState) =>
  state.cart.status;
export const selectCartError = (state: StoreState) =>
  state.cart.error;
export const selectCartId = (state: StoreState) =>
  state.cart.cart?.id;