import {
    createAsyncThunk,
    createSlice,
    SerializedError,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import { Cart, CartItem } from "../../types";
  import { AsyncStatus } from "../AsyncStatus";
  import { StoreState } from "../store";
  
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
      const response = axios
        .get(`/api/v1/carts/user/${userId}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
  
      return response;
    }
  );

  export const fetchCartByCartId = createAsyncThunk(
    "carts/fetchCartById",
    async (cartId: string) => {
      const response = axios
        .get(`/api/v1/carts/${cartId}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
  
      return response;
    }
  );

  export const addItemToCart = createAsyncThunk(
    "carts/addItemToCart",
    async (data: AddItemToCartData) => {
      const {cartId, item} = data;
      const response = axios
        .post(`/api/v1/carts/${cartId}/item`, item)
        .then((res) => res.data)
        .catch((err) => console.log(err));
        
        return response;
    }
  );

  export const deleteItemFromCart = createAsyncThunk(
    "carts/deleteItemFromCart",
    async (data: DeleteItemFromCartData) => {
      const {cartId, itemId} = data;
      const response = await axios
        .delete(`/api/v1/carts/${cartId}/items/${itemId}`)
        .catch((err) => console.log(err));
    }
    
  )

  export const changeCartItemQuantity = createAsyncThunk(
    "carts/changeCartItemQuantity",
    async (data: ChangeCartItemQuantityData) => {
      const {itemId, cartId, quantity} = data;
      const response = await axios
        .patch(`/api/v1/carts/${cartId}/items/${itemId}/${quantity}`)
        .catch((err) => console.log(err));
    }
  )
  
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
        .addCase(fetchCart.pending, (state, action) => {
          state.status = AsyncStatus.FETCHING;
        })
        .addCase(fetchCart.fulfilled, (state, action) => {
          state.status = AsyncStatus.SUCCESS;
          state.cart = action.payload;
        })
        .addCase(fetchCart.rejected, (state, action) => {
          state.status = AsyncStatus.FAILED;
          state.error = action.error;
        })
        .addCase(fetchCartByCartId.pending, (state, action) => {
          state.status = AsyncStatus.FETCHING;
        })
        .addCase(fetchCartByCartId.fulfilled, (state, action) => {
          state.status = AsyncStatus.SUCCESS;
          state.cart = action.payload;
        })
        .addCase(fetchCartByCartId.rejected, (state, action) => {
          state.status = AsyncStatus.FAILED;
          state.error = action.error;
        })
        .addCase(addItemToCart.pending, (state, action) => {
          state.status = AsyncStatus.FETCHING;
        })
        .addCase(addItemToCart.fulfilled, (state, action) => {
          state.status = AsyncStatus.SUCCESS;
          state.cart = action.payload;
        })
        .addCase(addItemToCart.rejected, (state, action) => {
          state.status = AsyncStatus.FAILED;
          state.error = action.error;
        })
        .addCase(deleteItemFromCart.pending, (state, action) => {
          state.status = AsyncStatus.FETCHING;
        })
        .addCase(deleteItemFromCart.fulfilled, (state, action) => {
          state.status = AsyncStatus.SUCCESS;
        })
        .addCase(deleteItemFromCart.rejected, (state, action) => {
          state.status = AsyncStatus.FAILED;
          state.error = action.error;
        })
        .addCase(changeCartItemQuantity.pending, (state, action) => {
          state.status = AsyncStatus.FETCHING;
        })
        .addCase(changeCartItemQuantity.fulfilled, (state, action) => {
          state.status = AsyncStatus.SUCCESS;
        })
        .addCase(changeCartItemQuantity.rejected, (state, action) => {
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