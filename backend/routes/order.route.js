import express from "express";
import { getOrders, placeOrder } from "../controller/order.controller.js";
import verifyJwt from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/", verifyJwt, placeOrder);
orderRouter.get("/", verifyJwt, getOrders)

export default orderRouter;
 