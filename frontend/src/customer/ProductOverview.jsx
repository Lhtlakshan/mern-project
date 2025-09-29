import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import { addToCart, getCart } from "../util/Cart";
import Header from "../components/Header";

const ProductOverview = () => {
  const { id } = useParams();

  const [image, setImage] = useState([]);
  const [product, setProducts] = useState("");
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/` + id
        );

        console.log(id);

        console.log(res.data);
        setData(res.data);
        console.log(res.data.image);
        setProducts(res.data);
        setImage(res.data.image);
        setStatus("loaded");
      } catch (e) {
        setStatus("error");
      }
    };

    getProduct();
  }, [status]);

  return (
    <div>
      <div>
        <Header />
        <div className="w-full h-screen flex pt-[100px]">
          <div className="w-[50%] h-full">
            {product.image ? (
              <ImageSlider images={product.image} />
            ) : (
              <p>Loading images...</p>
            )}
          </div>
          <div className="w-[50%] h-full">
            <h1 className="text-3xl font-bold text-center">{product.name}</h1>
            <h1 className="text-2xl font-semi-bold text-center">
              Price - Rs.{product.price}
            </h1>
            <div className="mt-[100px]">
              <button
                type="button"
                className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-white border-blue-600 border-[2px] hover:text-blue-600 hover:font-bold focus:outline-none cursor-pointer"
                onClick={() => {
                  // addToCart(product,1)
                  addToCart(product, 1);
                }}
              >
                Add to cart
              </button>
              <button
                type="button"
                className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-white border-blue-600 border-[2px] hover:text-blue-600 hover:font-bold focus:outline-none cursor-pointer"
                onClick={()=>{
                  navigate("/customer/checkout",{
                    state:{
                      product
                    }
                  })
                }}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
