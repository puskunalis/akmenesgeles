import { Grid } from "@chakra-ui/react"
import { Item } from '../../../types';
import Product from '../../../components/Product';

export interface ItemsPageProps {
    items: Item[]
}

export function ItemsPage(props: ItemsPageProps) {
    const { items } = props;

    return(
        <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            gap={1}
            p={1}
        >
            {items?.map((item) => {
            return (<Product product={item} key={item.id}/>)
            })}
        </Grid>
    )
}
