import React, { useContext } from "react";
import { LoginContext } from "../../../App";

//usage of useContext hook
const ContexttHook = () => {
  const value = useContext(LoginContext);
  return <div>{value}</div>;
};

export default ContexttHook;
