import * as React from 'react';
import { Box, Flex, Input, Select, Spacer, Text } from '@chakra-ui/react';
import { Item } from '../../../types';

export interface ItemsFilterHeaderProps {
    sort: (func: any) => void,
    filter: (value: string) => void,
}

export function ItemsFilterHeader(props: ItemsFilterHeaderProps){
    const {sort, filter} = props;
    const [filterValue, setFilterValue] = React.useState('');

    const handleSortChange = (e: any) => {
      const selectedValue = e.target.value;
    
      if (selectedValue === 'asc') {
        sort((a: Item, b: Item) => a.price - b.price);
      } else if (selectedValue === 'desc') {
        sort((a: Item, b: Item) => b.price - a.price);
      }
    };

    const handleFilterChange = (e: any) => {
      const newFilterValue: string = e.target.value;
      if (filterValue === newFilterValue)
        return;
      setFilterValue(newFilterValue);
      filter(newFilterValue);
    };

  return (
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
    );
};