import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  let handleLogin = async () => {

    if (email == "" && password == "") {
      toast.error("email and password should not be empty");
      return;
    }
    
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/user/login",
        {
          username: email,
          password: password,
        }
      );

      console.log(res);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const user = res.data.user;
      console.log(res.data.message);

      if (user.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/customer/products");
      }
      toast.success("Login successful...");
    } catch (err) {
      console.log(err);
      toast.error("Login failed " + err.message);
    }
  };
  return (
    <div className="bg-[url('./assets/lap.jpg')] bg-cover bg-fixed bg-no-repeat h-screen w-full flex items-center justify-center">
      <div className="w-[75%] h-[75%] rounded-3xl bg-white/40 backdrop-blur-sm flex flex-row justify-center items-center">
        <div className="h-[80%] w-[50%] m-5"></div>
        <div className="bg-white/60 h-[80%] w-[50%] m-10 rounded-3xl flex flex-col items-center">
          <h1 className="mt-10 mb-6 text-4xl font-bold">Login</h1>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            className="w-[75%] h-10 border-1 rounded-lg m-5 p-2.5 focus:border-blue-500 border-gray-400"
            placeholder="Enter username"
            required
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            className="w-[75%] h-10 border-1 rounded-lg p-2.5 focus:border-blue-500 border-gray-400"
            placeholder="Enter password"
            required
          />

          <button
            type="submit"
            className="w-[75%] h-10 bg-blue-700 text-white rounded-lg m-5 hover:bg-blue-600 curser-pointer focus:bg-blue-800 active:bg-blue-900"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
