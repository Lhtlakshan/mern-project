import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadImage } from "../util/MediaUpload";

const EditProduct = () => {

   const locationData = useLocation();
   const navigate = useNavigate();

   if (locationData.state == null) {
     toast.error("please select product to edit");
     navigate("/admin/products");
     return;
   }

   console.log(locationData.state);
   

  const [productId, setProductId] = useState(locationData.state.productId);
  const [name, setName] = useState(locationData.state.name);
  const [quantity, setQuantity] = useState(locationData.state.quantity);
  const [price, setPrice] = useState(locationData.state.price);
  const [images, setImages] = useState([]);

  const handleSubmit = async () => {

    const promiseArray = [];
    for (let i = 0; i < images.length; i++) {
      const promise = uploadImage(images[i]);
      promiseArray[i] = promise;
    }

    try{
    const results = await Promise.all(promiseArray);

    console.log(productId);

    const product = {
        productId: productId,
        name: name,
        quantity: quantity,
        price: price,
        image: results
    }

    const token = localStorage.getItem("token");
    toast.success("Form submitted")
    console.log(token);

    const post = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products/", product, {
        headers:{
            "Authorization": "Bearer " + token
        }
    })
    toast.success("Product added successfully");
    navigate("/admin/product");

  }catch(err){
    console.log(err);
    toast.error("File upload failed")
  }
  };

  return (
    <div className="flex flex-col justify-content-center items-center">
      <div className="flex flex-col items-center justify-content-center shadow-xl w-[500px] pt-5 h-[500px] mt-5 rounded-[20px]">
        <h1 className="m-5 text-3xl font-bold text-black">Update Product</h1>
        <input
          type="text"
          placeholder="Product Id"
          value={productId}
          className="border-1 rounded-[10px] h-10 w-80 p-2 m-2"
          onChange={(e) => {
            setProductId(e.target.value);
          }}
          disabled
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          className="border-1 rounded-[10px] h-10 w-80 p-2 m-2"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          className="border-1 rounded-[10px] h-10 w-80 p-2 m-2"
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          className="border-1 rounded-[10px] h-10 w-80 p-2 m-2"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <input
          type="file"
          placeholder="image"
          // value={image}
          className="border-1 rounded-[10px] h-10 w-80 p-2 m-2"
          multiple
          onChange={
              (e)=>{
                  setImages(e.target.files);
              }
          }
        />

        <div className="text-white w-80 flex flex-row justify-between mt-4 items-center">
          <button
            type="button"
            className="cursor-pointer w-[48%] bg-blue-800 h-10 border-0 rounded-[5px] hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Update
          </button>
          <button
            type="button"
            className="cursor-pointer bg-gray-400 w-[48%] h-10 border-0 rounded-[5px]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;