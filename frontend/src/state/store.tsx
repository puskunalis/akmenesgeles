import { configureStore} from "@reduxjs/toolkit";
import { ItemsSlice, ItemState } from "./items/ItemsSlice";
import { CategoriesSlice, CategoryState } from "./categories/CategoriesSlice";

export interface StoreState {
    item: ItemState;
    category: CategoryState;
}

export const store = configureStore({
    reducer: {
        item: ItemsSlice.reducer,
        category: CategoriesSlice.reducer
    }
})