import * as React from "react";
import { ChakraProvider, SimpleGrid, theme } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { ItemsPage } from "./containers/ItemsPage";
import { Routes, Route, Outlet, Link } from "react-router-dom";

export const App = () => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<ItemsPage />} />
          <Route path="kontaktai" element={<h1>Kontaktai</h1>} />
        </Route>
      </Routes>
    </ChakraProvider>
  </Provider>
);
