import {
createAsyncThunk,
createSlice,
SerializedError,
} from "@reduxjs/toolkit";
import { Order, OrderStatus } from "../../types";
import { AsyncStatus } from "../AsyncStatus";
import { store, StoreState } from "../store";
import { axiosGet, axiosPost, axiosPut } from "../AxiosRequests";
import { version } from "process";

export interface OrderState {
    userOrders: Order[];
    orders: Order[];
    ordersByStatus: Order[];
    status: AsyncStatus;
    updateStatus: AsyncStatus;
    error: SerializedError;
    currentOrder: Order | undefined;
    fetchOrderStatus: AsyncStatus;
}

export interface UpdateOrderStatusData {
    orderId: string,
    status: OrderStatus
    version: number
}

export interface CreateOrderData {
    userId: string,
    addressId: string
}
export interface UpdateWithVersion {
    version: number
}

export const fetchOrdersByUserId = createAsyncThunk(
    "orders/fetchOrdersByUserId",
    async (userId: string) => {
        const response = await axiosGet(`/api/v1/orders/user/${userId}`);
        return response;
    }
);

export const fetchOrderById = createAsyncThunk(
    "orders/fetchOrderById",
    async (orderId: string) => {
        const response = await axiosGet(`/api/v1/orders/${orderId}`);
        return response;
    }
);

export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (data: CreateOrderData) => {
        const {userId, addressId} = data;
        const response = await axiosPost(`/api/v1/orders/${userId}/${addressId}`, undefined);
        return response;
    }
);

export const fetchOrdersByStatus = createAsyncThunk(
    "orders/fetchOrdersByStatus",
    async (status: OrderStatus) => {
        const response = await axiosGet(`/api/v1/orders/status/${status}`);
        return response;
    }
);

export const updateOrderStatus = createAsyncThunk(
    "orders/updateOrderStatus",
    async (data: UpdateOrderStatusData) => {
        const {orderId, status, version} = data;
        const versionUpdate: UpdateWithVersion = {
            version: version
        } 
        const response = await axiosPut(`/api/v1/orders/${orderId}/status/${status}`, versionUpdate);

        await store.dispatch(fetchOrderById(orderId));
        return response;
    }
);

export const retryUpdateOrderStatus = createAsyncThunk(
    "orders/retryUpdateOrderStatus",
    async (data: UpdateOrderStatusData) => {
        const {orderId, status} = data;
        const response = await axiosGet(`/api/v1/orders/${orderId}`);
        return ({response: response, newStatus: status, orderId: orderId});
    }
);

const initialState: OrderState = {
    userOrders: [],
    ordersByStatus: [],
    orders: [],
    status: AsyncStatus.IDLE,
    updateStatus: AsyncStatus.IDLE,
    error: {},
    currentOrder: undefined,
    fetchOrderStatus: AsyncStatus.IDLE,
};


export const OrdersSlice = createSlice({
name: "orders",
initialState,
reducers: {
    setOrders: (state, action) => {
    state.orders = action.payload;
    },
},
extraReducers(builder) {
    builder
    .addCase(fetchOrdersByUserId.pending, (state, _) => {
        state.status = AsyncStatus.FETCHING;
    })
    .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
            state.status = AsyncStatus.SUCCESS;
            state.userOrders = action.payload.data;
        }
        else {
            state.status = AsyncStatus.BADREQUEST;
        }
    })
    .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
    })
    .addCase(createOrder.pending, (state, _) => {
        state.status = AsyncStatus.FETCHING;
    })
    .addCase(createOrder.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
            state.status = AsyncStatus.SUCCESS;
            state.currentOrder = action.payload.data;
        }
        else {
            state.status = AsyncStatus.BADREQUEST;
        }
    })
    .addCase(createOrder.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
    })
    .addCase(fetchOrdersByStatus.pending, (state, _) => {
        state.fetchOrderStatus = AsyncStatus.FETCHING;
    })
    .addCase(fetchOrdersByStatus.fulfilled, (state, action) => {
        if(action.payload){
            if(action.payload.status < 300){
                state.fetchOrderStatus = AsyncStatus.SUCCESS;
                state.ordersByStatus = action.payload.data;
            }
            else if(action.payload.status === 404){
                state.fetchOrderStatus = AsyncStatus.NOTFOUND;
            }
            else {
                state.fetchOrderStatus = AsyncStatus.BADREQUEST;
            }
        }
    })
    .addCase(fetchOrdersByStatus.rejected, (state, action) => {
        state.fetchOrderStatus = AsyncStatus.FAILED;
        state.error = action.error;
    })
    .addCase(updateOrderStatus.pending, (state, _) => {
        state.updateStatus = AsyncStatus.FETCHING;
    })
    .addCase(updateOrderStatus.fulfilled, (state, action) => {
        if(action.payload){
            if(action.payload.status < 300)
            {
                state.updateStatus = AsyncStatus.SUCCESS;
                state.currentOrder = action.payload.data;
            }
            else if(action.payload.status === 409){
                state.updateStatus = AsyncStatus.CONFLICT
            }
            else {
                state.updateStatus = AsyncStatus.BADREQUEST
            }
            
        }
    })
    .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updateStatus = AsyncStatus.FAILED;
        state.error = action.error;
    })
    .addCase(fetchOrderById.pending, (state, _) => {
        state.status = AsyncStatus.FETCHING;
    })
    .addCase(fetchOrderById.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
            state.status = AsyncStatus.SUCCESS;
            state.currentOrder = action.payload.data;
        }
        else {
            state.status = AsyncStatus.BADREQUEST;
        }
    })
    .addCase(fetchOrderById.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
    })
    .addCase(retryUpdateOrderStatus.pending, (state, _) => {
        state.status = AsyncStatus.FETCHING;
    })
    .addCase(retryUpdateOrderStatus.fulfilled, (state, action) => {
        if(action.payload){
            const {newStatus, orderId, response} = action.payload;
            if(response && response.data) {
                updateOrderStatus({orderId: orderId, status: newStatus, version: response.data.version});
            }
            
            state.status = AsyncStatus.SUCCESS;
        }
    })
    .addCase(retryUpdateOrderStatus.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
    });
},
});

export const selectCurrentOrder = (state: StoreState) => 
    state.order.currentOrder;
export const selectOrdersByStatus = (state: StoreState) => 
    state.order.ordersByStatus;
export const selectUserOrders = (state: StoreState) => 
    state.order.userOrders;
export const selectOrders = (state: StoreState) =>
    state.order.orders;
export const selectOrdersStatus = (state: StoreState) =>
    state.order.status;
export const selectOrderUpdateStatus = (state: StoreState) =>
    state.order.updateStatus;
export const selectOrdersError = (state: StoreState) =>
    state.order.error;
export const selectOrderFetchStatus = (state: StoreState) =>
    state.order.fetchOrderStatus;
  