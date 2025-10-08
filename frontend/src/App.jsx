import { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./forms/Login";
import Admin from "./admin/Admin";
import { Toaster } from "react-hot-toast";
import Customer from "./customer/Customer";
import Orders from "./components/Orders";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Counter from "./components/hooks/UseRef";
import Parent from "./components/hooks/useContext/Parent";
import ContexttHook from "./components/hooks/useContext/ContextHook";
import UseMemo from "./components/hooks/useMemo";

export const LoginContext = createContext();

function App() {
  return (
    <GoogleOAuthProvider clientId="163482525115-akivo60nnq7nbeg3hk9bgiupakf3svhr.apps.googleusercontent.com">
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes path="/*">
          <Route path="/" element={<Counter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<h1>Signup</h1>} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/customer/*" element={<Customer />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/*" element={<h1>404 Not found</h1>} />
          <Route path="/context" element={<ContexttHook />} />
          <Route path="/memo" element={<UseMemo/>} />
        </Routes>
      </BrowserRouter>

      <LoginContext.Provider value={"Thilina"}>
        <Parent />
      </LoginContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
