import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || user?.email; // fallback if name not available
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/customer/products"); // redirect to home after logout
  };

  return (
    <header className="fixed top-0 left-0 w-full shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        {/* Navigation */}
        <ul className="lg:flex gap-x-8 hidden">
          <li>
            <Link
              className="hover:text-blue-700 text-blue-700 font-medium text-[15px]"
              to="/customer/products"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-blue-700 text-slate-900 font-medium text-[15px]"
              to="/customer/products"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-blue-700 text-slate-900 font-medium text-[15px]"
              to="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-blue-700 text-slate-900 font-medium text-[15px]"
              to="/customer/cart"
            >
              Cart
            </Link>
          </li>
          {token && (
            <li>
              <Link
                className="hover:text-blue-700 text-slate-900 font-medium text-[15px]"
                to="/orders"
              >
                Orders
              </Link>
            </li>
          )}
        </ul>

        {/* Right side - Buttons */}
        {!token ? (
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-slate-900 border border-gray-400 bg-transparent hover:bg-gray-50 transition-all"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all"
            >
              Sign up
            </Link>
          </div>
        ) : (
          <div className="flex space-x-4 items-center">
            <button
              className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all"
              onClick={handleLogout}
            >
              Logout
            </button>
            <span className="font-medium text-slate-900">{name}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
