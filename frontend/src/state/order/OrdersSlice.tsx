import {
createAsyncThunk,
createSlice,
SerializedError,
} from "@reduxjs/toolkit";
import { Order, OrderStatus } from "../../types";
import { AsyncStatus } from "../AsyncStatus";
import { StoreState } from "../store";
import { axiosGet, axiosPost, axiosPut } from "../AxiosRequests";

export interface OrderState {
    userOrders: Order[];
    orders: Order[];
    ordersByStatus: Order[];
    status: AsyncStatus;
    error: SerializedError;
    currentOrder: Order | undefined;
}

export interface UpdateOrderStatusData {
    orderId: string,
    status: OrderStatus
}

export interface CreateOrderData {
    userId: string,
    addressId: string
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
        const {orderId, status} = data;
        const response = await axiosPut(`/api/v1/orders/${orderId}/status/${status}`, undefined);
        return response;
    }
);

const initialState: OrderState = {
    userOrders: [],
    ordersByStatus: [],
    orders: [],
    status: AsyncStatus.IDLE,
    error: {},
    currentOrder: undefined,
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
        state.status = AsyncStatus.FETCHING;
    })
    .addCase(fetchOrdersByStatus.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
            state.status = AsyncStatus.SUCCESS;
            state.ordersByStatus = action.payload.data;
        }
        else {
            state.status = AsyncStatus.BADREQUEST;
        }
    })
    .addCase(fetchOrdersByStatus.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
    })
    .addCase(updateOrderStatus.pending, (state, _) => {
        state.status = AsyncStatus.FETCHING;
    })
    .addCase(updateOrderStatus.fulfilled, (state, action) => {
        if(action.payload && action.payload.status < 300){
            state.status = AsyncStatus.SUCCESS;
        }
        else {
            state.status = AsyncStatus.BADREQUEST;
        }
    })
    .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
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
export const selectOrdersError = (state: StoreState) =>
    state.order.error;
  