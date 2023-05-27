import * as React from 'react';
import { Box, Flex, Input, Select, Spacer, Text } from '@chakra-ui/react';
import { Item } from '../../../types';
import { ItemsPage } from './ItemsPage';
import { selectAllItems, selectItemsStatus } from '../../../state/items/ItemsSlice';
import SpinnerWrapper from '../../../components/SpinnerWrapper';
import { useSelector } from 'react-redux';

export interface ItemsFilterHeaderProps {
}

export function ItemsFilterHeader(props: ItemsFilterHeaderProps){
    const items = useSelector(selectAllItems);
    const [isLoading, setIsLoading] = React.useState(true);
    const [sortedItems, setSortedItems] = React.useState<Item[]>([]);
    const [sortValue, setSortValue] = React.useState<string>("asc")
    const [filterValue, setFilterValue] = React.useState('');

    const handleSortChange = (e: any) => {
      setSortValue(e.target.value);
    };

    React.useEffect(() => {
        setSortedItems(items);
        setIsLoading(false);
      }, [items]);

    const filter = React.useCallback((filterValue: string) => {
      if (filterValue === '') {
        setSortedItems(items);
      } else {
        setSortedItems(items.filter( item => item.title.startsWith(filterValue)))
      }
    }, []);

    React.useEffect( () => {
      if (sortValue === 'asc') {
        setSortedItems((prevState) => [...prevState].sort(((a: Item, b: Item) => a.price - b.price)));
      } else if (sortValue === 'desc') {
        setSortedItems((prevState) => [...prevState].sort(((a: Item, b: Item) => b.price - a.price)));
      }
    }, [sortValue, filterValue, items]);

    const handleFilterChange = (e: any) => {
      const newFilterValue: string = e.target.value;
      if (filterValue === newFilterValue)
        return;
      setFilterValue(newFilterValue);
      filter(newFilterValue);
    };

  return (
    isLoading ? <SpinnerWrapper /> :
    <>
      <Flex alignItems="center" justifyContent="center" mb={4} p={1}>
        <Spacer />
        <Text fontSize="xl">Produktai</Text>
        <Spacer />
        <Box>
        <Input
            placeholder="Filtruoti pagal varda"
            onBlur={handleFilterChange}
            width={{ base: '100%', md: '200px' }}
            ml={{ md: 4 }}
        />
        </Box>
        <Select
        onChange={(e) => handleSortChange(e)}
        ml={{ md: 4 }}
        maxWidth={{ base: '100%', md: '210px' }}
        >
          <option value="asc">Kaina nuo mažiausios</option>
          <option value="desc">Kaina nuo didžiausios</option>
        </Select>
      </Flex>
      <ItemsPage items={sortedItems} />
    </>
  );
};