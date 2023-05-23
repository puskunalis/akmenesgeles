import { Box, Button, Center, Flex, Heading, Spacer, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectAllItems } from "../../../state/items/ItemsSlice";
import { Item } from "../../../types";
import * as React from "react";
import { AddItemModal } from "../../../components/AddItemModal";

function AddItemModalButton() {
    const [openAddItem, setOpenAddItem] = React.useState<boolean>(false);
    return (
        <div>
            <AddItemModal
                onClose={() => setOpenAddItem(false)}
                isOpen={openAddItem}
            />
            <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"green.400"}
                href={"#"}
                _hover={{
                    bg: "green.300",
                }}
                onClick={() => setOpenAddItem(true)}
            >
            Pridėti prekę
            </Button>
        </div>
        
    );
}

export interface ItemGridProps {
    selectedCategories: string[];
}

export function ItemGrid (props: ItemGridProps) {
    const { selectedCategories } = props;
    const [filteredItems, setFilteredItems] = React.useState<Item[]>();
    const items = useSelector(selectAllItems);

    React.useEffect(() => {
        if (selectedCategories.length === 0){
            setFilteredItems(items);
        } else {
            setFilteredItems(items.filter(item => item.categories?.some(
                category => selectedCategories.includes(category.id))));
        }
    }, [items, selectedCategories])
    
    return (
    <Box width={"100%"}>
        <Flex justifyContent="space-between" alignItems="center">
            <Box textAlign="center" flex="1">
                <Heading as="h2" size="lg" paddingY="6px" textAlign="center">
                    Prekės
                </Heading>
            </Box>
            <AddItemModalButton />
        </Flex>
        <Box borderWidth="1px" borderColor="gray.200" borderRadius="md">
            <Table >
                <Thead>
                    <Tr>
                        <Th>Pavadinimas</Th>
                        <Th>Kaina</Th>
                        <Th>Aprašymas</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredItems?.map((item) => (
                    <Tr key={item.id} >
                        <Td>{item.title}</Td>
                        <Td>{item.price}</Td>
                        <Td maxWidth="100px"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                        >{item.description}</Td>
                    </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
     </Box>
    );
}