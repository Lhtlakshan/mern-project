import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { IoCloseSharp } from "react-icons/io5";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [modalIsDisplaying, setModalIsDisplaying] = useState(false);
  const [displayingOrder, setDisplayingOrder] = useState(null);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // parse stored JSON
  const role = user?.role;

  const getAllOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/order`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  console.log(displayingOrder);
  
  return (
    <>
      <Header />
      <div className="mt-[70px] flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">All Orders</h2>

        <table className="min-w-[80%] border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Order ID</th>
              {role === "admin" && (
                <>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Address</th>
                </>
              )}
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    setModalIsDisplaying(true);
                    setDisplayingOrder(order);
                  }}
                  className="cursor-pointer"
                >
                  <td className="border px-4 py-2">{order.orderId}</td>
                  {role === "admin" && (
                    <>
                      <td className="border px-4 py-2">{order.name}</td>
                      <td className="border px-4 py-2">{order.email}</td>
                      <td className="border px-4 py-2">{order.phoneNo}</td>
                      <td className="border px-4 py-2">{order.address}</td>
                    </>
                  )}
                  <td className="border px-4 py-2">
                    {new Date(order.date).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">{order.status}</td>
                  <td className="border px-4 py-2">Rs. {order.total}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={role === "admin" ? 9 : 4}
                  className="text-center py-4"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalIsDisplaying && (
        <div className="fixed w-full h-full bg-[#00000060] top-0 left-0 flex justify-center items-center">
          <div className="w-[500px] h-[500px] max-h-[500px] bg-white relative">
            <button
              className="rounded-full w-[30px] h-[30px] bg-red-600 shadow absolute right-[-15px] cursor-pointer
           text-[20px] top-[-15px] text-white flex justify-center items-center"
              onClick={() => {
                setModalIsDisplaying(false);
              }}
            >
              <IoCloseSharp />
            </button>

            <div className="w-[full] h-[150px] bg-red-700 text-white flex flex-col justify-center">
              <span className="ml-[50px]">Order Id : {displayingOrder.orderId}</span>
              <span className="ml-[50px]">Customer name : {displayingOrder.name}</span>
              <span className="ml-[50px]">Address : {displayingOrder.address}</span>
              <span className="ml-[50px]">Email : {displayingOrder.email}</span>
              <span className="ml-[50px]">Total payment : {displayingOrder.total}</span>
            </div>
            <div className="w-[full] h-[350px] bg-white-100 overflow-y-scroll">
              {
                
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
