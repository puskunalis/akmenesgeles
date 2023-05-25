import {
createAsyncThunk,
createSlice,
SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Category, Item, Order, OrderStatus } from "../../types";
import { AsyncStatus } from "../AsyncStatus";
import { store, StoreState } from "../store";

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
        const response = axios
        .get(`/api/v1/orders/user/${userId}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));

        return response;
    }
);

export const fetchOrderById = createAsyncThunk(
    "orders/fetchOrderById",
    async (orderId: string) => {
        const response = axios
        .get(`/api/v1/orders/${orderId}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));

        return response;
    }
);

export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (data: CreateOrderData) => {
        const {userId, addressId} = data;
        const response = axios
        .post(`/api/v1/orders/${userId}/${addressId}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));

        return response;
    }
);

export const fetchOrdersByStatus = createAsyncThunk(
    "orders/fetchOrdersByStatus",
    async (status: OrderStatus) => {
        const response = axios
        .get(`/api/v1/orders/status/${status}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));

        return response;
    }
);

export const updateOrderStatus = createAsyncThunk(
    "orders/updateOrderStatus",
    async (data: UpdateOrderStatusData) => {
        const {orderId, status} = data;
        const response = axios
        .put(`/api/v1/orders/${orderId}/status/${status}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
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
    .addCase(fetchOrdersByUserId.pending, (state, action) => {
        state.status = AsyncStatus.FETCHING;
    })
    .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.status = AsyncStatus.SUCCESS;
        state.userOrders = action.payload;
    })
    .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
    })
    .addCase(createOrder.pending, (state, action) => {
        state.status = AsyncStatus.FETCHING;
    })
    .addCase(createOrder.fulfilled, (state, action) => {
        state.status = AsyncStatus.SUCCESS;
        state.currentOrder = action.payload;
    })
    .addCase(createOrder.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
    })
    .addCase(fetchOrdersByStatus.pending, (state, action) => {
        state.status = AsyncStatus.FETCHING;
    })
    .addCase(fetchOrdersByStatus.fulfilled, (state, action) => {
        state.status = AsyncStatus.SUCCESS;
        state.ordersByStatus = action.payload;
    })
    .addCase(fetchOrdersByStatus.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
    })
    .addCase(updateOrderStatus.pending, (state, action) => {
        state.status = AsyncStatus.FETCHING;
    })
    .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.status = AsyncStatus.SUCCESS;
    })
    .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = AsyncStatus.FAILED;
        state.error = action.error;
    })
    .addCase(fetchOrderById.pending, (state, action) => {
        state.status = AsyncStatus.FETCHING;
    })
    .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.status = AsyncStatus.SUCCESS;
        state.currentOrder = action.payload;
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
  