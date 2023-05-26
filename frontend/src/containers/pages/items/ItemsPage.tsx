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
        if(items){
            return (
                items.map((item) => {
                    return (<Product product={item} key={item.id}/>)
                    })
            );
        }
        return (<></>);
    }, [items]);
    
    return(
        <div className="items-container">
            {allItems}
        </div>
    )
}