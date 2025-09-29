import React, { useEffect, useState } from "react";
import removeFromCart, { addToCart, getCart,  } from "../util/Cart";

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    setCart(getCart());
  }, []);

  // Increment quantity
  const handleIncrement = (item) => {
    const updatedCart = addToCart(item, 1);
    setCart(updatedCart);
  };

  // Decrement quantity
  const handleDecrement = (item) => {
    const updatedCart = addToCart(item, -1);
    setCart(updatedCart);
  };

  // Remove item
  const handleRemove = (id) => {
    const updatedCart = removeFromCart(id);
    setCart(updatedCart);
  };

  return (
    <div className="max-w-5xl max-lg:max-w-2xl mx-auto p-4 mt-[80px]">
      <h1 className="text-xl font-semibold text-slate-900 mb-6">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-slate-500">Your cart is empty</p>
      ) : (
        <div className="grid lg:grid-cols-3 lg:gap-x-8 gap-x-6 gap-y-8">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((cartItem, index) => (
              <div
                className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-sm border border-gray-200"
                key={index}
              >
                <div className="flex gap-6 sm:gap-4 max-sm:flex-col">
                  <div className="w-24 h-24 max-sm:w-24 max-sm:h-24 shrink-0">
                    <img
                      src={cartItem.image}
                      className="w-full h-full object-contain"
                      alt={cartItem.name}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                      {cartItem.name}
                    </h3>
                    <h3 className="text-sm font-semibold text-slate-900">
                      LKR. {cartItem.price}
                    </h3>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Total price : LKR. {cartItem.price * cartItem.quantity}
                    </h3>
                  </div>
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
                      className="flex items-center justify-center w-6 h-6 cursor-pointer bg-slate-400 rounded-full text-white"
                      onClick={() => handleDecrement(cartItem)}
                    >
                      -
                    </button>
                    <span className="font-semibold">{cartItem.quantity}</span>
                    <button
                      className="flex items-center justify-center w-6 h-6 cursor-pointer bg-slate-800 rounded-full text-white"
                      onClick={() => handleIncrement(cartItem)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
