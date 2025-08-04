import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Products from "./Products";
import AddProducts from "./AddProducts";

const Admin = () => {
  return (
    <div className="flex flex-row w-full h-full">
      <div className="flex flex-col w-[20%] h-screen bg-gray-400 p-4 items-start text-lg m-2 rounded-[10px] text-black fixed">
        <Link
          to="/admin/product"
          className="w-auto h-[40px] text-white m-2 ml-4 rounded"
        >
          products
        </Link>
        <Link
          to="/admin/customer"
          className="w-auto h-[40px] text-white m-2 ml-4 rounded"
        >
         customers
        </Link>
        <Link
          to="/admin/product/add"
          className="w-auto h-[40px] text-white m-2 ml-4 rounded"
        >
          Add products
        </Link>
      </div>

      <div className="flex flex-col ml-[20%] w-[100%] items-center justify-content-center h-full p-4">
        <Routes>
          <Route path="product" element={<Products />} />
          <Route path="product/add" element={<AddProducts />} />
          <Route path="customer" element={<h1>Customer</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
