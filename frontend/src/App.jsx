import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Forms/Login";
import Admin from "./admin/Admin";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
      <Toaster position="top-right"/>
        <Routes path="/*">
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<h1>Signup</h1>} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/products/*" element={<h1>Products</h1>} />
          <Route path="/*" element={<h1>404 Not found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
