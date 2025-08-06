import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";

const ProductCard = ({ name, price, quantity, onDelete, onUpdate }) => {
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
      </div>
      <div className="flex ">
        <RiDeleteBin5Line
          className="text-3xl m-3 text-red-800 hover:text-red-600 cursor-pointer"
          onClick={onDelete}
        />
        <FiEdit3
          className="text-3xl m-3 text-blue-900 hover:text-blue-700 cursor-pointer"
          onClick={onUpdate}
        />
      </div>
    </div>
  );
};

export default ProductCard;
