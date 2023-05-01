import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Product from "../components/Product"
import { AsyncStatus } from "../state/AsyncStatus"
import { fetchItems, fetchItemsByCategoryId, selectCategoryItems, selectItemsStatus } from "../state/items/ItemsSlice"
import { store } from "../state/store"

export const ItemsCategoryPage = () => {
    const items = useSelector(selectCategoryItems)
    const itemsStatus = useSelector(selectItemsStatus);
    const params = useParams();

    useEffect(() => {
        if (params.categoryId){
            store.dispatch(fetchItemsByCategoryId(params.categoryId));
        }
    },  [params])
    


    
    return(
        <>
            {items?.map((item) => {
               return (<Product product={item} key={item.id}/>)
            })}
        </>
    )
}