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
  Grid,
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
import { ItemGrid } from "./ItemGrid";
import { CategoryGrid } from "./CategoryGrid";

export function AdminPage() {
  const user = useSelector(selectUser);

  const itemsStatus = useSelector(selectItemsStatus);

  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

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
          <Grid templateColumns="1fr 1fr" gap={4} justifyItems="center" paddingX="56px">
            <CategoryGrid setSelectedCategories={setSelectedCategories} selectedCategories={selectedCategories}/>
            <ItemGrid selectedCategories={selectedCategories}/>
          </Grid>)
          : <div>Prieiga draudžiama</div>
          }
      </>

    );
}
