import express from "express";
import { placeOrder } from "../controller/order.controller.js";
import verifyJwt from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/", verifyJwt, placeOrder);

export default orderRouter;
