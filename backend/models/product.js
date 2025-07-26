import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    productId:{
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: [true, "Please enter the product name"],
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    image: {
      type: [String],
      required: false,
    },
  }
);

const Product = mongoose.model("product",ProductSchema);

export default Product;
