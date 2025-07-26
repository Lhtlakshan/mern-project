import React from "react";
import { Link, Routes, Route } from "react-router-dom";

const Admin = () => {
  return (
    <>
      <div>
        <div>Admin is back</div>
        <Link to="/admin/product" className="bg-blue-500 w-[20x] h-[20px]">
          Admin product
        </Link>
        <Link to="/admin/customer" className="bg-blue-300 w-[20x] h-[20px]">
          Admin customer
        </Link>

        <div>
          <Routes path="/*">
            <Route path="/product" element={<h1>Admin products</h1>} />
            <Route path="/customer" element={<h1>Customer</h1>} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Admin;
