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
        <VStack spacing={100}>
          <Heading as="h1">Administratoriaus sritis</Heading>

          <Box>
            <Heading as="h2" size="lg">
              Prekės
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

          <VStack>
            <Box>
              <Heading as="h2" size="lg">
                Kategorijos
              </Heading>
              {categories.map((category) => (
                <Text key={category.id}>{category.name}</Text>
              ))}
            </Box>

            <Box>
              <Heading as="h3" size="md">
                Nauja kategorija
              </Heading>
              <VStack mt={4}>
                <Input
                  value={newCategoryTitle}
                  onChange={(e) => setNewCategoryTitle(e.target.value)}
                  placeholder="Pavadinimas"
                />
                <Input
                  value={newCategoryDescription}
                  onChange={(e) => setNewCategoryDescription(e.target.value)}
                  placeholder="Aprašymas"
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
                  Pridėti kategoriją
                </Button>
              </VStack>
            </Box>
          </VStack>

          <Box>
            <Heading as="h2" size="lg">
              Užsakymai
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
        </VStack>
      ) : (
        <Heading as="h1">Prieiga draudžiama!</Heading>
      )}
    </>
  );
}
