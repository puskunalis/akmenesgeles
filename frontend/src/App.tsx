import {
  ChakraProvider,
  extendTheme,
  SimpleGrid,
  theme,
} from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { fetchCategories } from "./state/categories/CategoriesSlice";
import { ItemsCategoryPage } from "./containers/pages/categories/ItemsCategoryPage";
import { ItemsPageWrapper } from "./containers/pages/items/ItemsPageWrapper";
import { AdminPage } from "./containers/pages/admin/AdminPage";

export const App = () => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<ItemsPageWrapper />} />
          <Route path="kontaktai" element={<h1>Kontaktai</h1>} />
          <Route path="category/:categoryId" element={<ItemsCategoryPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </ChakraProvider>
  </Provider>
);
