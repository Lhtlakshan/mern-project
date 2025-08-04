import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products`
        );
        console.log(res.data);
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-[100px] fixed h-[60px] bg-blue-600 pt-3 w-[79%] text-white">
        Products
      </h1>
      <div className="flex flex-wrap gap-6 justify-center p-4 mt-[50px]">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
          />
        ))}
      </div>
    </>
  );
};

export default Products;
