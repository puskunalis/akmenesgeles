import { ChakraProvider, extendTheme, SimpleGrid, theme } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { ItemsPage } from "./containers/ItemsPage";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { fetchCategories } from "./state/categories/CategoriesSlice";
import { ItemsCategoryPage } from "./containers/ItemsCategoryPage";

export const App = () => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<ItemsPage />} />
          <Route path="kontaktai" element={<h1>Kontaktai</h1>} />
          <Route path="category/:categoryId" element={<ItemsCategoryPage />} />
        </Route>
      </Routes>
    </ChakraProvider>
  </Provider>
);
