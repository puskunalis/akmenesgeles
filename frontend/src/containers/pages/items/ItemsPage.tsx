import { Item } from '../../../types';
import Product from '../../../components/Product';
import { useMemo } from "react";
import './ItemsPage.scss';

export interface ItemsPageProps {
    items: Item[]
}


export function ItemsPage(props: ItemsPageProps) {
    const { items } = props;

    const allItems = useMemo(() => {
        return (
            items?.map((item) => {
                return (<Product product={item} key={item.id}/>)
                })
        );
    }, [items]);
    
    return(
        <div className="items-container">
            {allItems}
        </div>
    )
}