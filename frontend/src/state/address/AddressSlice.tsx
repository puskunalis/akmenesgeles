import {
    createAsyncThunk,
    createSlice,
    SerializedError,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import { Address, Item } from "../../types";
  import { AsyncStatus } from "../AsyncStatus";
  import { store, StoreState } from "../store";
  
  export interface AddressState {
    addresses: Address[];
    status: AsyncStatus;
    error: SerializedError;
  }

  
  export const fetchAddressByUser = createAsyncThunk(
    "address/fetchAddressByUser",
    async (userId: string | undefined) => {
      if(userId) {
        const response = axios
        .get(`/api/v1/address/user/${userId}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
  
      return response;
      }
    }
  );
  
  const initialState: AddressState = {
    addresses: [],
    status: AsyncStatus.IDLE,
    error: {},
  };
  
  export const createAddress = createAsyncThunk(
    "address/createAddress",
    async (newAddress: Address) => {
      const response = await axios
        .post("/api/v1/address", newAddress)
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
        });
  
      store.dispatch(fetchAddressByUser(newAddress?.userId));
      return response;
    }
  );

  export const deleteAddress = createAsyncThunk(
    "address/deleteAddress",
    async (addressId: string) => {
      const response = await axios
        .delete(`/api/v1/address/${addressId}`)
        .catch((err) => {
          console.error(err);
        });
    }
  )
  
  
  export const AddressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
      setTodos: (state, action) => {
        state.addresses = action.payload;
      },
    },
    extraReducers(builder) {
      builder
        .addCase(fetchAddressByUser.pending, (state, action) => {
          state.status = AsyncStatus.FETCHING;
        })
        .addCase(fetchAddressByUser.fulfilled, (state, action) => {
          state.status = AsyncStatus.SUCCESS;
          state.addresses = action.payload;
        })
        .addCase(fetchAddressByUser.rejected, (state, action) => {
          state.status = AsyncStatus.FAILED;
          state.error = action.error;
        })
        .addCase(createAddress.pending, (state, action) => {
          state.status = AsyncStatus.FETCHING;
        })
        .addCase(createAddress.fulfilled, (state, action) => {
          state.status = AsyncStatus.SUCCESS;
        })
        .addCase(createAddress.rejected, (state, action) => {
          state.status = AsyncStatus.FAILED;
          state.error = action.error;
        })
        .addCase(deleteAddress.pending, (state, action) => {
          state.status = AsyncStatus.FETCHING;
        })
        .addCase(deleteAddress.fulfilled, (state, action) => {
          state.status = AsyncStatus.SUCCESS;
        })
        .addCase(deleteAddress.rejected, (state, action) => {
          state.status = AsyncStatus.FAILED;
          state.error = action.error;
        });
    },
  });
  
  export const selectUserAddresses = (state: StoreState) =>
    state.address.addresses;
  export const selectAddressesStatus = (state: StoreState) =>
    state.address.status;
  export const selectAddressesError = (state: StoreState) =>
    state.address.error;
  