import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HashRouter, Route, Routes } from "react-router";
import ProductList from "./pages/ProductList.tsx";
import ShoppingCart from "./pages/ShoppingCart.tsx";
import OrderSummary from "./pages/OrderSummary.tsx";
import OrderConfirmation from "./pages/OrderConfirmation.tsx";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/product-list" element={<ProductList></ProductList>}></Route>
      <Route
        path="/shopping-cart"
        element={<ShoppingCart></ShoppingCart>}
      ></Route>
      <Route
        path="/order-summary"
        element={<OrderSummary></OrderSummary>}
      ></Route>
      <Route
        path="/order-confirmation"
        element={<OrderConfirmation></OrderConfirmation>}
      ></Route>
    </Routes>
  </HashRouter>
);
