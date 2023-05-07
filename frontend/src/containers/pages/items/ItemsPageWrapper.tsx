
import * as React from 'react';
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { AsyncStatus } from "../../../state/AsyncStatus"
import { fetchItems, fetchItemsByCategoryId, selectAllItems, selectItemsStatus } from "../../../state/items/ItemsSlice"
import { store } from "../../../state/store"
import { ItemsFilterHeader } from './ItemsFilterHeader';
import { ItemsPage } from './ItemsPage';
import { Item } from '../../../types';

export const ItemsPageWrapper = () => {
    const items = useSelector(selectAllItems)
    const itemsStatus = useSelector(selectItemsStatus);
    const [sortedItems, setSortedItems] = React.useState(items);

    React.useEffect(() => {
        if (itemsStatus === AsyncStatus.IDLE){
            store.dispatch(fetchItems());
        }
    }, [])

    React.useEffect(() => {
        setSortedItems(items);
      }, [items]);

    const sort = React.useCallback( (sortingFunc: any) => {
        setSortedItems((prevState) => [...prevState].sort(sortingFunc));
    }, [])

    const filter = React.useCallback((filterValue: string) => {
      if (filterValue === '') {
        if (itemsStatus === AsyncStatus.IDLE){
          store.dispatch(fetchItems());
        }
      } else {
        setSortedItems((prevState) =>
        prevState.filter((item: Item) => item.title === filterValue)
        );
      }
    }, []);

  return (
    <div>
      <ItemsFilterHeader sort={sort} filter={filter}/>
      <ItemsPage items={sortedItems} />
    </div>
  );
};