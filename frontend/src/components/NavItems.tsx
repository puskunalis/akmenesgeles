import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

    useEffect(() => {
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

    return useMemo(() => ([
        {
        label: "Visos gėlės",
        href: "/",
        },
        {
        label: "Kategorijos",
        children: categoriesMenu,
        },
        {
        label: "Kontaktai",
        href: "/kontaktai",
        },
    ]) as NavItem[], [categories])
};