import { Heading, Table, Thead, Tr, Th, Tbody, Td, Box, Checkbox, Button, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../../state/categories/CategoriesSlice";
import { Dispatch, SetStateAction } from "react";
import * as React from "react";
import { AddCategoryModal } from "../../../components/AddCategoryModal";
import { Category, Item } from "../../../types";
import { CategorySidePanel } from "./CategorySidePanel";

function AddCategoryModalButton() {
    const [openAddCategory, setOpenAddCategory] = React.useState<boolean>(false);
    return (
        <div>
            <AddCategoryModal
                onClose={() => setOpenAddCategory(false)}
                isOpen={openAddCategory}
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
                onClick={() => setOpenAddCategory(true)}
            >
            Pridėti kategorija
            </Button>
        </div>
        
    );
}

export interface CategoryGridProps{
    setSelectedCategories: Dispatch<SetStateAction<string[]>>;
    selectedCategories: string[];
    items: Item[];
}

export function CategoryGrid(props: CategoryGridProps) {
    const { setSelectedCategories, selectedCategories, items } = props;
    const [selectedCategory, setSelectedCategory] = React.useState<Category | undefined>(undefined);
    const categories = useSelector(selectCategories);
    
    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category);
    };

    const onCategoryPanelClose = () => {
        setSelectedCategory(undefined);
    }

    const handleCheckboxChange = (categoryId: string) => {
        if (selectedCategories.includes(categoryId)) {
          setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
        } else {
          setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const calculateItems = (category: Category) => {
        return items.filter(item => item.categories ? item.categories.some(cat => JSON.stringify(cat) === JSON.stringify(category))  : 0).length;
    }
    
    return (
    <Box width={"100%"}>
        <Flex justifyContent="space-between" alignItems="center">
            <Box textAlign="center" flex="1">
                <Heading as="h2" size="lg" paddingY="6px" textAlign="center">
                Kategorijos
                </Heading>
            </Box>
            <AddCategoryModalButton />
        </Flex>
        <Box borderWidth="1px" borderColor="gray.200" borderRadius="md" maxHeight="70vh" overflowY="scroll">
            <Table >
                <Thead>
                    <Tr>
                        <Th>Pavadinimas</Th>
                        <Th>Aprasymas</Th>
                        <Th>Prekiu kiekis</Th>
                        <Th>Pasirinkti</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {categories.map((category) => (
                    <Tr key={category.id} >
                        <Td>                  
                            <Box as="button" color="blue.500" fontWeight="bold" onClick={() => handleCategoryClick(category)}>
                                {category.name}
                            </Box>
                        </Td>
                        <Td maxWidth="100px"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                        >{category.description}</Td>
                        <Td>{calculateItems(category)}</Td>
                        <Td>
                            <Checkbox colorScheme="teal"  onChange={() => handleCheckboxChange(category.id)}/>
                        </Td>
                    </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
        <CategorySidePanel category={selectedCategory} isOpen={!!selectedCategory} onCLose={onCategoryPanelClose}/>
    </Box>);
}