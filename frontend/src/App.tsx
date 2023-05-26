import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { Provider, useSelector } from "react-redux";
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
import SingleOrderPage from "./containers/pages/order/SingleOrderPage";
import { AuthorizedPageWrapper } from "./containers/pages/AuthorizedPageWrapper"
import Contacts from "./containers/pages/Contacts";

export const App = () => {
  store.dispatch(fetchItems());
  
  return (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Navbar />
      <Routes>
          <Route path="/">
          <Route index element={<Contacts />} /> 
          <Route path="allItems" element={<ItemsPageWrapper />} /> 
          <Route path="category/:categoryId" element={<ItemsCategoryPage />} />
          <Route path="item/:itemId" element={<SingleItemPage/>}/>
          <Route path="admin" element={<AuthorizedPageWrapper><AdminPage /></AuthorizedPageWrapper>} />
          <Route path="user" element={<AuthorizedPageWrapper><UserPage /></AuthorizedPageWrapper>} />
          <Route path="checkout" element={<CheckoutPage/>}/>
          <Route path="address" element={<AddressPage/>}/>
          <Route path="payment" element={<PaymentPage/>}/>
          <Route path="success" element={<Success/>}/>
          <Route path="order/:orderId" element={<AuthorizedPageWrapper><SingleOrderPage/></AuthorizedPageWrapper>}/>
        </Route>
      </Routes>
    </ChakraProvider>
  </Provider>
)};
