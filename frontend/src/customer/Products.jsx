import axios from "axios";
import ProductCardUser from "../components/ProductCardUser";
import { useEffect, useState } from "react";

const Products = () => {
  const [product, setProducts] = useState([]);

  const getAllProducts = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products`
    );

    setProducts(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="mt-[50px]">
      <h1 className="text-2xl font-bold text-center mb-[20px]">
        Products
      </h1>
      <div className="flex flex-wrap gap-6 justify-center p-4 mt-[50px]">
        {product.map((product) => (
          <ProductCardUser
            key={product._id}
            name={product.name}
            price={product.price}
            stock={product.quantity}
            image={product.image[0]}
            id={product.productId}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
