import { useEffect } from "react"
import { useSelector } from "react-redux"
import Product from "../components/Product"
import { fetchItems, selectItems } from "../state/items/ItemsSlice"
import { store } from "../state/store"

export const ItemsPage = () => {
    const items = useSelector(selectItems)

    useEffect(() => {
        store.dispatch(fetchItems());
    })

    return(
        <>
            {items.map((item) => {
               return (<Product product={item}/>)
            })}
        </>
    )
}