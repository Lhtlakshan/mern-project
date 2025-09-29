import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import removeFromCart, { addToCart, getCart } from "../util/Cart";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const productFromState = location.state?.product; // product from Buy Now button
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (productFromState) {
      setCart([productFromState]); // single product Checkout
    } else {
      setCart(getCart()); // fallback to cart
    }
  }, [productFromState]);

  const handleIncrement = (item) => {
    const updatedCart = addToCart(item, 1);
    setCart(updatedCart);
  };

  const handleDecrement = (item) => {
    const updatedCart = addToCart(item, -1);
    setCart(updatedCart);
  };

  const handleRemove = (id) => {
    const updatedCart = removeFromCart(id);
    setCart(updatedCart);
  };

  const placeorder = async () => {
    try {
      const body = {
        name,
        address,
        phoneNo,
        email: JSON.parse(user).email,
        billItems: cart.map((item) => ({
          productId: item.productId,
          productName: item.name,
          quantity: item.quantity || 1,
          price: item.price,
          total: item.quantity * item.price
        })),
        total: cart.reduce(
          (sum, item) => sum + item.price * (item.quantity || 1),
          0
        ),
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order`,
        body,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("Order response:", res.data);
      alert("Order placed successfully!");
      setCart([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-[80px]">
      <h1 className="text-xl font-semibold text-slate-900 mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-center text-slate-500">Your cart is empty</p>
      ) : (
        cart.map((cartItem, index) => (
          <div
            key={index}
            className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-sm border border-gray-200 m-[20px]"
          >
            <div className="w-24 h-24 shrink-0">
              <img
                src={cartItem.image}
                className="w-full h-full object-contain"
                alt={cartItem.name}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">{cartItem.name}</h3>
              <p>Price: LKR {cartItem.price}</p>
              <p>Total: LKR {cartItem.price * (cartItem.quantity || 1)}</p>
            </div>
            <div className="ml-auto flex flex-col justify-between">
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleRemove(cartItem.productId)}
              >
                Remove
              </button>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => handleDecrement(cartItem)}
                  className="h-[30px] w-[30px] rounded-[100%] bg-gray-400"
                >
                  -
                </button>
                <span>{cartItem.quantity || 1}</span>
                <button
                  onClick={() => handleIncrement(cartItem)}
                  className="h-[30px] w-[30px] rounded-[100%] bg-black text-white"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Customer Info */}
      <div className="bg-white shadow-sm border border-gray-200 p-4 rounded-md m-[20px] w-75">
        <h2 className="font-semibold mb-3">Customer Info</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full mb-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          className="border p-2 w-full mb-2 rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="border p-2 w-full mb-2 rounded"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
      </div>

      {cart.length > 0 && (
        <div className="flex justify-end mt-6">
          <button
            type="button"
            className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5
         dark:bg-blue-600 dark:hover:bg-white border-blue-600 border-[2px] hover:text-blue-600
         hover:font-bold focus:outline-none cursor-pointer mr-[20px]"
            onClick={placeorder}
          >
            Place order
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
