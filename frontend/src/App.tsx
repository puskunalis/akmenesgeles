import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { Routes, Route } from "react-router-dom";
import { ItemsCategoryPage } from "./containers/pages/categories/ItemsCategoryPage";
import { ItemsPageWrapper } from "./containers/pages/items/ItemsPageWrapper";
import SingleItemPage from "./containers/pages/items/SingleItemPage";
import { AdminPage } from "./containers/pages/admin/AdminPage";
import { fetchItems } from "./state/items/ItemsSlice";
import { UserPage } from "./containers/pages/user/UserPage";
import { CheckoutPage } from "./containers/pages/order/checkout/CheckoutPage";
import { AddressPage } from "./containers/pages/order/AddressPage";
import { PaymentPage } from "./containers/pages/order/PaymentPage";
import Success from "./containers/pages/order/statusPages/Success";

export const App = () => {
  
  store.dispatch(fetchItems());
  
  return (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Navbar />
      <Routes>
          <Route path="/">
          <Route index element={<ItemsPageWrapper />} />
          <Route path="kontaktai" element={<h1>Kontaktai</h1>} />
          <Route path="category/:categoryId" element={<ItemsCategoryPage />} />
          <Route path="item/:itemId" element={<SingleItemPage/>}/>
          <Route path="admin" element={<AdminPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="checkout" element={<CheckoutPage/>}/>
          <Route path="address" element={<AddressPage/>}/>
          <Route path="payment" element={<PaymentPage/>}/>
          <Route path="success" element={<Success/>}/>
          
        </Route>
      </Routes>
    </ChakraProvider>
  </Provider>
)};
