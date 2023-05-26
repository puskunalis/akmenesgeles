
import * as React from 'react';
import { useSelector } from "react-redux"
import { AsyncStatus } from "../../../state/AsyncStatus"
import { fetchItems, selectAllItems, selectItemsStatus } from "../../../state/items/ItemsSlice"
import { store } from "../../../state/store"
import { ItemsFilterHeader } from './ItemsFilterHeader';
import { ItemsPage } from './ItemsPage';

export const ItemsPageWrapper = () => {
    const items = useSelector(selectAllItems);
    const itemsStatus = useSelector(selectItemsStatus);
    const [sortedItems, setSortedItems] = React.useState(items);

    React.useEffect(() => {
        if (itemsStatus === AsyncStatus.IDLE){
            store.dispatch(fetchItems());
        }
    }, []);

    React.useEffect(() => {
        setSortedItems(items);
      }, [items]);

    const sort = React.useCallback( (sortingFunc: any) => {
        setSortedItems((prevState) => [...prevState].sort(sortingFunc));
    }, [])

    const filter = React.useCallback((filterValue: string) => {
      if (filterValue === '') {
        setSortedItems(items);
      } else {
        setSortedItems(items.filter( item => item.title.startsWith(filterValue)))
      }
    }, []);

  return (
    <div>
      <ItemsFilterHeader sort={sort} filter={filter}/>
      <ItemsPage items={sortedItems} />
    </div>
  );
};