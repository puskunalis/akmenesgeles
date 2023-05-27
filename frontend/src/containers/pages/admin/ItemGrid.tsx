import { Box, Button, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Item } from "../../../types";
import * as React from "react";
import { AddItemModal } from "../../../components/AddItemModal";
import { ItemSidePanel } from "./ItemSidePanel";

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
    items: Item[];
}

export function ItemGrid (props: ItemGridProps) {
    const { selectedCategories, items } = props;
    const [filteredItems, setFilteredItems] = React.useState<Item[]>();
    const [selectedItem, setSelectedItem] = React.useState<Item | undefined>(undefined);

    const handleItemClick = (item: Item) => {
        setSelectedItem(item);
    };

    const onItemPanelClose = () => {
        setSelectedItem(undefined);
    }

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
        <Box borderWidth="1px" borderColor="gray.200" borderRadius="md" maxHeight="70vh" overflowY="scroll">
            <Table>
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
                        <Td>                  
                            <Box as="button" color="blue.500" fontWeight="bold" onClick={() => handleItemClick(item)}>
                                {item.title}
                            </Box>
                        </Td>
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
        <ItemSidePanel item={selectedItem} isOpen={!!selectedItem} onCLose={onItemPanelClose}/>
    </Box>
    );
}