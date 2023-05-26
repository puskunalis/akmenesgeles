import {
    createAsyncThunk,
    createSlice,
    SerializedError,
} from "@reduxjs/toolkit";
import { Address } from "../../types";
import { AsyncStatus } from "../AsyncStatus";
import { store, StoreState } from "../store";
import { axiosGet, axiosPost, axiosDelete } from "../AxiosRequests";
  
export interface AddressState {
  addresses: Address[];
  status: AsyncStatus;
  error: SerializedError;
}
  
const initialState: AddressState = {
  addresses: [],
  status: AsyncStatus.IDLE,
  error: {},
};
  
export const fetchAddressByUser = createAsyncThunk(
  "address/fetchAddressByUser",
  async (userId: string | undefined) => {
    if(userId) {
      const response = await axiosGet(`/api/v1/address/user/${userId}`);
      return response;
    }
  }
);

export const createAddress = createAsyncThunk(
  "address/createAddress",
  async (newAddress: Address) => {
    const response = await axiosPost("/api/v1/address", newAddress);

    await store.dispatch(fetchAddressByUser(newAddress?.userId));
    return response;
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (addressId: string) => {
    const response = await axiosDelete(`/api/v1/address/${addressId}`);
    return response;
  }
);

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
      .addCase(fetchAddressByUser.pending, (state, _) => {
        state.status = AsyncStatus.FETCHING;
      })
      .addCase(fetchAddressByUser.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
          state.status = AsyncStatus.SUCCESS;
          state.addresses = action.payload.data;
        }
        else {
          state.status = AsyncStatus.BADREQUEST;
        }
      })
      .addCase(fetchAddressByUser.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
      })
      .addCase(createAddress.pending, (state, _) => {
        state.status = AsyncStatus.FETCHING;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
          state.status = AsyncStatus.SUCCESS;
        }
        else {
          state.status = AsyncStatus.BADREQUEST;
        }
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
      })
      .addCase(deleteAddress.pending, (state, _) => {
        state.status = AsyncStatus.FETCHING;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
          state.status = AsyncStatus.SUCCESS;
        }
        else {
          state.status = AsyncStatus.BADREQUEST;
        }
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
