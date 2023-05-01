import { configure } from "@testing-library/react";
import { configureStore} from "@reduxjs/toolkit";
import { ItemsSlice, ItemState } from "./items/ItemsSlice";

export interface StoreState {
    item: ItemState;
}

export const store = configureStore({
    reducer: {
        item: ItemsSlice.reducer
    }
})