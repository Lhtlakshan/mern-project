import React from "react";

const ProductCard = ({ name, price, quantity }) => {

  return (
    <div className="p-8 max-w-lg border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col items-center">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw5ULId_x7tI82nuqhnkJb61KFgSsbVCsicw&s"
        alt="Product"
        className="shadow rounded-lg overflow-hidden border object-cover w-full h-64"
      />

      <div className="mt-8 text-center w-full">
        <h4 className="font-bold text-xl mb-2">{name}</h4>
        <p className="text-gray-600 mb-1">
          Price: <span className="font-medium text-black">${price}</span>
        </p>
        <p className="text-gray-600 mb-3">
          Quantity: <span className="font-medium text-black">{quantity}</span>
        </p>
        <div className="mt-5">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900 cursor-pointer"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
