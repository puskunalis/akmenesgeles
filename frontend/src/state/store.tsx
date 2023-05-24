import { configureStore} from "@reduxjs/toolkit";
import { ItemsSlice, ItemState } from "./items/ItemsSlice";
import { CategoriesSlice, CategoryState } from "./categories/CategoriesSlice";
import { UserSlice, UserState } from "./users/UserSlice";
import { CartsSlice, CartState } from "./carts/CartsSlice";
import { OrdersSlice, OrderState } from "./order/OrdersSlice";
import { AddressSlice, AddressState } from "./address/AddressSlice";

export interface StoreState {
    item: ItemState;
    category: CategoryState;
    user: UserState;
    cart: CartState;
    order: OrderState;
    address: AddressState;
}

export const store = configureStore({
    reducer: {
        item: ItemsSlice.reducer,
        category: CategoriesSlice.reducer,
        user: UserSlice.reducer,
        cart: CartsSlice.reducer,
        order: OrdersSlice.reducer,
        address: AddressSlice.reducer,
    }
})