import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
        .then((res) => {
          setProducts(res.data);
          setLoading(true);
        });
    }
  }, [loading]);

  const deleteFunction = async (id) => {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login to delete a product");
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      // Check if backend confirms deletion (depends on your backend API)
      if (response.status === 200 || response.status === 204) {
        setLoading(false);
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      toast.error("Product cannot be deleted");
      return;
    }
  };
  

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
            onDelete={() => deleteFunction(product.productId)}
            onUpdate={() => {
              navigate("/admin/product/edit", {
                state: product,
              });
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Products;
