import { configureStore} from "@reduxjs/toolkit";
import { ItemsSlice, ItemState } from "./items/ItemsSlice";
import { CategoriesSlice, CategoryState } from "./categories/CategoriesSlice";
import { UserSlice, UserState } from "./users/UserSlice";

export interface StoreState {
    item: ItemState;
    category: CategoryState;
    user: UserState;
}

export const store = configureStore({
    reducer: {
        item: ItemsSlice.reducer,
        category: CategoriesSlice.reducer,
        user: UserSlice.reducer
    }
})