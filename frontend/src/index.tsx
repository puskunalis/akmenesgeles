import { ColorModeScript } from "@chakra-ui/react";
import axios from "axios";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { store } from "./state/store";
import { fetchCategories } from "./state/categories/CategoriesSlice";
import { AuthProvider } from "./auth-context";

axios.defaults.baseURL = "http://localhost:8080";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);
store.dispatch(fetchCategories);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ColorModeScript />
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
