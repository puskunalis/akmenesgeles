import * as React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  IconButton,
  Input,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { selectUser, selectUserStatus } from "../../../state/users/UserSlice";
import { UserRole } from "../../../types";
import {
  createCategory,
  selectCategories,
} from "../../../state/categories/CategoriesSlice";
import {
  fetchItems,
  fetchItemsByCategoryId,
  selectAllItems,
  selectItemsStatus,
  deleteItem,
} from "../../../state/items/ItemsSlice";
import { store } from "../../../state/store";
import { AsyncStatus } from "../../../state/AsyncStatus";

export function AdminPage() {
  const user = useSelector(selectUser);
  const categories = useSelector(selectCategories);

  const items = useSelector(selectAllItems);
  const itemsStatus = useSelector(selectItemsStatus);

  React.useEffect(() => {
    if (itemsStatus === AsyncStatus.IDLE) {
      store.dispatch(fetchItems());
    }
  }, []);

  const [newCategoryTitle, setNewCategoryTitle] = React.useState("");
  const [newCategoryDescription, setNewCategoryDescription] =
    React.useState("");

  const addCategory = () => {};

  return (
    <>
      {user?.role === UserRole.ADMIN ? (
        <VStack spacing={6}>
          <Heading as="h1">Admin Page</Heading>

          <Box>
            <Heading as="h2" size="lg">
              Items
            </Heading>
            {items.map((item) => (
              <HStack key={item.id} justifyContent="space-between">
                <Text>{item.title}</Text>
                <IconButton
                  icon={<DeleteIcon />}
                  aria-label="Delete item"
                  onClick={() => store.dispatch(deleteItem(item.id))}
                />
              </HStack>
            ))}
          </Box>

          <Box>
            <Heading as="h2" size="lg">
              Categories
            </Heading>
            {categories.map((category) => (
              <Text key={category.id}>{category.name}</Text>
            ))}
          </Box>

          <Box>
            <Heading as="h3" size="md">
              New category
            </Heading>
            <VStack mt={4}>
              <Input
                value={newCategoryTitle}
                onChange={(e) => setNewCategoryTitle(e.target.value)}
                placeholder="Title"
              />
              <Input
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e.target.value)}
                placeholder="Description"
              />
              <Button
                leftIcon={<AddIcon />}
                colorScheme="teal"
                onClick={() =>
                  store.dispatch(
                    createCategory({
                      name: newCategoryTitle,
                      description: newCategoryDescription,
                    })
                  )
                }
              >
                Add Category
              </Button>
            </VStack>
          </Box>
        </VStack>
      ) : (
        <Heading as="h1">Access denied!</Heading>
      )}
    </>
  );
}
