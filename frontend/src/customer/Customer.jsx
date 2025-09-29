import ProductOverview from "./ProductOverview";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";
import Header from "../components/Header";
import Checkout from "./Checkout";

const Customer = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />

      <div className="flex flex-col w-full items-center justify-center h-full p-4 pt-[80px]">
        <Routes>
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<ShoppingCart />} />
          <Route path="product-overview/:id" element={<ProductOverview />} />
          <Route path="checkout" element={<Checkout />} />
        </Routes>
      </div>
    </div>
  );
};

export default Customer;
