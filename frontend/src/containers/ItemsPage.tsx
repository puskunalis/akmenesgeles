import { Grid, SimpleGrid } from "@chakra-ui/react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Product from "../components/Product"
import { AsyncStatus } from "../state/AsyncStatus"
import { fetchItems, fetchItemsByCategoryId, selectAllItems, selectItemsStatus } from "../state/items/ItemsSlice"
import { store } from "../state/store"

export const ItemsPage = () => {
    const items = useSelector(selectAllItems)
    const itemsStatus = useSelector(selectItemsStatus);

    useEffect(() => {
        if (itemsStatus === AsyncStatus.IDLE){
            store.dispatch(fetchItems());
        }
    }, [])
    


    
    return(
        <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)" }}
            gap={1}
            p={1}
    >
            {items?.map((item) => {
               return (<Product product={item} key={item.id}/>)
            })}
        </Grid>
    )
}