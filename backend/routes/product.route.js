import express from "express";

const productRouter = express.Router();

import { addProduct, getProductById, getAllProducts, updateProduct, deleteProduct } from "../controller/product.controller.js";
import verifyJwt from "../middleware/auth.js";

productRouter.post("/" ,verifyJwt, addProduct);
productRouter.get("/:productId", getProductById);
productRouter.get("/", getAllProducts);
productRouter.put("/:productId",verifyJwt, updateProduct);
productRouter.delete("/:productId",verifyJwt, deleteProduct);

export default productRouter;