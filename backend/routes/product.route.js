import express from "express";

const productRouter = express.Router();

import { addProduct, getProductById, getAllProducts, updateProduct, deleteProduct } from "../controller/product.controller.js";

productRouter.post("/" , addProduct);
productRouter.get("/:productId", getProductById);
productRouter.get("/", getAllProducts);
productRouter.put("/:productId", updateProduct);
productRouter.delete("/:productId", deleteProduct);

export default productRouter;