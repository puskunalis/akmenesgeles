import * as React from "react";
import { useSelector } from "react-redux";
import { AsyncStatus } from "../state/AsyncStatus";
import { fetchCategories, selectCategories, selectCategoriesStatus } from "../state/categories/CategoriesSlice";
import { store } from "../state/store";
import { Category } from "../types";

export interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
  }

export const GetNavItems = () => {
    const categories = useSelector(selectCategories);
    const categoryStatus = useSelector(selectCategoriesStatus)

    React.useEffect(() => {
        if(categoryStatus === AsyncStatus.IDLE) {
            store.dispatch(fetchCategories());
        }
    }, [categoryStatus, store.dispatch])


    const createCategory = (category: Category) => {
        return {
            label: category.name,
            href: `category/${category.id}`,
        }

    }

    const categoriesMenu = categories.map((category) => createCategory(category));

    return React.useMemo(() => ([
        {
        label: "Visos prekės",
        href: "/allItems",
        },
        {
        label: "Kategorijos",
        children: categoriesMenu,
        },
    ]) as NavItem[], [categories])
};